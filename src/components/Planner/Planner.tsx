import { FC, useContext, useState, useMemo } from 'react';
import styles from './Planner.module.sass';
import Slot from '../Slot/Slot';
import slotStyles from '../Slot/Slot.module.sass';
import { Slots } from '../../enums/slots';
import Doll from '../Doll/Doll';
import useCodex from '../../hooks/useCodex';
import { AppContext } from '../App/App';
import { aspectTypesBySlot, heroClassNames } from '../../constants';
import { Aspect, AspectType } from '../../interfaces';
import AspectSelector from '../AspectSelector/AspectSelector';
import { AspectTypes } from '../../enums/aspectTypes';

const Planner: FC = () => {
  const codex = useCodex();
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const {
    characterState: { heroClass },
  } = useContext(AppContext);
  const heroClassName = heroClassNames.get(heroClass)!;

  const mergedAspects = useMemo(() => {
    if (!codex) {
      return null;
    }
    return {
      Generic: codex.Generic,
      [heroClassName]: codex[heroClassName],
    };
  }, [codex, heroClassName]);

  const filteredAspects = useMemo(() => {
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
    const output: Array<[string, Aspect]> = Object.entries(aspects);
    return output;
  }, [selectedSlot, heroClassName, mergedAspects]);

  const displayAspects = useMemo(() => {
    if (selectedSlot == null) {
      return filteredAspects;
    }
    const output = filteredAspects.filter(([, aspect]) => !aspect.slot || aspect.slot === Slots[selectedSlot]);
    console.log(output);
    return output;
  }, [filteredAspects, selectedSlot]);

  if (!codex) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Planner}>
      <Doll />
      <Slot className={slotStyles.Helm} slot={Slots.Helm} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Chest} slot={Slots.Chest} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Gloves} slot={Slots.Gloves} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Pants} slot={Slots.Pants} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Boots} slot={Slots.Boots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Amulet} slot={Slots.Amulet} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Ring1} slot={Slots.Ring} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon1} slot={Slots.Weapon_1H} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon2} slot={Slots.Weapon_2H} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon3} slot={Slots.Shield} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <AspectSelector onClose={() => setSelectedSlot(null)} selectedSlot={selectedSlot} aspects={displayAspects} />
    </div>
  );
};

export default Planner;
