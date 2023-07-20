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
  equipment: Map<Slots, [string, Aspect] | null>;
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
  flavor: string;
  slot: string;
  dropLevel: number;
  dropWeight: number;
  class: Classes;
}

export type AspectType = {
  [k: string]: Aspect;
};

export type Codex = Omit<typeof import('../../data/codex-of-power').codexData, 'Categories'>;

export type UniquesBySlot = {
  [categoryType: string]: {
    [key: number]: Array<[string, Aspect]>;
  };
};
