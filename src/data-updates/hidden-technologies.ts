import { settingKeys } from 'src/setting-keys';
import { hideTechnology } from 'src/utils/technology';

if(settings.startup[settingKeys.disableMiningDrills].value) {
    hideTechnology('electric-mining-drill');
    hideTechnology('big-mining-drill');
}

if(settings.startup[settingKeys.disablePumpjacks].value) {
    hideTechnology('oil-gathering');
}

if(settings.startup[settingKeys.disableOvergrowthSoil].value) {
    hideTechnology('overgrowth-soil');
}

if(settings.startup[settingKeys.disableCliffExplosives].value) {
    hideTechnology('cliff-explosives');
}

hideTechnology('yumako');
hideTechnology('jellynut');
hideTechnology('heating-tower');
hideTechnology('foundation');
hideTechnology('tree-seeding');
