import { FC, useContext } from 'react';
import styles from './Slot.module.sass';
import clsx from 'clsx';
import { Slots } from '../../enums/slots';
import { AppContext } from '../App/App';

interface SlotProps {
	className: string;
	slot: Slots;
}

const Slot: FC<SlotProps> = ({ className, slot }) => {
	const {
		characterState: { equipment },
	} = useContext(AppContext);
	const slotClass = clsx({
		[styles.Slot]: true,
		[className]: className?.length,
	});

	const slotValue = equipment.get(slot);

	return <div className={slotClass}>{slotValue?.name}</div>;
};

export default Slot;
