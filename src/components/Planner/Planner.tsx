import { FC, useContext, useState, useMemo, useEffect } from 'react';
import styles from './Planner.module.sass';
import Slot from '../Slot/Slot';
import slotStyles from '../Slot/Slot.module.sass';
import { Slots } from '../../enums/slots';
import useCodex from '../../hooks/useCodex';
import { AppContext } from '../App/App';
import { aspectTypesBySlot, heroClassNames } from '../../constants';
import { Aspect, AspectType } from '../../interfaces';
import AspectSelector from '../AspectSelector/AspectSelector';
import { AspectTypes } from '../../enums/aspectTypes';
import { CharacterActions } from '../../reducers/character';

const Planner: FC = () => {
  const [codex, uniquesBySlot] = useCodex();
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const {
    characterState: { heroClass },
    characterDispatch,
  } = useContext(AppContext);
  const heroClassName = heroClassNames.get(heroClass)!;

  useEffect(() => {
    characterDispatch({ type: CharacterActions.UNEQUIP_ALL, value: undefined });
  }, [characterDispatch, heroClass]);

  const mergedAspects = useMemo(() => {
    if (!codex) {
      return null;
    }
    return {
      Generic: codex.Generic,
      [heroClassName]: codex[heroClassName],
    };
  }, [codex, heroClassName]);

  const selectedAspects = useMemo(() => {
    let aspects = {};
    if (selectedSlot != null) {
      aspectTypesBySlot[selectedSlot].forEach((aspectType: keyof typeof AspectTypes) => {
        const generic = mergedAspects?.Generic as unknown as AspectType;
        const cls = mergedAspects?.[heroClassName] as unknown as AspectType;
        aspects = {
          ...aspects,
          ...generic[aspectType],
          ...cls[aspectType],
        };
      });
    }

    const output = Object.entries(aspects)
      .concat(selectedSlot == null ? [] : uniquesBySlot?.['Generic']?.[selectedSlot] ?? [])
      .concat(selectedSlot == null ? [] : uniquesBySlot?.[heroClassName]?.[selectedSlot] ?? [])
      .sort((a, b) => (a[0] < b[0] ? -1 : 1));
    return output as Array<[string, Aspect]>;
  }, [selectedSlot, heroClassName, mergedAspects, uniquesBySlot]);

  if (!codex) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Planner}>
      <Slot className={slotStyles.Helm} slot={Slots.Helm} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Chest} slot={Slots.Chest} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Gloves} slot={Slots.Gloves} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Pants} slot={Slots.Pants} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Boots} slot={Slots.Boots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Amulet} slot={Slots.Amulet} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Ring1} slot={Slots.Ring} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Ring2} slot={Slots.Ring} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon1} slot={Slots.Weapon_1H} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon2} slot={Slots.Weapon_2H} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Offhand} slot={Slots.Shield} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <AspectSelector onClose={() => setSelectedSlot(null)} selectedSlot={selectedSlot} aspects={selectedAspects} />
    </div>
  );
};

export default Planner;
