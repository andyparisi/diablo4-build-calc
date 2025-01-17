import { Dispatch, FC, SetStateAction, useContext } from 'react';
import styles from './Slot.module.sass';
import clsx from 'clsx';
import { Slots } from '../../enums/slots';
import { AppContext } from '../App/App';

interface SlotProps {
  className: string;
  slot: Slots;
  selectedSlot: Slots | null;
  setSelectedSlot: Dispatch<SetStateAction<SlotProps['selectedSlot']>>;
}

const Slot: FC<SlotProps> = ({ className, slot, selectedSlot, setSelectedSlot }) => {
  const {
    characterState: { equipment },
  } = useContext(AppContext);
  const slotValue = equipment.get(slot);
  const slotClass = clsx({
    [styles.Slot]: true,
    [className]: className?.length,
    [styles.isSelected]: selectedSlot === slot,
    [styles.isLegendary]: slotValue != null && slotValue[1].type === 'Legendary',
    [styles.isUnique]: slotValue != null && slotValue[1].type === 'Unique',
  });

  console.log(slotValue?.[1].description);
  const desc = slotValue?.[1].description.replace(/\//g, '-').replace(/{([^}]*)}/g, '<span>$1</span>') ?? '';

  return (
    <div className={slotClass} onClick={() => setSelectedSlot(slot)}>
      <header>{Slots[slot]}</header>
      {slotValue && (
        <>
          <img src={`/uniques/${slotValue[0].replace(/\s/g, '_').replace(/[^A-Za-z0-9_-]/g, '')}.png`} />
          <div className={styles.SlotValue}>
            <div className={styles.Name}>{slotValue[0]}</div>
            <div className={styles.Description} dangerouslySetInnerHTML={{ __html: desc }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Slot;
