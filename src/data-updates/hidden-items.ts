import { addHiddenEntity } from 'src/utils/entity';
import { settingKeys } from '../setting-keys';
import { hideItem } from 'src/utils/item';

if(settings.startup[settingKeys.disableMiningDrills].value) {
    hideItem('burner-mining-drill');
    addHiddenEntity(data.raw['mining-drill']['burner-mining-drill']);
    hideItem('electric-mining-drill');
    addHiddenEntity(data.raw['mining-drill']['electric-mining-drill']);
    hideItem('big-mining-drill');
    addHiddenEntity(data.raw['mining-drill']['big-mining-drill']);
}

if(settings.startup[settingKeys.disablePumpjacks].value) {
    hideItem('pumpjack');
    addHiddenEntity(data.raw['mining-drill']['pumpjack']);
}

if(settings.startup[settingKeys.disableOvergrowthSoil].value) {
    hideItem('overgrowth-jellynut-soil');
    hideItem('overgrowth-yumako-soil');
}

if(settings.startup[settingKeys.disableCliffExplosives].value) {
    hideItem('cliff-explosives');
}