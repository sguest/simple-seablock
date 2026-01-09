const tree = data.raw.plant['tree-plant'];
table.insert(tree.autoplace.tile_restriction, 'landfill');

const plant_flags: prototype.EntityPrototypeFlags = ['placeable-neutral', 'placeable-off-grid', 'breaths-air']

const ashland_tree_plant = table.deepcopy(data.raw['tree']['ashland-lichen-tree']) as prototype.PlantPrototype;
ashland_tree_plant.type = 'plant';
ashland_tree_plant.name = 'ashland-tree-plant';
ashland_tree_plant.localised_name = ['entity-name.ashland-lichen-tree'];
ashland_tree_plant.flags = plant_flags;
ashland_tree_plant.hidden_in_factoriopedia = false;
ashland_tree_plant.factoriopedia_alternative = null;
ashland_tree_plant.map_color = [ 0.1, 0.2, 0.1, 0.2 ];
ashland_tree_plant.agricultural_tower_tint = {
    primary: { r: 0.2, g: 0.3, b: 0.1, a: 1 },
    secondary: { r: 0.1, g: 0.2, b: 0.02, a: 1 },
};
ashland_tree_plant.minable = {
    mining_particle: 'wooden-particle',
    mining_time: 0.5,
    results: [{ type: 'item', name: 'carbon', amount: 20 }],
}
ashland_tree_plant.variation_weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
ashland_tree_plant.growth_ticks = 5 * 60 * 60;
ashland_tree_plant.surface_conditions = [ { property: 'pressure', min: 4000, max: 4000 }];
ashland_tree_plant.autoplace = {
    probability_expression: 0,
    tile_restriction: ['volcanic-soil-dark', 'foundation'],
}

data.extend([ashland_tree_plant]);
