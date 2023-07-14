import { Classes } from './enums/classes';
import { Codex } from './interfaces/index';

export const BUILD_NUMBER = 42942;

export const HERO_CLASS_NAMES = new Map<Classes, keyof Codex>([
  [Classes.BARBARIAN, 'Barbarian'],
  [Classes.SORCERER, 'Sorcerer'],
  [Classes.NECROMANCER, 'Necromancer'],
  [Classes.DRUID, 'Druid'],
  [Classes.ROGUE, 'Rogue'],
]);
