import { settingKeys } from 'src/setting-keys';
import { addPrerequisite, removePrerequisite, techAddRecipe, techFixRecipeExtras, techRemoveRecipe } from 'src/utils/technology';

function fixNauvisRecipe(recipe: string) {
    data.raw.recipe[recipe].enabled = false;
    techAddRecipe('planet-discovery-nauvis', recipe);
}

function makeStartingRecipe(recipe: string, originalTech: string) {
    data.raw.recipe[recipe].enabled = true;
    techRemoveRecipe(originalTech, recipe);
}

if(mods['any-planet-start']) {
    let startingPlanet = settings.startup['aps-planet'].value;

    if(startingPlanet === null || startingPlanet === 'none') {
        startingPlanet = 'nauvis';
    }

    if(startingPlanet !== 'nauvis') {
        techRemoveRecipe('planet-discovery-nauvis', 'basic-oil-processing');
        techRemoveRecipe('planet-discovery-nauvis', 'advanced-oil-processing');
        techAddRecipe('planet-discovery-nauvis', 'crude-coal-liquefaction');
        techRemoveRecipe('coal-liquefaction', 'crude-coal-liquefaction');

        fixNauvisRecipe('wood-to-coal');
        fixNauvisRecipe('fish-spoilage');
        fixNauvisRecipe('sediment');
        fixNauvisRecipe('iron-from-sediment');
        fixNauvisRecipe('copper-from-sediment');
        fixNauvisRecipe('stone-from-sediment');
        fixNauvisRecipe('uranium-from-sediment');
        fixNauvisRecipe('driftwood-forage');
        fixNauvisRecipe('wood-processing');

        techAddRecipe('planet-discovery-gleba', 'sediment');
        techAddRecipe('planet-discovery-gleba', 'stone-from-sediment');

        addPrerequisite('planet-discovery-nauvis', 'agriculture');
    }

    if(startingPlanet === 'nauvis') {
        // Make the starting area just slightly bigger otherwise the game can't find a spot to teleport the player to the planet and crashes
        // I don't know why the teleport fails when dropping from orbit works just fine
        data.raw['noise-expression']['seablock-water-world'].expression = 'if(x_from_start^2 + y_from_start^2 < 3, 1, -1000)';
    }

    if(startingPlanet === 'vulcanus') {
        // Make the starting area just slightly bigger otherwise the game can't find a spot to teleport the player to the planet and crashes
        // I don't know why the teleport fails when dropping from orbit works just fine
        data.raw.tile['volcanic-soil-dark'].autoplace.probability_expression = 'if(x_from_start^2 + y_from_start^2 < 2, 1, -1000)';

        const startingChest = data.raw['simple-entity']['vulcanus-seablock-chest'];

        table.insert(startingChest.minable.results, { type: 'item', name: 'solar-panel', amount_min: 10, amount_max: 10 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'offshore-pump', amount_min: 5, amount_max: 5 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'medium-electric-pole', amount_min: 20, amount_max: 20 });
        makeStartingRecipe('molten-iron-from-lava', 'foundry');
        makeStartingRecipe('molten-copper-from-lava', 'foundry');
        makeStartingRecipe('casting-iron', 'foundry');
        makeStartingRecipe('casting-copper', 'foundry');

        techRemoveRecipe('foundry', 'casting-steel');
        techAddRecipe('steel-processing', 'casting-steel');

        techRemoveRecipe('automation-2', 'chemical-plant');

        removePrerequisite('calcite-processing', 'oil-gathering');
        techAddRecipe('calcite-processing', 'pipe');
        techAddRecipe('calcite-processing', 'pipe-to-ground');

        data.raw.technology['oil-processing'].research_trigger = {
            type: 'craft-fluid',
            fluid: 'sulfuric-acid'
        };

        if(settings.startup[settingKeys.disableStartingTechMultiplier].value) {
            data.raw.technology['engine'].ignore_tech_cost_multiplier = true;
            data.raw.technology['fluid-handling'].ignore_tech_cost_multiplier = true;
        }

        data.extend([
            {
                type: 'recipe',
                name: 'carbon-forage',
                always_show_products: true,
                category: 'hand-crafting',
                enabled: true,
                allow_productivity: false,
                energy_required: 10,
                ingredients: [],
                results: [{ type: 'item', name: 'carbon', amount: 1 }],
                allow_as_intermediate: false,
                allow_decomposition: false,
                surface_conditions: [{
                    property: 'pressure',
                    min: 4000,
                    max: 4000,
                }],
                auto_recycle: false,
            },
            {
                type: 'recipe',
                name: 'carbon-spoilage',
                always_show_products: true,
                enabled: false,
                energy_required: 2,
                ingredients: [
                    { type: 'item', name: 'carbon', amount: 1 },
                ],
                results: [
                    { type: 'item', name: 'spoilage', amount: 1 },
                ],
                allow_as_intermediate: false,
                allow_decomposition: false,
                surface_conditions: [{
                    property: 'pressure',
                    min: 4000,
                    max: 4000,
                }],
                auto_recycle: false,
            }
        ])

        techAddRecipe('agriculture', 'carbon-spoilage');
    }

    if(startingPlanet === 'fulgora') {
        const startingChest = data.raw['simple-entity']['fulgora-seablock-chest'];

        table.insert(startingChest.minable.results, { type: 'item', name: 'lightning-rod', amount_min: 10, amount_max: 10 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'accumulator', amount_min: 10, amount_max: 10 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'offshore-pump', amount_min: 5, amount_max: 5 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'medium-electric-pole', amount_min: 20, amount_max: 20 });

        removePrerequisite('scrap-recycling-productivity-1', 'electic-mining-drill');
        makeStartingRecipe('offshore-pump', 'oil-gathering');
        techFixRecipeExtras('automation-2', 'chemical-plant');
    }

    if(startingPlanet === 'gleba') {
        const startingChest = data.raw['tree']['gleba-seablock-chest'];

        table.insert(startingChest.minable.results, { type: 'item', name: 'solar-panel', amount_min: 20, amount_max: 20 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'medium-electric-pole', amount_min: 20, amount_max: 20 });
        table.insert(startingChest.minable.results, { type: 'item', name: 'stone-furnace', amount_min: 20, amount_max: 20 });

        data.raw.technology['electronics'].research_trigger = {
            type: 'craft-item',
            item: 'copper-bacteria',
        };
        data.raw.technology['steam-power'].research_trigger = {
            type: 'craft-item',
            item: 'iron-bacteria',
        };
        data.raw.technology['landfill'].research_trigger = {
            type: 'craft-item',
            item: 'stone',
        };
        data.raw.technology['heating-tower'].enabled = true;
        data.raw.technology['heating-tower'].hidden = false;

        techAddRecipe('heating-tower', 'heating-tower');
        techAddRecipe('heating-tower', 'heat-pipe');
        techAddRecipe('heating-tower', 'heat-exchanger');
        techAddRecipe('heating-tower', 'steam-turbine');
        techRemoveRecipe('planet-discovery-gleba', 'heating-tower');
        techRemoveRecipe('planet-discovery-gleba', 'heat-pipe');
        techRemoveRecipe('planet-discovery-gleba', 'heat-exchanger');
        techRemoveRecipe('planet-discovery-gleba', 'steam-turbine');

        techRemoveRecipe('planet-discovery-nauvis', 'sediment');
        techRemoveRecipe('planet-discovery-nauvis', 'stone-from-sediment');

        data.extend([
            {
                type: 'recipe',
                name: 'iron-bacteria-forage',
                always_show_products: true,
                category: 'hand-crafting',
                enabled: true,
                allow_productivity: false,
                energy_required: 10,
                ingredients: [],
                results: [{ type: 'item', name: 'iron-bacteria', amount: 1 }],
                allow_as_intermediate: false,
                allow_decomposition: false,
                surface_conditions: [{
                    property: 'pressure',
                    min: 2000,
                    max: 2000,
                }],
                auto_recycle: false,
            },
            {
                type: 'recipe',
                name: 'copper-bacteria-forage',
                always_show_products: true,
                category: 'hand-crafting',
                enabled: true,
                allow_productivity: false,
                energy_required: 10,
                ingredients: [],
                results: [{ type: 'item', name: 'copper-bacteria', amount: 1 }],
                allow_as_intermediate: false,
                allow_decomposition: false,
                surface_conditions: [{
                    property: 'pressure',
                    min: 2000,
                    max: 2000,
                }],
                auto_recycle: false,
            },
        ]);
    }
}