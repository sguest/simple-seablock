import { settingKeys } from 'src/setting-keys';
import { recipeAddIngredient, recipeRemoveIngredient } from 'src/utils/recipe';

if(mods['space-is-fake']) {
    const startingChest = data.raw['simple-entity']['nauvis-seablock-chest'];

    // Give the foundries and EM plants you would get for going to Vulcanus and Fulgora
    table.insert(startingChest.minable.results, { type: 'item', name: 'foundry', amount_min: 10, amount_max: 10 });
    table.insert(startingChest.minable.results, { type: 'item', name: 'electromagnetic-plant', amount_min: 10, amount_max: 10 });
    // Give a few heating towers since trees give spoilage plus a whole mess of different seeds that need to be dealt with
    table.insert(startingChest.minable.results, { type: 'item', name: 'heating-tower', amount_min: 10, amount_max: 10 });

    data.extend([
        {
            type: 'recipe',
            name: 'lava-from-stone',
            categories: ['metallurgy'],
            subgroup: 'vulcanus-processes',
            energy_required: 1,
            enabled: false,
            allow_productivity: true,
            ingredients: [
                { type: 'item', name: 'stone', amount: 10 },
            ],
            results: [
                { type: 'fluid', name: 'lava', amount: 100 },
            ],
            maximum_productivity: 9999,
            auto_recycle: false,
        },
        {
            type: 'recipe',
            name: 'ammoniacal-solution-from-water',
            categories: ['chemistry'],
            subgroup: 'aquilo-processes',
            energy_required: 2,
            enabled: false,
            allow_productivity: true,
            ingredients: [
                { type: 'fluid', name: 'water', amount: 100 },
            ],
            results: [
                { type: 'fluid', name: 'ammoniacal-solution', amount: 50 },
            ],
            maximum_productivity: 9999,
            auto_recycle: false,
        },
    ]);

    for(let i = 1; i <= 3; i++)
    {
        const miningProductivity = data.raw.technology[`mining-productivity-${i}`];

        miningProductivity.effects.push({
            type: 'change-recipe-productivity',
            recipe: 'lava-from-stone',
            change: 0.1,
        })
        miningProductivity.effects.push({
            type: 'change-recipe-productivity',
            recipe: 'ammoniacal-solution-from-water',
            change: 0.1,
        })
    }

    if(settings.startup[settingKeys.disableMiningDrills].value) {
        recipeRemoveIngredient('celestial-drill', 'big-mining-drill');
        recipeAddIngredient('celestial-drill', { type: 'item', name: 'electric-engine-unit', amount: 10 });
    }
}