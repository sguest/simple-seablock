/// <reference path="../../../types/bobmods.d.ts" />

import { addMiningProductivity } from 'src/utils/technology';

function getRecipeName(key: string) {
    const name = bobmods.ores[key].name;

    return `${name}-from-sediment`
}

if(mods['bobores']) {
    const settingMap = {
        "bobmods-ores-enablebauxite": "bauxite",
        "bobmods-ores-enablecobaltore": "cobalt",
        "bobmods-ores-enablegemsore": "gems",
        "bobmods-ores-enablegoldore": "gold",
        "bobmods-ores-enableleadore": "lead",
        "bobmods-ores-enablenickelore": "nickel",
        "bobmods-ores-enablequartz": "quartz",
        "bobmods-ores-enablerutile": "rutile",
        "bobmods-ores-enablesilverore": "silver",
        "bobmods-ores-enabletinore": "tin",
        "bobmods-ores-enabletungstenore": "tungsten",
        "bobmods-ores-enablezincore": "zinc",
        "bobmods-ores-enablewaterores": "lithia_water",
        "bobmods-ores-enablethoriumore": "thorium",
    }

    for(let [setting, key] of pairs(settingMap)) {
        if(settings.startup[setting].value) {
            const ore = bobmods.ores[key];
            if(ore.items)
            {
                const results: prototype.ProductPrototype[] = [];
                let allItems = true;
                // Need to iterate this since ore.items isn't a *full* ProductPrototype, doesn't define "type" if type is "item" for example
                for(let item of ore.items) {
                    if(item.type && item.type !== 'item') {
                        allItems = false;
                    }
                    table.insert(results, {
                        type: 'item',
                        name: item.name,
                        amount: item.amount,
                        amount_min: item.amount_min,
                        amount_max: item.amount_max,
                    })
                };

                if(allItems)
                {
                    const name = getRecipeName(key);
                    let icon_size = 32;
                    // Tungsten uses the space-age icon and is 64x64, the rest of the icon are based on the bob's ores assets which are all 32x32
                    if(key === 'tungsten')
                    {
                        icon_size = 64;
                    }

                    data.extend([
                        {
                            type: 'recipe',
                            name,
                            icon: `__SimpleSeablock__/graphics/icons/${name}.png`,
                            icon_size,
                            subgroup: 'raw-resource',
                            order: `ge[${key}]`,
                            energy_required: 2 * ore.mining_time,
                            enabled: true,
                            allow_productivity: true,
                            ingredients: [
                                { type: 'item', name: 'sediment', amount: 2 },
                            ],
                            results,
                            surface_conditions: [{
                                property: 'pressure',
                                min: 1000,
                                max: 1000,
                            }],
                            auto_recycle: false,
                            maximum_productivity: 9999,
                        },
                    ]);

                    if(data.raw['autoplace-control'][ore.name])
                    {
                        data.raw['autoplace-control'][ore.name].hidden = true;
                    }
                    addMiningProductivity(name);
                }
            }
        }
    }

    if(settings.startup['bobmods-ores-enablegemsore'].value)
    {
        const name = 'bob-gems-ore-from-sediment';

        data.extend([
            {
                type: 'recipe',
                name,
                icon: '__SimpleSeablock__/graphics/icons/bob-gems-ore-from-sediment.png',
                icon_size: 32,
                subgroup: 'raw-resource',
                order: `gf[gems-ore]`,
                energy_required: 5,
                enabled: true,
                allow_productivity: true,
                ingredients: [
                    { type: 'item', name: 'sediment', amount: 2 },
                ],
                results: [
                    { type: 'item', name: 'bob-ruby-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-rubyratio'].value as number) },
                    { type: 'item', name: 'bob-sapphire-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-sapphireratio'].value as number) },
                    { type: 'item', name: 'bob-emerald-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-emeraldratio'].value as number) },
                    { type: 'item', name: 'bob-amethyst-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-amethystratio'].value as number) },
                    { type: 'item', name: 'bob-topaz-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-topazratio'].value as number) },
                    { type: 'item', name: 'bob-diamond-ore', amount: 1, independent_probability: 0.1 * (settings.startup['bobmods-gems-diamondratio'].value as number) },
                ],
                surface_conditions: [{
                    property: 'pressure',
                    min: 1000,
                    max: 1000,
                }],
                auto_recycle: false,
                maximum_productivity: 9999,
            },
        ]);

        addMiningProductivity(name);
        data.raw['autoplace-control']['bob-gem-ore'].hidden = true;
    }

    if(settings.startup['bobmods-ores-enablewaterores'].value)
    {
        const name = 'bob-lithia-water-from-water';

        data.extend([
            {
                type: 'recipe',
                name,
                order: 'gg[lithia-water]',
                subgroup: 'fluid-recipes',
                categories: ['chemistry'],
                energy_required: 1,
                enabled: true,
                allow_productivity: true,
                ingredients: [
                    { type: 'item', name: 'sediment', amount: 1 },
                    { type: 'fluid', name: 'water', amount: 10 },
                ],
                results: [
                    { type: 'fluid', name: 'bob-lithia-water', amount: 10 },
                ],
                surface_conditions: [{
                    property: 'pressure',
                    min: 1000,
                    max: 1000,
                }],
                auto_recycle: false,
                maximum_productivity: 9999,
            },
        ]);

        addMiningProductivity(name);
        data.raw['autoplace-control']['bob-lithia-water'].hidden = true;
    }

    if(settings.startup['bobmods-ores-gemsfromotherores'].value)
    {
        const gemChance = settings.startup['bobmods-ores-gemprobability'].value as number;

        data.raw.recipe['wood-to-coal'].results = [
            { type: 'item', name: 'coal', amount: 10 },
            { type: 'item', name: 'bob-diamond-ore', amount: 1, independent_probability: gemChance },
        ]

        if(settings.startup['bobmods-ores-enablebauxite'].value)
        {
            data.raw.recipe[getRecipeName('bauxite')].results = [
                { type: 'item', name: 'bob-bauxite-ore', amount: 1, },
                { type: 'item', name: 'bob-ruby-ore', amount: 1, independent_probability: gemChance / 3 },
                { type: 'item', name: 'bob-sapphire-ore', amount: 1, independent_probability: gemChance / 3 },
                { type: 'item', name: 'bob-topaz-ore', amount: 1, independent_probability: gemChance / 3 },
            ];
        }

        if(settings.startup['bobmods-ores-enablequartz'].value)
        {
            data.raw.recipe[getRecipeName('quartz')].results = [
                { type: 'item', name: 'bob-quartz', amount: 1, },
                { type: 'item', name: 'bob-emerald-ore', amount: 1, independent_probability: gemChance / 2 },
                { type: 'item', name: 'bob-amethyst-ore', amount: 1, independent_probability: gemChance / 2 },
            ];
        }
    }

    if(settings.startup['bobmods-ores-nickelgivescobalt'].value && settings.startup['bobmods-ores-enablenickelore'].value)
    {
        data.raw.recipe[getRecipeName('nickel')].results = [
            { type: 'item', name: 'bob-nickel-ore', amount: 1,},
            { type: 'item', name: 'bob-cobalt-ore', amount: 1, independent_probability: settings.startup['bobmods-ores-nickelcobaltratio'].value as number}
        ];
    }

    if(settings.startup['bobmods-ores-leadgivesnickel'].value && settings.startup['bobmods-ores-enableleadore'].value)
    {
        data.raw.recipe[getRecipeName('lead')].results = [
            { type: 'item', name: 'bob-lead-ore', amount: 1,},
            { type: 'item', name: 'bob-nickel-ore', amount: 1, independent_probability: settings.startup['bobmods-ores-leadnickelratio'].value as number}
        ];
    }

    if(data.raw['autoplace-control']['bob-ground-water'])
    {
        data.raw['autoplace-control']['bob-ground-water'].hidden = true;
    }
}