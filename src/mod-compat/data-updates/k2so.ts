import { settingKeys } from 'src/setting-keys';
import { addHiddenEntity } from 'src/utils/entity';
import { addStartingItems } from 'src/utils/starting-items';
import { addMiningProductivity, addPrerequisite, hideTechnology, removePrerequisite, removeSciencePack, techAddRecipe, techRemoveRecipe } from 'src/utils/technology';

// Even though k2so is strictly the optional dep, gating this on presence of Krastorio2 instead
// Krastorio2 is a required dep of k2so, so this should always fire when k2so is installed
// Doing it this way prevents a crash at startup with Krastorio 2 is installed alongside Simple Seablock but *without* k2so
// https://mods.factorio.com/mod/SimpleSeablock/discussion/6a412984b877c1aabec0ea07
// However, this is still not really a supported scenario as Krastorio 2 has broken progression with space age without k2so, as per its mod page
if(mods['Krastorio2'])
{
    addStartingItems('nauvis', 'kr-wind-turbine', 5);

    if(settings.startup[settingKeys.disableMiningDrills].value) {
        hideTechnology('kr-electric-mining-drill-mk2');
        data.raw.item['kr-electric-mining-drill-mk2'].flags ||= [];
        data.raw.item['kr-electric-mining-drill-mk2'].hidden = true;
        data.raw.item['kr-quarry-drill'].flags ||= [];
        data.raw.item['kr-quarry-drill'].hidden = true;

        addHiddenEntity(data.raw['mining-drill']['kr-electric-mining-drill-mk2']);

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
            categories: ['crafting-with-fluid'],
            order: 'ge[rare-metal-ore]',
            energy_required: 2,
            enabled: false,
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
            categories: ['chemistry'],
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
        {
            type: 'recipe',
            name: 'biomass-from-wood',
            categories: ['chemistry'],
            energy_required: 120,
            enabled: false,
            allow_productivity: false,
            ingredients: [
                { type: 'fluid', name: 'petroleum-gas', amount: 100 },
                { type: 'fluid', name: 'kr-oxygen', amount: 100 },
                { type: 'item', name: 'wood', amount: 20 },
            ],
            results: [
                { type: 'item', name: 'kr-biomass', amount: 5 },
            ],
            surface_conditions: [{
                property: 'pressure',
                min: 1000,
                max: 1000,
            }],
            auto_recycle: false,
        }
    ]);

    removeSciencePack('kr-bio-processing', 'military-science-pack');
    removePrerequisite('kr-bio-processing', 'military-science-pack');
    addPrerequisite('military-science-pack', 'kr-bio-processing');
    techAddRecipe('kr-bio-processing', 'biomass-from-wood');

    techAddRecipe('kr-quarry-minerals-extraction', 'imersite-from-sediment');
    techRemoveRecipe('kr-quarry-minerals-extraction', 'kr-quarry-drill');
    techAddRecipe('kr-fluids-chemistry', 'rare-metal-from-sediment');
    techAddRecipe('kr-mineral-water-gathering', 'mineral-water-from-water');

    addMiningProductivity('rare-metal-from-sediment');
    addMiningProductivity('imersite-from-sediment');
    addMiningProductivity('mineral-water-from-water');

    data.raw['autoplace-control']['kr-imersite'].hidden = true;
    data.raw['autoplace-control']['kr-mineral-water'].hidden = true;
    data.raw['autoplace-control']['kr-rare-metal-ore'].hidden = true;
}
