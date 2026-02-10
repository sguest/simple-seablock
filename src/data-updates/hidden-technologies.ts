import { settingKeys } from '../setting-keys';

let hiddenTechs: string[] = [];

if(settings.startup[settingKeys.disableMiningDrills].value) {
    table.insert(hiddenTechs, 'electric-mining-drill');
    table.insert(hiddenTechs, 'big-mining-drill');
}

if(settings.startup[settingKeys.disablePumpjacks].value) {
    table.insert(hiddenTechs, 'oil-gathering');
}

if(settings.startup[settingKeys.disableOvergrowthSoil].value) {
    table.insert(hiddenTechs, 'overgrowth-soil');
}

if(settings.startup[settingKeys.disableCliffExplosives].value) {
    table.insert(hiddenTechs, 'cliff-explosives');
}

table.insert(hiddenTechs, 'yumako');
table.insert(hiddenTechs, 'jellynut');
table.insert(hiddenTechs, 'heating-tower');
table.insert(hiddenTechs, 'foundation');
table.insert(hiddenTechs, 'tree-seeding');

for(let techName of hiddenTechs) {
    const tech = data.raw.technology[techName];
    tech.hidden = true;
}
