import { FC, useContext, useState } from 'react';
import styles from './Planner.module.sass';
import Slot from '../Slot/Slot';
import slotStyles from '../Slot/Slot.module.sass';
import { Slots } from '../../enums/slots';
import Doll from '../Doll/Doll';
import useCodex from '../../hooks/useCodex';
import Dialog from '../Dialog/Dialog';
import { AppContext } from '../App/App';
import { HERO_CLASS_NAMES } from '../../constants';
import { Aspect } from '../../interfaces';

const Planner: FC = () => {
  const codex = useCodex();
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const {
    characterState: { heroClass },
  } = useContext(AppContext);
  const heroClassName = HERO_CLASS_NAMES.get(heroClass)!;
  let offensive: Array<[string, Aspect]> | undefined;

  if (codex) {
    const o = codex?.[heroClassName]['Offensive'];
    offensive = Object.entries(o);
    console.log(offensive);
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
      <Slot className={slotStyles.Ring1} slot={Slots.Ring_1} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Ring2} slot={Slots.Ring_2} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon1} slot={Slots.Weapon_1} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon2} slot={Slots.Weapon_2} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon3} slot={Slots.Weapon_3} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Slot className={slotStyles.Weapon4} slot={Slots.Weapon_4} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <Dialog open={selectedSlot != null} onClose={() => setSelectedSlot(null)}>
        {selectedSlot != null && offensive && (
          <div>
            <header>{Slots[selectedSlot]}</header>
            <div>Aspects</div>
            <ul>
              {offensive.map(([name, aspect]) => (
                <li>{`${name} ${aspect.id}`}</li>
              ))}
            </ul>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Planner;
