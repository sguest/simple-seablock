import { settingKeys } from 'src/setting-keys';
import { addStartingItems } from 'src/utils/starting-items';
import { addMiningProductivity, hideTechnology, techAddRecipe, techRemoveRecipe } from 'src/utils/technology';

if(mods['Krastorio2-spaced-out'])
{
    addStartingItems('nauvis', 'kr-wind-turbine', 5);

    if(settings.startup[settingKeys.disableMiningDrills].value) {
        hideTechnology('kr-electric-mining-drill-mk2');
        data.raw.item['kr-electric-mining-drill-mk2'].flags ||= [];
        data.raw.item['kr-electric-mining-drill-mk2'].hidden = true;
        data.raw.item['kr-quarry-drill'].flags ||= [];
        data.raw.item['kr-quarry-drill'].hidden = true;
        data.raw['mining-drill']['electric-mining-drill'].next_upgrade = null;

        const fluidChemistry = data.raw.technology['kr-fluids-chemistry'];
        for(const [index, effect] of pairs(fluidChemistry.effects)) {
            const effectModifier = effect as prototype.Modifier;
            if(effectModifier.type === 'mining-with-fluid') {
                table.remove(fluidChemistry.effects, index as number);
            }
        }
    }

    data.extend([
        {
            type: 'recipe',
            name: 'rare-metal-from-sediment',
            icon: '__SimpleSeablock__/graphics/icons/rare-metal-from-sediment.png',
            category: 'crafting-with-fluid',
            order: 'ge[rare-metal-ore]',
            energy_required: 2,
            enabled: false,
            always_show_products: true,
            allow_productivity: true,
            ingredients: [
                { type: 'item', name: 'sediment', amount: 4 },
                { type: 'fluid', name: 'kr-chlorine', amount: 3 }
            ],
            results: [{ type: 'item', name: 'kr-rare-metal-ore', amount: 1 }],
            surface_conditions: [{
                property: 'pressure',
                min: 1000,
                max: 1000,
            }],
            auto_recycle: false,
            maximum_productivity: 9999,
        },
        {
            type: 'recipe',
            name: 'imersite-from-sediment',
            icon: '__SimpleSeablock__/graphics/icons/imersite-from-sediment.png',
            order: 'gf[imersite]',
            energy_required: 10,
            enabled: false,
            allow_productivity: true,
            ingredients: [
                { type: 'item', name: 'sediment', amount: 10 },
            ],
            results: [{ type: 'item', name: 'kr-imersite', amount: 1 }],
            surface_conditions: [{
                property: 'pressure',
                min: 1000,
                max: 1000,
            }],
            auto_recycle: false,
            maximum_productivity: 9999,
        },
        {
            type: 'recipe',
            name: 'mineral-water-from-water',
            order: 'gg[mineral-water]',
            category: 'chemistry',
            energy_required: 1,
            enabled: false,
            allow_productivity: true,
            ingredients: [
                { type: 'item', name: 'sediment', amount: 1 },
                { type: 'fluid', name: 'water', amount: 10 },
            ],
            results: [
                { type: 'fluid', name: 'kr-mineral-water', amount: 10 },
            ],
            surface_conditions: [{
                property: 'pressure',
                min: 1000,
                max: 1000,
            }],
            auto_recycle: false,
            maximum_productivity: 9999,
        },
    ]);

    techAddRecipe('kr-quarry-minerals-extraction', 'imersite-from-sediment');
    techRemoveRecipe('kr-quarry-minerals-extraction', 'kr-quarry-drill');
    techAddRecipe('kr-fluids-chemistry', 'rare-metal-from-sediment');
    techAddRecipe('kr-fluids-chemistry', 'mineral-water-from-water');

    addMiningProductivity('rare-metal-from-sediment');
    addMiningProductivity('imersite-from-sediment');
    addMiningProductivity('mineral-water-from-water');

    data.raw['autoplace-control']['kr-imersite'].hidden = true;
    data.raw['autoplace-control']['kr-mineral-water'].hidden = true;
    data.raw['autoplace-control']['kr-rare-metal-ore'].hidden = true;
}
