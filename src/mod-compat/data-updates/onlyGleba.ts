import { addStartingItems } from 'src/utils/starting-items';
import { addGlebaBacteriaForage } from './any-planet-start';
import { addMiningProductivity, techAddRecipe } from 'src/utils/technology';
import { settingKeys } from 'src/setting-keys';

if(mods['onlyGleba']) {
    data.raw.planet.nauvis.map_gen_settings.property_expression_names.elevation = 'seablock-water-world'
    data.raw.planet.nauvis.map_gen_settings.autoplace_controls = {
        gleba_cliff: { size: 0 },
        gleba_enemy_base: { size: 0 },
        gleba_plants: { size: 0 },
        gleba_stone: { size: 0 },
        gleba_water: { size: 0 },
    }
    data.raw.planet.nauvis.map_gen_settings.autoplace_settings = {
        tile: {
            settings: {
                'highland-yellow-rock': {},
                'wetland-yumako': {},
                'wetland-jellynut': {},
                "wetland-blue-slime": {},
            }
        },
        decorative: {},
        entity: {},
    };
    data.raw.tile['highland-yellow-rock'].autoplace.probability_expression = 'if(x_from_start^2 + y_from_start^2 < 1, 1, -1000)';
    data.raw.tile['wetland-yumako'].autoplace.probability_expression = 'if(x_from_start * y_from_start < 0, 1000, -1000)'
    data.raw.tile['wetland-jellynut'].autoplace.probability_expression = 'if(x_from_start * y_from_start > 0, 1000, -1000)'

    addGlebaBacteriaForage();
    data.extend([
        {
            type: 'recipe',
            name: 'scrap-from-lubricant',
            categories: ['chemistry', 'electromagnetics'],
            energy_required: 2,
            enabled: false,
            allow_productivity: true,
            ingredients: [
                { type: 'fluid', name: 'lubricant', amount: 50 },
            ],
            results: [
                { type: 'item', name: 'scrap', amount_min: 5, amount_max: 10 },
            ],
            auto_recycle: false,
            maximum_productivity: 9999,
        },
    ])
    addMiningProductivity('scrap-from-lubricant');

    data.raw.recipe['iron-bacteria-forage'].surface_conditions = [];
    data.raw.recipe['copper-bacteria-forage'].surface_conditions = [];
    data.raw.recipe['gleba-forage'].surface_conditions = [];
    data.raw.recipe['gleba-forage'].enabled = true;
    data.raw.recipe['iron-bacteria'].enabled = true;
    data.raw.recipe['copper-bacteria'].enabled = true;
    data.raw.recipe['yumako-processing'].enabled = true;
    data.raw.recipe['jellynut-processing'].enabled = true;

    data.raw.recipe['iron-from-sediment'].enabled = false;
    data.raw.recipe['copper-from-sediment'].enabled = false;
    data.raw.recipe['wood-to-coal'].enabled = false;

    addStartingItems('nauvis', 'artificial-yumako-soil', 200);
    addStartingItems('nauvis', 'artificial-jellynut-soil', 200);
    addStartingItems('nauvis', 'yumako-seed', 20);
    addStartingItems('nauvis', 'jellynut-seed', 20);
    for(let item of data.raw['simple-entity']['nauvis-seablock-chest'].minable.results) {
        if(item.name === 'agricultural-tower') {
            item.amount_min = 3;
            item.amount_max = 3;
        }
    }

    techAddRecipe('recycling', 'scrap-from-lubricant');

    if(settings.startup[settingKeys.disableMiningDrills].value) {
        const recyclingTech = data.raw.technology['recycling'];
        for(const [index, effect] of pairs(recyclingTech.effects))
        {
            const effectModifier = effect as prototype.Modifier;
            if(effectModifier.type === 'mining-with-fluid')
            {
                table.remove(recyclingTech.effects, index as number);
            }
        }
    }
}