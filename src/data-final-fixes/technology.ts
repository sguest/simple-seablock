import { listHiddenRecipes } from 'src/utils/item';
import { listHiddenTechs, removePrerequisite } from 'src/utils/technology';

const hiddenTechs = listHiddenTechs();
const hiddenRecipes = listHiddenRecipes();

// Find any techs that depend on ones we removed and make the removed tech no longer a dependency
for(const [i, technology] of pairs(data.raw.technology)) {
    if(technology.prerequisites) {
        for(let tech of hiddenTechs) {
            for(let prerequisite of technology.prerequisites) {
                if(prerequisite === tech) {
                    removePrerequisite(technology.name, prerequisite);
                }
            }
        }
    }
}

// If any hidden techs contain items that were not intentionally hidden, enable them
// Anything we're hiding intentionally should have its items/recipes handled manually
// So this probably means another mod added a recipe to a tech we're hiding (i.e. Age of Production adds wooden planks to tree seeding)
// This might enable some recipes earlier than they should be, but without this step the recipe would just be lost/inaccessible.
for(const hiddenTech of hiddenTechs) {
    const technology = data.raw.technology[hiddenTech];

    if(technology.effects) {
        for(const [index, effect] of pairs(technology.effects)) {
            const effectModifier = effect as prototype.Modifier;
            if(effectModifier.type === 'unlock-recipe')
            {
                let isHiddenRecipe = false;
                for(const recipe of hiddenRecipes)
                {
                    if(effectModifier.recipe === recipe) {
                        isHiddenRecipe = true;
                    }
                }
                if(!isHiddenRecipe) {
                    data.raw.recipe[effectModifier.recipe].enabled = true;
                }
            }
        }
    }
}