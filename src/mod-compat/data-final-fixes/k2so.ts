import { settingKeys } from 'src/setting-keys';

// Krastorio2 not k2so, see data-updates/k2so.ts
if(mods['Krastorio2'])
{
    if(settings.startup[settingKeys.disablePumpjacks].value) {
        // Krastorio adds this effect in final-fixes so we need to remove it here
        const mineralWaterGathering = data.raw.technology['kr-mineral-water-gathering'];
        log('effect modifiers')
        for(const [index, effect] of pairs(mineralWaterGathering.effects)) {
            const effectModifier = effect as prototype.Modifier;
            // The "Allow pumpjack to extract mineral water" modifier is of type "nothing"
            if(effectModifier.type === 'nothing') {
                table.remove(mineralWaterGathering.effects, index as number);
            }
        }
    }
}