import { settingKeys } from '../setting-keys';
import { techAddRecipe, techRemoveRecipe } from 'src/utils/technology';

techRemoveRecipe('agriculture', 'nutrients-from-spoilage');
techAddRecipe('planet-discovery-gleba', 'nutrients-from-spoilage');

techRemoveRecipe('oil-processing', 'chemical-plant');
techAddRecipe('automation-2', 'chemical-plant');

if(settings.startup[settingKeys.disableMiningDrills].value) {
    data.raw.technology['uranium-mining'].effects = [];
}
techAddRecipe('uranium-mining', 'uranium-from-sediment');
techAddRecipe('coal-liquefaction', 'crude-coal-liquefaction');

techAddRecipe('planet-discovery-fulgora', 'scrap-from-heavy-oil');
techAddRecipe('planet-discovery-fulgora', 'foundation-from-concrete');

techRemoveRecipe('yumako', 'yumako-processing');
techRemoveRecipe('yumako', 'copper-bacteria');
techRemoveRecipe('jellynut', 'jellynut-processing');
techRemoveRecipe('jellynut', 'iron-bacteria');
techAddRecipe('planet-discovery-gleba', 'yumako-processing');
techAddRecipe('planet-discovery-gleba', 'jellynut-processing');
techAddRecipe('planet-discovery-gleba', 'copper-bacteria');
techAddRecipe('planet-discovery-gleba', 'iron-bacteria');
techAddRecipe('planet-discovery-gleba', 'gleba-forage');
techRemoveRecipe('heating-tower', 'heating-tower');
techRemoveRecipe('heating-tower', 'heat-pipe');
techRemoveRecipe('heating-tower', 'heat-exchanger');
techRemoveRecipe('heating-tower', 'steam-turbine');
techAddRecipe('planet-discovery-gleba', 'heating-tower');
techAddRecipe('planet-discovery-gleba', 'heat-pipe');
techAddRecipe('planet-discovery-gleba', 'heat-exchanger');
techAddRecipe('planet-discovery-gleba', 'steam-turbine');

techAddRecipe('planet-discovery-vulcanus', 'carbon-processing');
techAddRecipe('planet-discovery-vulcanus', 'calcite-crystallization');
techAddRecipe('planet-discovery-vulcanus', 'coal-synthesis-from-lava');
techAddRecipe('planet-discovery-vulcanus', 'foundation');
techAddRecipe('calcite-processing', 'tungsten-from-lava');
techAddRecipe('calcite-processing', 'sulfuric-acid-from-carbon');

techAddRecipe('planet-discovery-aquilo', 'oil-from-ammonia');
techAddRecipe('planet-discovery-aquilo', 'lithium-brine-from-ammonia');
techAddRecipe('planet-discovery-aquilo', 'fluorine-from-ammonia');

techAddRecipe('captivity', 'egg-mutation');