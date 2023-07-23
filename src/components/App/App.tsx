import styles from './App.module.sass';
import Planner from '../Planner/Planner';
import { createContext, useReducer } from 'react';
import { characterReducer, defaultCharacterState } from '../../reducers/character';
import { IAppContext } from '../../interfaces';
import BuildInfo from '../BuildInfo/BuildInfo';

export const AppContext = createContext<IAppContext>({
  characterState: defaultCharacterState,
  characterDispatch: () => true,
});

function App() {
  const [characterState, characterDispatch] = useReducer(characterReducer, defaultCharacterState);
  return (
    <AppContext.Provider
      value={{
        characterState,
        characterDispatch,
      }}
    >
      <div className={styles.App}>
        <BuildInfo />
        <Planner />
      </div>
    </AppContext.Provider>
  );
}

export default App;