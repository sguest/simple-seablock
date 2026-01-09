data.extend([{
    type: 'noise-expression',
    name: 'seablock-water-world',
    expression: 'if(x_from_start^2 + y_from_start^2 < 2, 1, -1000)',
}])

const nauvisData = data.raw.planet.nauvis;
nauvisData.map_gen_settings.property_expression_names.elevation = 'seablock-water-world';
nauvisData.map_gen_settings.autoplace_controls = {
    trees: { size: 0 },
    'enemy-base': { size: 0 },
    'iron-ore': { size: 0 },
    'copper-ore': { size: 0 },
    'stone': { size: 0 },
    'coal': { size: 0 },
    'uranium-ore': { size: 0 },
    'crude-oil': { size: 0 },
};
nauvisData.map_gen_settings.autoplace_settings = {
    tile: {
        settings: {
            'dirt-1': {},
            water: {},
            deepwater: {},
        }
    },
    decorative: {},
    entity: {
        settings: {
            fish: {},
        },
    },
};

const noiseExpressionString = 'if(x_from_start^2 + y_from_start^2 < 1, 1, -1000)';

const fulgoraData = data.raw.planet.fulgora;
fulgoraData.map_gen_settings.property_expression_names.elevation = 'seablock-water-world';
fulgoraData.map_gen_settings.autoplace_controls = {
    scrap: { size: 0 },
    fulgora_islands: { size: 0 },
    fulgora_cliff: { size: 0 },
};
fulgoraData.map_gen_settings.autoplace_settings = {
    tile: {
        settings: {
            'oil-ocean-shallow': {},
            'oil-ocean-deep': {},
            'fulgoran-dunes': {},
        }
    },
    decorative: {},
    entity: {},
}
data.raw.tile['fulgoran-dunes'].autoplace.probability_expression = noiseExpressionString;

const vulcanusData = data.raw.planet.vulcanus;
vulcanusData.map_gen_settings.property_expression_names.elevation = 'seablock-water-world'
vulcanusData.map_gen_settings.autoplace_controls = {
    calcite: { size: 0 },
    sulfuric_acid_geyser: { size: 0 },
    tungsten_ore: { size: 0 },
    vulcanus_coal: { size: 0 },
    vulcanus_volcanism: { size: 0 },
}
vulcanusData.map_gen_settings.autoplace_settings = {
    tile: {
        settings: {
            'volcanic-soil-dark': {},
            lava: {},
            'lava-hot': {},
        }
    },
    decorative: {},
    entity: {},
}
data.raw.tile['volcanic-soil-dark'].autoplace.probability_expression = noiseExpressionString;

const glebaData = data.raw.planet.gleba;
glebaData.map_gen_settings.property_expression_names.elevation = 'seablock-water-world'
glebaData.map_gen_settings.autoplace_controls = {
    gleba_cliff: { size: 0 },
    gleba_enemy_base: { size: 0 },
    gleba_plants: { size: 0 },
    gleba_stone: { size: 0 },
    gleba_water: { size: 0 },
}
glebaData.map_gen_settings.autoplace_settings = {
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
}
data.raw.tile['highland-yellow-rock'].autoplace.probability_expression = noiseExpressionString;
data.raw.tile['wetland-yumako'].autoplace.probability_expression = 'if(x_from_start < 0, 1000, -1000)'
data.raw.tile['wetland-jellynut'].autoplace.probability_expression = 'if(x_from_start > 0, 1000, -1000)'

const aquiloData = data.raw.planet.aquilo;
aquiloData.map_gen_settings.property_expression_names.elevation = 'seablock-water-world'
aquiloData.map_gen_settings.autoplace_controls = {
    aquilo_crude_oil: { size: 0 },
    fluorine_vent: { size: 0 },
    lithium_brine: { size: 0 },
}
aquiloData.map_gen_settings.autoplace_settings = {
    tile: {
        settings: {
            'snow-flat': {},
            'ammoniacal-ocean': {},
            'ammoniacal-ocean-2': {},
        }
    },
    decorative: {},
    entity: {},
}
data.raw.tile['snow-flat'].autoplace.probability_expression = noiseExpressionString
