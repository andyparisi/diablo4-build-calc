import { Reducer } from "react";
import { Character } from "../interfaces";
import { Classes } from "../enums/classes";
import { Slots } from "../enums/slots";

export const defaultCharacterState: Character = {
  class: Classes.BARBARIAN,
  name: "Meatball",
  equipment: new Map([[Slots.Amulet, { name: "Mara's Kaleidoscope" }]]),
};

export enum CharacterActions {
  SET_CLASS = "SET_CLASS",
  EQUIP = "EQUIP",
  UNEQUIP = "UNEQUIP",
}

export interface CharacterAction {
  type: CharacterActions;
  value?: any;
}

export const characterReducer: Reducer<Character, CharacterAction> = (
  state,
  { type, value }
) => {
  const equipment = new Map(state.equipment);
  switch (type) {
    case CharacterActions.SET_CLASS:
      return { ...state, class: value };
    case CharacterActions.EQUIP:
      equipment.set(value.slot, value.slotValue);
      return { ...state, equipment };
    case CharacterActions.UNEQUIP:
      equipment.delete(value.slot);
      return { ...state, equipment };
    default:
      return state;
  }
};
