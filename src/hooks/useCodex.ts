import { useEffect, useState } from 'react';
import { Aspect, Codex, UniquesBySlot } from '../interfaces';
import { classValues, slotValues } from '../constants';
import { Slots } from '../enums/slots';

export default function useCodex(): [Codex | undefined, UniquesBySlot | undefined] {
  const [codex, setCodex] = useState<Codex | undefined>();
  const [uniquesBySlot, setUniquesBySlot] = useState<UniquesBySlot | undefined>();
  useEffect(() => {
    async function getCodex() {
      const c: Codex = (await import('../../data/codex-of-power')).codexData;
      const uniques: UniquesBySlot = {};
      Object.entries(c).forEach(([categoryName, category]) => {
        Object.entries(category).forEach(([aspectTypeName, aspectType]) => {
          Object.entries(aspectType as object).forEach(([name, aspect]) => {
            const a = aspect as Aspect;
            if (a.type === 'Unique') {
              // Try to match the item slot
              let slot = slotValues.get(a.slot);
              // If it's not quite there, find it
              if (slot == null) {
                if (a.slot.endsWith('Shield')) {
                  slot = Slots.Shield;
                } else if (a.slot.startsWith('1H')) {
                  slot = Slots.Weapon_1H;
                } else if (a.slot.startsWith('2H')) {
                  slot = Slots.Weapon_2H;
                }
              }
              slot = slot ?? Slots.Amulet;
              // Set a class property on it
              const heroClass = classValues.get(categoryName);
              if (heroClass) {
                a.class = heroClass;
              }
              uniques[categoryName] = uniques[categoryName] ?? {};
              uniques[categoryName][slot] = uniques[categoryName][slot] ?? [];
              // Build out the set of uniques per slot
              uniques[categoryName][slot].push([name, a]);
              // Delete the existing unique position
              delete (c as never)[categoryName][aspectTypeName][name];
            }
          });
        });
      });
      if (!codex) {
        setCodex(c);
      }
      if (!uniquesBySlot) {
        setUniquesBySlot(uniques);
        console.log(uniques);
      }
    }
    void getCodex();
  }, []);

  return [codex, uniquesBySlot];
}
