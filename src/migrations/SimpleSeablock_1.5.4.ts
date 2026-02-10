// Before 1.5.4, hidden technologies were also disabled, which causes issues including being unable to re-enable them later in a given save
// This migration re-enables the recipes, but they will still be hidden in-game if the relevant setting is turned on.
for(const [i ,force] of pairs(game.forces)) {
    force.technologies['electric-mining-drill'].enabled = true;
    force.technologies['big-mining-drill'].enabled = true;
    force.technologies['oil-gathering'].enabled = true;
    force.technologies['overgrowth-soil'].enabled = true;
    force.technologies['cliff-explosives'].enabled = true;
    force.technologies['yumako'].enabled = true;
    force.technologies['jellynut'].enabled = true;
    force.technologies['heating-tower'].enabled = true;
    force.technologies['foundation'].enabled = true;
    force.technologies['tree-seeding'].enabled = true;
}
