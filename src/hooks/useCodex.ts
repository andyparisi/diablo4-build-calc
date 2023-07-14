import { useEffect, useState } from 'react';

export default function useCodex() {
	const [codex, setCodex] = useState({});
	useEffect(() => {
		async function getCodex() {
			const c = await import('../../data/codex-of-power');
			setCodex(c.codexData);
		}
		void getCodex();
	}, []);
	return codex;
}
