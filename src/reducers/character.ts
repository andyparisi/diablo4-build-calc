import { Reducer } from 'react';
import { Character, Aspect } from '../interfaces';
import { Classes } from '../enums/classes';
import { Slots } from '../enums/slots';

export const defaultCharacterState: Character = {
  class: Classes.BARBARIAN,
  name: 'Meatball',
  equipment: new Map([[Slots.Amulet, { name: "Mara's Kaleidoscope" }]]),
};

export enum CharacterActions {
  SET_CLASS = 'SET_CLASS',
  EQUIP = 'EQUIP',
  UNEQUIP = 'UNEQUIP',
}

export type CharacterAction =
  | {
      type: CharacterActions.EQUIP;
      value: {
        slot: Slots;
        aspect: Aspect;
      };
    }
  | {
      type: CharacterActions.SET_CLASS;
      value: Classes;
    }
  | {
      type: CharacterActions.UNEQUIP;
      value: Slots;
    };

export const characterReducer: Reducer<Character, CharacterAction> = (state, { type, value }) => {
  const equipment = new Map(state.equipment);
  switch (type) {
    case CharacterActions.SET_CLASS:
      return { ...state, class: value };
    case CharacterActions.EQUIP:
      equipment.set(value.slot, value.aspect);
      return { ...state, equipment };
    case CharacterActions.UNEQUIP:
      equipment.delete(value);
      return { ...state, equipment };
    default:
      return state;
  }
};
