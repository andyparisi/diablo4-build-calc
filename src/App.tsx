import { useState } from "react";
import styles from "./App.module.sass";
import SkillTree from "./SkillTree/SkillTree";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      <SkillTree />
    </div>
  );
}

export default App;
