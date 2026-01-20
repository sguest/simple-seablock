const nauvis_rock = table.deepcopy(data.raw['simple-entity']['big-rock']);
nauvis_rock.name = 'nauvis-seablock-chest';
nauvis_rock.localised_name = ['entity-name.big-rock'];
nauvis_rock.collision_box = [[0, 0], [0, 0]];
nauvis_rock.minable.mining_time = 0.5;
nauvis_rock.minable.results = [
    { type: 'item', name: 'landfill', amount_min: 1000, amount_max: 1000 },
    { type: 'item', name: 'agricultural-tower', amount_min: 2, amount_max: 2 },
    { type: 'item', name: 'chemical-plant', amount_min: 10, amount_max: 10 },
    { type: 'item', name: 'offshore-pump', amount_min: 1, amount_max: 1 },
    { type: 'item', name: 'boiler', amount_min: 1, amount_max: 1 },
    { type: 'item', name: 'steam-engine', amount_min: 1, amount_max: 1 },
    { type: 'item', name: 'stone-furnace', amount_min: 1, amount_max: 1 },
    { type: 'item', name: 'small-electric-pole', amount_min: 20, amount_max: 20 },
    { type: 'item', name: 'pipe', amount_min: 20, amount_max: 20 },
    { type: 'item', name: 'wood', amount_min: 50, amount_max: 50 },
];

const vulcanus_rock = table.deepcopy(data.raw['simple-entity']['big-volcanic-rock']);
vulcanus_rock.name = 'vulcanus-seablock-chest';
vulcanus_rock.localised_name = ['entity-name.big-volcanic-rock'];
vulcanus_rock.collision_box = [[0, 0], [0, 0]];
vulcanus_rock.minable.mining_time = 0.5;
vulcanus_rock.minable.results = [
    { type: 'item', name: 'foundation', amount_min: 500, amount_max: 500 },
    { type: 'item', name: 'agricultural-tower', amount_min: 2, amount_max: 2 },
    { type: 'item', name: 'ashland-tree-seed', amount_min: 20, amount_max: 20 },
    { type: 'item', name: 'foundry', amount_min: 10, amount_max: 10 },
];

const fulgora_ruin = table.deepcopy(data.raw['simple-entity']['fulgoran-ruin-small']);
fulgora_ruin.name = 'fulgora-seablock-chest';
fulgora_ruin.localised_name = ['entity-name.fulgoran-ruin-small'];
fulgora_ruin.collision_box = [[0, 0], [0, 0]];
fulgora_ruin.minable.mining_time = 0.5;
fulgora_ruin.minable.results = [
    { type: 'item', name: 'foundation', amount_min: 500, amount_max: 500 },
    { type: 'item', name: 'electromagnetic-plant', amount_min: 10, amount_max: 10 },
];

const gleba_tree = table.deepcopy(data.raw['tree']['slipstack']);
gleba_tree.name = 'gleba-seablock-chest';
gleba_tree.localised_name = ['entity-name.slipstack'];
gleba_tree.collision_box = [[0, 0], [0, 0]];
gleba_tree.minable.mining_time = 0.5;
gleba_tree.minable.results = [
    { type: 'item', name: 'landfill', amount_min: 800, amount_max: 800 },
    { type: 'item', name: 'artificial-yumako-soil', amount_min: 200, amount_max: 200 },
    { type: 'item', name: 'artificial-jellynut-soil', amount_min: 200, amount_max: 200 },
    { type: 'item', name: 'yumako-seed', amount_min: 20, amount_max: 20 },
    { type: 'item', name: 'jellynut-seed', amount_min: 20, amount_max: 20 },
    { type: 'item', name: 'agricultural-tower', amount_min: 2, amount_max: 2 },
];

const aquilo_ice = table.deepcopy(data.raw['simple-entity']['lithium-iceberg-big']);
aquilo_ice.name = 'aquilo-seablock-chest';
aquilo_ice.localised_name = ['entity-name.lithium-iceberg-big'];
aquilo_ice.collision_box = [[0, 0], [0, 0]];
aquilo_ice.minable.mining_time = 0.5;
aquilo_ice.minable.results = [
    { type: 'item', name: 'ice-platform', amount_min: 200, amount_max: 200 },
];

data.extend([nauvis_rock, vulcanus_rock, fulgora_ruin, gleba_tree, aquilo_ice]);