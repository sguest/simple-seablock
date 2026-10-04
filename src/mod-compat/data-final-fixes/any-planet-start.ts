if(mods['any-planet-start']) {
    let startingPlanet = settings.startup['aps-planet'].value;

    if(startingPlanet === null || startingPlanet === 'none') {
        startingPlanet = 'nauvis';
    }

    // Something was re-disabling this when trying to disable it in data-updates
    if(startingPlanet !== 'nauvis') {
        data.raw.recipe['tree-seed'].enabled = false;
    }
}