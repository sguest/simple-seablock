// Make agricultural tower placeable on Vulcanus
const agriculturalTower = data.raw['agricultural-tower']['agricultural-tower'];
for(const [index, c] of pairs(agriculturalTower.surface_conditions)) {
    const condition = c as prototype.SurfaceCondition;
    if(condition.property === 'pressure') {
        condition.max = 4000;
    }
}

// Allow assembling machine 1 to craft organic-or-assembling so it can make tree seeds
table.insert(data.raw['assembling-machine']['assembling-machine-1'].crafting_categories, 'organic-or-assembling');