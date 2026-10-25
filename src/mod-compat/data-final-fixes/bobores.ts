if(mods['bobores']) {
    /*
    Gems from other ores makes diamonds come from coal. Coal comes from furnaces in seablock
    Furnaces will not produce recipes with more outputs than the furnace has outputs, even using shared probability
    Therefore, need to take any furnace that does smelting operations and make sure it has at least 2 outputs
    */
    if(settings.startup['bobmods-ores-gemsfromotherores'].value)
    {
        for(const [_, furnace] of pairs(data.raw.furnace)) {
            if(furnace.result_inventory_size < 2) {
                let canSmelt = false;
                for(const category of furnace.crafting_categories) {
                    if(category === 'smelting') {
                        canSmelt = true;
                    }
                }

                if(canSmelt) {
                    furnace.result_inventory_size = 2;
                }
            }
        }
    }
}