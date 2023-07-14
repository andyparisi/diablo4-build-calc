import { useEffect, useState } from 'react';
import { Codex } from '../interfaces';

export default function useCodex() {
  const [codex, setCodex] = useState<Codex>();
  useEffect(() => {
    async function getCodex() {
      const c = await import('../../data/codex-of-power');
      setCodex(c.codexData);
    }
    void getCodex();
  }, []);
  return codex;
}
