export type Codex = typeof import('../../data/codex-of-power').codexData;

import { Dispatch } from 'react';
import { Classes } from '../enums/classes';
import { Slots } from '../enums/slots';
import { CharacterAction } from '../reducers/character';

export interface IAppContext {
  characterState: Character;
  characterDispatch: Dispatch<CharacterAction>;
}

export interface Character {
  heroClass: Classes;
  name: string;
  equipment: Map<Slots, Aspect | null>;
}

export interface Aspect {
  id: number;
  type: 'Legendary' | 'Unique';
  description: string;
  nameLocalized: {
    [key: string]: string;
  };
  descriptionLocalized: {
    [key: string]: string;
  };
  dungeon: string;
  region: string;
  values: string[];
}
