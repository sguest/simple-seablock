import { settingKeys } from './setting-keys';

data.extend([
    {
        type: 'bool-setting',
        name: settingKeys.useMenuBackgrounds,
        setting_type: 'startup',
        default_value: true,
        order: '1'
    },
    {
        type: 'bool-setting', 
        name: settingKeys.disableMiningDrills,
        setting_type: 'startup',
        default_value: true,
        order: '2'
    },
    {
        type: 'bool-setting',
        name: settingKeys.disablePumpjacks,
        setting_type: 'startup',
        default_value: true,
        order: '3'
    },
    {
        type: 'bool-setting',
        name: settingKeys.disableOvergrowthSoil,
        setting_type: 'startup',
        default_value: true,
        order: '4'
    },
    {
        type: 'bool-setting',
        name: settingKeys.disableCliffExplosives,
        setting_type: 'startup',
        default_value: true,
        order: '6',
    }
]);