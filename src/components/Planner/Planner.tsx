import { FC } from 'react';
import styles from './Planner.module.sass';
import Slot from '../Slot/Slot';
import slotStyles from '../Slot/Slot.module.sass';
import { Slots } from '../../enums/slots';
import Doll from '../Doll/Doll';
import useCodex from '../../hooks/useCodex';

const Planner: FC = () => {
	const codex = useCodex();

	console.log(codex);

	return (
		<div className={styles.Planner}>
			<Doll />
			<Slot className={slotStyles.Helm} slot={Slots.Helm} />
			<Slot className={slotStyles.Chest} slot={Slots.Chest} />
			<Slot className={slotStyles.Gloves} slot={Slots.Gloves} />
			<Slot className={slotStyles.Pants} slot={Slots.Pants} />
			<Slot className={slotStyles.Boots} slot={Slots.Boots} />
			<Slot className={slotStyles.Amulet} slot={Slots.Amulet} />
			<Slot className={slotStyles.Ring1} slot={Slots.Ring_1} />
			<Slot className={slotStyles.Ring2} slot={Slots.Ring_2} />
			<Slot className={slotStyles.Weapon1} slot={Slots.Weapon_1} />
			<Slot className={slotStyles.Weapon2} slot={Slots.Weapon_2} />
			<Slot className={slotStyles.Weapon3} slot={Slots.Weapon_3} />
			<Slot className={slotStyles.Weapon4} slot={Slots.Weapon_4} />
		</div>
	);
};

export default Planner;
