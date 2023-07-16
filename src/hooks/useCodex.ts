import { useEffect, useState } from 'react';
import { Codex } from '../interfaces';

export default function useCodex() {
  const [codex, setCodex] = useState<Codex>();
  useEffect(() => {
    async function getCodex() {
      const c = await import('../../data/codex-of-power');
      setCodex(c.codexData);
    }
    if (!codex) {
      void getCodex();
    }
  }, [codex]);
  return codex;
}
