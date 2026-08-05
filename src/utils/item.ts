const hiddenItems: string[] = [];
const hiddenRecipes: string[] = [];

export function hideItem(itemName: string)
{
    let item = data.raw.item[itemName];
    if(item) {
        item.flags ||= [];
        item.hidden = true;
        hiddenItems.push(itemName);
    }
    // Not currently hiding any fluids, re-visit later if needed
    // let fluid = data.raw.fluid[itemName];
    // if(fluid) {
    //     fluid.hidden = true;
    // }
    let recipe = data.raw.recipe[itemName];
    if(recipe) {
        recipe.enabled = false;
        recipe.hidden = true;
        hiddenRecipes.push(itemName);
    }
}

export function listHiddenItems() {
    return hiddenItems;
}

export function listHiddenRecipes() {
    return hiddenRecipes;
}