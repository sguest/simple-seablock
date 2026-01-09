script.on_event(defines.events.on_player_created, e => {
    let player = game.players.get(e.player_index);

    if(player.controller_type === defines.controllers.character)
    {
        player.get_inventory(defines.inventory.character_main).clear();
    }
})

script.on_event(defines.events.on_chunk_generated, e => {
    const position = e.position as { x: number, y: number };

    if(position.x === 0 && position.y === 0)
    {
        if(e.surface.name === 'nauvis') {
            e.surface.create_entity({
                name: 'nauvis-seablock-chest',
                position: [1, 1],
            });
        }
        if(e.surface.name === 'vulcanus') {
            e.surface.create_entity({
                name: 'vulcanus-seablock-chest',
                position: [1, 1],
            });
        }
        if(e.surface.name === 'fulgora') {
            e.surface.create_entity({
                name: 'fulgora-seablock-chest',
                position: [1, 1],
            });
        }
        if(e.surface.name === 'gleba') {
            e.surface.create_entity({
                name: 'gleba-seablock-chest',
                position: [1, 1],
            });
        }
        if(e.surface.name === 'aquilo') {
            e.surface.create_entity({
                name: 'aquilo-seablock-chest',
                position: [1, 1],
            });
        }
    }
})