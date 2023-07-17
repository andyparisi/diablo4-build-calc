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
  const slotClass = clsx({
    [styles.Slot]: true,
    [className]: className?.length,
    [styles.isSelected]: selectedSlot === slot,
  });

  const slotValue = equipment.get(slot);

  return (
    <div className={slotClass} onClick={() => setSelectedSlot(slot)}>
      <header>{Slots[slot]}</header>
      {slotValue && (
        <>
          <img src={`/uniques/${slotValue[0].replace(/\s/, '_').replace(/[^A-Za-z0-9_-]/g, '')}.png`} />
          <div>{slotValue?.[0]}</div>
        </>
      )}
    </div>
  );
};

export default Slot;
