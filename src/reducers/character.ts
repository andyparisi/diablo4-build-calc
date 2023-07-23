import { Reducer } from 'react';
import { Character, Aspect } from '../interfaces';
import { Classes } from '../enums/classes';
import { Slots } from '../enums/slots';

export const defaultCharacterState: Character = {
  heroClass: Classes.NECROMANCER,
  name: 'Meatball',
  equipment: new Map(),
};

export enum CharacterActions {
  SET_CLASS = 'SET_CLASS',
  EQUIP = 'EQUIP',
  UNEQUIP = 'UNEQUIP',
  UNEQUIP_ALL = 'UNEQUIP_ALL',
}

export type CharacterAction =
  | {
      type: CharacterActions.EQUIP;
      value: {
        slot: Slots;
        aspect: [string, Aspect];
      };
    }
  | {
      type: CharacterActions.SET_CLASS;
      value: Classes;
    }
  | {
      type: CharacterActions.UNEQUIP;
      value: Slots;
    }
  | {
      type: CharacterActions.UNEQUIP_ALL;
      value: undefined;
    };

export const characterReducer: Reducer<Character, CharacterAction> = (state, { type, value }) => {
  const equipment = new Map(state.equipment);
  switch (type) {
    case CharacterActions.SET_CLASS:
      return { ...state, heroClass: value };
    case CharacterActions.EQUIP:
      equipment.set(value.slot, value.aspect);
      return { ...state, equipment };
    case CharacterActions.UNEQUIP:
      equipment.delete(value);
      return { ...state, equipment };
    case CharacterActions.UNEQUIP_ALL:
      return { ...state, equipment: new Map() };
    default:
      return state;
  }
};