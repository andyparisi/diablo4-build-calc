import { AspectTypes } from './enums/aspectTypes';
import { Classes } from './enums/classes';
import { Slots } from './enums/slots';
import { Codex } from './interfaces/index';

export const BUILD_NUMBER = 42942;

export const heroClassNames = new Map<Classes, keyof Codex>([
  [Classes.BARBARIAN, 'Barbarian'],
  [Classes.SORCERER, 'Sorcerer'],
  [Classes.NECROMANCER, 'Necromancer'],
  [Classes.DRUID, 'Druid'],
  [Classes.ROGUE, 'Rogue'],
]);

export const slotsByAspectType = {
  [AspectTypes.Defensive]: new Set([Slots.Amulet, Slots.Chest, Slots.Helm, Slots.Pants, Slots.Shield]),
  [AspectTypes.Offensive]: new Set([Slots.Amulet, Slots.Gloves, Slots.Ring, Slots.Weapon_1H, Slots.Weapon_2H]),
  [AspectTypes.Utility]: new Set([Slots.Amulet, Slots.Boots, Slots.Chest, Slots.Gloves, Slots.Helm, Slots.Shield]),
  [AspectTypes.Resource]: new Set([Slots.Ring]),
  [AspectTypes.Mobility]: new Set([Slots.Amulet, Slots.Boots]),
};

export const aspectTypesBySlot = {
  [Slots.Chest]: new Set([AspectTypes.Defensive, AspectTypes.Utility]),
  [Slots.Helm]: new Set([AspectTypes.Defensive, AspectTypes.Utility]),
  [Slots.Gloves]: new Set([AspectTypes.Offensive, AspectTypes.Utility]),
  [Slots.Pants]: new Set([AspectTypes.Defensive]),
  [Slots.Boots]: new Set([AspectTypes.Utility, AspectTypes.Mobility]),
  [Slots.Amulet]: new Set([AspectTypes.Defensive, AspectTypes.Offensive, AspectTypes.Mobility]),
  [Slots.Ring]: new Set([AspectTypes.Offensive, AspectTypes.Resource]),
  [Slots.Weapon_1H]: new Set([AspectTypes.Offensive]),
  [Slots.Weapon_2H]: new Set([AspectTypes.Offensive]),
  [Slots.Shield]: new Set([AspectTypes.Defensive, AspectTypes.Utility]),
};
