import { FC, useContext } from 'react';
import styles from './BuildInfo.module.sass';
import { heroClassNames } from '../../constants';
import { AppContext } from '../App/App';
import { CharacterActions } from '../../reducers/character';

const BuildInfo: FC = () => {
  const {
    characterState: { heroClass },
    characterDispatch,
  } = useContext(AppContext);
  return (
    <div className={styles.BuildInfo}>
      <input type="text" placeholder="Build name" />
      <select
        value={heroClass}
        onChange={(e) => characterDispatch({ type: CharacterActions.SET_CLASS, value: +e.currentTarget.value })}
      >
        {Array.from(heroClassNames).map(([hero, name]) => (
          <option key={hero} value={hero}>
            {name}
          </option>
        ))}
      </select>
      <textarea placeholder="Description" />
    </div>
  );
};

export default BuildInfo;
