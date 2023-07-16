import { FC, useContext } from 'react';
import styles from './AspectSelector.module.sass';
import { Slots } from '../../enums/slots';
import Dialog from '../Dialog/Dialog';
import { Aspect } from '../../interfaces';
import { AppContext } from '../App/App';
import { CharacterActions } from '../../reducers/character';

interface AspectSelectorProps {
  selectedSlot: Slots | null;
  onClose: () => void;
  aspects: Array<[string, Aspect]> | undefined;
}

const AspectSelector: FC<AspectSelectorProps> = ({ selectedSlot, onClose, aspects }) => {
  const { characterDispatch } = useContext(AppContext);

  if (selectedSlot == null || !aspects) {
    return null;
  }
  return (
    <Dialog open onClose={onClose}>
      <div className={styles.AspectSelector}>
        <header>{Slots[selectedSlot]}</header>
        <ul>
          {aspects.map(([name, aspect]) => (
            <li
              key={name}
              onClick={() =>
                characterDispatch({ type: CharacterActions.EQUIP, value: { slot: selectedSlot, aspect: [name, aspect] } })
              }
            >{`${name} ${aspect.id}`}</li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};

export default AspectSelector;
