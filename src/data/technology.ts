import { settingKeys } from 'src/setting-keys';
import { addPrerequisite, removePrerequisite, removeSciencePack } from 'src/utils/technology';


removePrerequisite('coal-liquefaction', 'metallurgic-science-pack');
addPrerequisite('coal-liquefaction', 'oil-processing');

removePrerequisite('oil-processing', 'oil-gathering');
addPrerequisite('oil-processing', 'fluid-handling');
const oilProcesing = data.raw.technology['oil-processing'];
oilProcesing.research_trigger = null;
oilProcesing.unit = { count: 50, time: 30, ingredients: [
    ['automation-science-pack', 1],
    ['logistic-science-pack', 1],
]}

removePrerequisite('advanced-oil-processing', 'chemical-science-pack');
addPrerequisite('advanced-oil-processing', 'oil-processing');
addPrerequisite('advanced-oil-processing', 'coal-liquefaction');

addPrerequisite('agriculture', 'steel-processing');
addPrerequisite('agriculture', 'landfill')
removePrerequisite('agriculture', 'planet-discovery-gleba');
addPrerequisite('planet-discovery-gleba', 'agriculture');
const agriculture = data.raw.technology['agriculture'];
agriculture.research_trigger = null;
agriculture.unit = {
    count: 30,
    time: 5,
    ingredients: [['automation-science-pack', 1], ['logistic-science-pack', 1]]
};

// https://mods.factorio.com/mod/SimpleSeablock/discussion/6963dd6733744f78bf745a23
if(settings.startup[settingKeys.disableStartingTechMultiplier].value) {
    agriculture.ignore_tech_cost_multiplier = true;
    data.raw.technology['logistic-science-pack'].ignore_tech_cost_multiplier = true;
    data.raw.technology['steel-processing'].ignore_tech_cost_multiplier = true;
    data.raw.technology['landfill'].ignore_tech_cost_multiplier = true;
    data.raw.technology['automation-2'].ignore_tech_cost_multiplier = true;
}

removePrerequisite('artificial-soil', 'yumako');
removePrerequisite('artificial-soil', 'jellynut');
removePrerequisite('biochamber', 'yumako');
removePrerequisite('biochamber', 'jellynut');
addPrerequisite('artificial-soil', 'planet-discovery-gleba');
addPrerequisite('biochamber', 'planet-discovery-gleba');
removePrerequisite('fish-breeding', 'tree-seeding');
addPrerequisite('fish-breeding', 'agricultural-science-pack');

removeSciencePack('coal-liquefaction', 'chemical-science-pack');
removeSciencePack('coal-liquefaction', 'production-science-pack');
removeSciencePack('coal-liquefaction', 'space-science-pack');
removeSciencePack('coal-liquefaction', 'metallurgic-science-pack');
data.raw.technology['coal-liquefaction'].unit.count = 50;
removeSciencePack('advanced-oil-processing', 'chemical-science-pack');

const uraniumProcessing = data.raw.technology['uranium-processing'];
uraniumProcessing.research_trigger = {
    type: 'craft-item',
    item: 'uranium-ore',
};

const recycling = data.raw.technology['recycling'];
recycling.research_trigger = {
    type: 'craft-item',
    item: 'scrap',
};

const calciteProcessing = data.raw.technology['calcite-processing'];
calciteProcessing.research_trigger = {
    type: 'craft-item',
    item: 'calcite',
};

const tungstenCarbine = data.raw.technology['tungsten-carbide'];
tungstenCarbine.research_trigger = {
    type: 'craft-item',
    item: 'tungsten-ore',
};

addPrerequisite('planet-discovery-vulcanus', 'agriculture');
removePrerequisite('tungsten-steel', 'big-mining-drill');
addPrerequisite('tungsten-steel', 'foundry');
data.raw.technology['tungsten-steel'].research_trigger = {
    type: 'craft-item',
    item: 'foundry',
};

removePrerequisite('planet-discovery-aquilo', 'heating-tower');
data.raw.technology['lithium-processing'].research_trigger = {
    type: 'craft-fluid',
    fluid: 'lithium-brine'
};

data.raw.technology['biter-egg-handling'].research_trigger = {
    type: 'craft-item',
    item: 'biter-egg',
};

export {};