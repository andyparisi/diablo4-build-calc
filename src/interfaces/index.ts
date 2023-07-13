import { Dispatch } from "react";
import { Classes } from "../enums/classes";
import { Slots } from "../enums/slots";
import { CharacterAction } from "../reducers/character";

export interface IAppContext {
  characterState: Character;
  characterDispatch: Dispatch<CharacterAction>;
}

export interface Character {
  class: Classes;
  name: string;
  equipment: Map<Slots, Item | null>;
}

export interface Item {
  name: string;
}
