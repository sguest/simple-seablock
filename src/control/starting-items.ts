import { default_ship_parts } from 'crash-site';

script.on_event(defines.events.on_player_created, e => {
    let player = game.players.get(e.player_index);

    if(player.controller_type === defines.controllers.character)
    {
        player.get_main_inventory().clear();
    }

    if(script.active_mods['any-planet-start']) {
        // APS doesn't respect other mods disabling the crash site and intro, unless they run on_init first
        // which we will never do since APS is a dependency
        // so, remove the crash site and cancel the intro cutscene
        // Ideally we'd do this in the aps-post-init event, but it seems to not be raised if a crash site is present
        let surface = player.surface;
        let shipParts = default_ship_parts();
        let partNames: string[] = ['crash-site-spaceship', 'crash-site-fire-flame', 'crash-site-explosion-smoke'];
        for(let part of shipParts)
        {
            if(part.variations) {
                for(let i = 1; i <= part.variations; i++) {
                    partNames.push(`${part.name}-${i}`);
                }
            }
            else {
                partNames.push(part.name);
            }
        }

        for(let entity of surface.find_entities_filtered({name: partNames}))
        {
            entity.destroy({ raise_destroy: false });
        }

        player.exit_cutscene();
    }
});

// Due to APS's crash site shenanigans, need to re-clear the inventory after the cutscene is cancelled or we'll end up with a lingering burner drill
if(script.active_mods['any-planet-start']) {
    script.on_event(defines.events.on_cutscene_cancelled, e => {
        if(!storage.apsInventoryCleared)
        {
            storage.apsInventoryCleared = true;
            const player = game.players.get(e.player_index);

            if(player.controller_type === defines.controllers.character)
            {
                player.get_main_inventory().clear();
            }
        }
    })
}

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