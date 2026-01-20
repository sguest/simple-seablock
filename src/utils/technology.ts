export function techRemoveRecipe(techName: string, recipeName: string) {
    const technology = data.raw.technology[techName];

    for(const [index, effect] of pairs(technology.effects)) {
        const effectModifier = effect as prototype.Modifier;
        if(effectModifier.type === 'unlock-recipe' && effectModifier.recipe === recipeName) {
            table.remove(technology.effects, index as number);
        }
    }
}

export function techAddRecipe(techName: string, recipeName: string) {
    const technology = data.raw.technology[techName];

    table.insert(technology.effects, { type: 'unlock-recipe', recipe: recipeName })
}

export function techFixRecipeExtras(techName: string, recipeName: string) {
    const technology = data.raw.technology[techName];
    let found = false;

    for(const [index, effect] of pairs(technology.effects)) {
        const effectModifier = effect as prototype.Modifier;
        if(effectModifier.type === 'unlock-recipe' && effectModifier.recipe === recipeName) {
            if(found)
            {
                table.remove(technology.effects, index as number);
            }
            else {
                found = true;
            }
        }
    }
}

export function removePrerequisite(techName: string, prerequisite: string) {
    let technology = data.raw.technology[techName];
    for(const [index, name] of pairs(technology.prerequisites)) {
        if(name === prerequisite) {
            table.remove(technology.prerequisites, index as number);
        }
    }
}

export function addPrerequisite(techName: string, prerequisite: string) {
    table.insert(data.raw.technology[techName].prerequisites, prerequisite);
}

type sciencePackIngredient = [string, number];

export function removeSciencePack(techName: string, packName: string) {
    let technology = data.raw.technology[techName];

    for(const [index, ingredient] of pairs(technology.unit.ingredients)) {
        if((ingredient as sciencePackIngredient)[0] === packName)  {
            table.remove(technology.unit.ingredients, index as number)
        }
    }
}
