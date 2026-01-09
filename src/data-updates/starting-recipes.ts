function enableRecipe(name: string) {
    const recipe = data.raw.recipe[name];
    recipe.enabled = true;
}

enableRecipe('wood-processing');