script.on_event(defines.events.on_player_created, e => {
    let player = game.players.get(e.player_index);

    if(player.controller_type === defines.controllers.character)
    {
        player.get_main_inventory().clear();
    }
});

script.on_event(defines.events.on_chunk_generated, e => {
    const position = e.position as { x: number, y: number };

    if(position.x === 0 && position.y === 0)
    {
        if(e.surface.name === 'nauvis' && !storage.nauvis_chest_generated) {
            e.surface.create_entity({
                name: 'nauvis-seablock-chest',
                position: [1, 1],
            });
            storage.nauvis_chest_generated = true;
        }
        if(e.surface.name === 'vulcanus' && !storage.vulcanus_chest_generated) {
            e.surface.create_entity({
                name: 'vulcanus-seablock-chest',
                position: [1, 1],
            });
            storage.vulcanus_chest_generated = true
        }
        if(e.surface.name === 'fulgora' && !storage.fulgora_chest_generated) {
            e.surface.create_entity({
                name: 'fulgora-seablock-chest',
                position: [1, 1],
            });
            storage.fulgora_chest_generated = true;
        }
        if(e.surface.name === 'gleba' && !storage.gleba_chest_generated) {
            e.surface.create_entity({
                name: 'gleba-seablock-chest',
                position: [1, 1],
            });
            storage.gleba_chest_generated = true;
        }
        if(e.surface.name === 'aquilo' && !storage.aquilo_chest_generated) {
            e.surface.create_entity({
                name: 'aquilo-seablock-chest',
                position: [1, 1],
            });
            storage.aquilo_chest_generated = true;
        }
    }
})