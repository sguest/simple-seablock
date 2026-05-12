import { techAddRecipe } from 'src/utils/technology';

if(mods['space-is-fake']) {
    techAddRecipe('sif-graveyard', 'lava-from-stone');
    techAddRecipe('sif-graveyard', 'ammoniacal-solution-from-water');

    data.raw['autoplace-control']['ammoniacal-vent'].hidden = true;
    data.raw['autoplace-control']['lava-vent'].hidden = true;
}