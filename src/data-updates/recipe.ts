const foundation = data.raw.recipe.foundation;

foundation.energy_required = 5;
foundation.ingredients = [
    { type: 'item', name: 'stone', amount: 20 },
    { type: 'item', name: 'steel-plate', amount: 4 },
]

const foundationRecycling = data.raw.recipe['foundation-recycling'];

foundationRecycling.results = [
    { type: 'item', name: 'stone', amount: 5 },
    { type: 'item', name: 'steel-plate', amount: 1 },
];