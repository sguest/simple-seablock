import { settingKeys } from "src/setting-keys";
import { hideItem } from "src/utils/item";
import { addStartingItems } from "src/utils/starting-items";
import { hideTechnology, removePrerequisite, techAddRecipe, techRemoveRecipe } from "src/utils/technology";

// Starting on Aquilo with APS only supported with dw-frozen-reaches, this seems to be the closest to an official support
if(mods['dw-frozen-reaches'])
{
    data.raw['autoplace-control']['meteor-ore'].hidden = true;

    if(mods['any-planet-start'] && settings.startup['aps-planet'].value === 'aquilo')
    {
        addStartingItems('aquilo', 'solar-panel', 10);
        addStartingItems('aquilo', 'offshore-pump', 1);
        addStartingItems('aquilo', 'chemical-plant', 10);
        addStartingItems('aquilo', 'stirling-generator', 2);
        addStartingItems('aquilo', 'stone-furnace', 1);
        addStartingItems('aquilo', 'small-electric-pole', 20);
        addStartingItems('aquilo', 'pipe', 20);
        addStartingItems('aquilo', 'thermal-buoy', 10);
        addStartingItems('aquilo', 'thermal-dissipator', 10);
        addStartingItems('aquilo', 'concrete', 1000);
        addStartingItems('aquilo', 'oil-refinery', 1);
        addStartingItems('aquilo', 'ice-platform', 800);
        addStartingItems('aquilo', 'lithium-plate', 400);

        data.extend([
            {
                type: 'recipe',
                name: 'asteroid-chunks-from-ammoniacal-solution',
                icon: '__dw-frozen-reaches__/graphics/icons/meteor-ore.png',
                categories: ['chemistry'],
                subgroup: 'aquilo-processes',
                energy_required: 2,
                enabled: true,
                ingredients: [
                    { type: 'fluid', name: 'ammonia', amount: 50 },
                ],
                results: [
                    { type: 'item', name: 'carbonic-asteroid-chunk', amount: 1, independent_probability: 0.6 },
                    { type: 'item', name: 'metallic-asteroid-chunk', amount: 1, independent_probability: 0.35 },
                    { type: 'item', name: 'promethium-asteroid-chunk', amount:1, independent_probability: 0.05 },
                ],
                auto_recycle: false,
                maximum_productivity: 9999,
            },
        ])

        if(settings.startup[settingKeys.disableMiningDrills].value) {
            hideTechnology('floating-drill-technology');
            hideItem('seafloor-drill');
        }

        techRemoveRecipe('oil-processing', 'oil-refinery');
        techAddRecipe('fluid-handling', 'oil-refinery');
        removePrerequisite('promethium-thermals', 'lithium-processing');

        data.raw.technology['promethium-thermals'].research_trigger = {
            type: 'craft-item',
            item: 'promethium-asteroid-chunk',
        }

        data.raw.technology['oil-processing'].research_trigger = {
            type: 'craft-fluid',
            fluid: 'crude-oil',
        };

        data.raw.technology['lithium-processing'].research_trigger = {
            type: 'craft-fluid',
            fluid: 'lithium-brine',
        };

        data.raw.technology['crude-asteroid-crushing'].research_trigger = {
            type: 'craft-item',
            item: 'carbonic-asteroid-chunk',
        }

        // Make the starting area just slightly bigger otherwise the game can't find a spot to teleport the player to the planet and crashes
        // I don't know why the teleport fails when dropping from orbit works just fine
        data.raw.tile['snow-flat'].autoplace.probability_expression = 'if(x_from_start^2 + y_from_start^2 < 3, 1, -1000)';
        data.raw.planet.aquilo.map_gen_settings.property_expression_names.elevation = 'if(x_from_start^2 + y_from_start^2 < 3, 1, -1000)';
    }
}