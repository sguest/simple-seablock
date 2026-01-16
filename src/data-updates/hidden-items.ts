import { settingKeys } from '../setting-keys';

let hiddenItems: string[] = [];

if(settings.startup[settingKeys.disableMiningDrills].value) {
    table.insert(hiddenItems, 'burner-mining-drill');
    table.insert(hiddenItems, 'electric-mining-drill');
    table.insert(hiddenItems, 'big-mining-drill');
}

if(settings.startup[settingKeys.disablePumpjacks].value) {
    table.insert(hiddenItems, 'pumpjack');
}

if(settings.startup[settingKeys.disableOvergrowthSoil].value) {
    table.insert(hiddenItems, 'overgrowth-jellynut-soil');
    table.insert(hiddenItems, 'overgrowth-yumako-soil');
}

if(settings.startup[settingKeys.disableCliffExplosives].value) {
    table.insert(hiddenItems, 'cliff-explosives');
}

for(let itemName of hiddenItems) {
    let item = data.raw.item[itemName];
    if(item) {
        item.flags ||= [];
        item.hidden = true;
    }
    let fluid = data.raw.fluid[itemName];
    if(fluid) {
        fluid.hidden = true;
    }
    let recipe = data.raw.recipe[itemName];
    if(recipe) {
        recipe.enabled = false;
        recipe.hidden = true;
    }
}