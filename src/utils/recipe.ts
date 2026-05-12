export function recipeRemoveIngredient(recipeName: string, ingredientName: string) {
    const recipe = data.raw.recipe[recipeName];

    for(const [index, ingredient] of pairs(recipe.ingredients)) {
        if((ingredient as prototype.IngredientPrototype).name === ingredientName) {
            table.remove(recipe.ingredients, index as number);
        }
    }
}

export function recipeAddIngredient(recipeName: string, ingredient: prototype.IngredientPrototype) {
    table.insert(data.raw.recipe[recipeName].ingredients, ingredient);
}