import { describe, expect, it, vi } from 'vitest';
import { FactorioEngine, defines } from 'synthetic-factorio';

describe('Starting items chest', () => {
    it('should generate starting chest when chunk generated', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runControlPhase();
        const planets = ['nauvis', 'gleba', 'fulgora', 'vulcanus', 'aquilo'];
        for(let planet of planets)
        {
            const createEntity = vi.fn();
            engine.triggerEvent(20 /* defines.events.on_chunk_generated */, {
                position: { x: 0, y: 0 },
                surface: {
                    name: planet,
                    create_entity: createEntity,
                }
            });

            expect(createEntity).toHaveBeenCalledWith({ name: `${planet}-seablock-chest`, position: { 1: 1, 2: 1 }});
        }
    });

    it('should not generate starting chest when chunk generated multiple times', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runControlPhase();
        const planets = ['nauvis', 'gleba', 'fulgora', 'vulcanus', 'aquilo'];
        for(let planet of planets)
        {
            const createEntity = vi.fn();
            engine.triggerEvent(20 /* defines.events.on_chunk_generated */, {
                position: { x: 0, y: 0 },
                surface: {
                    name: planet,
                    create_entity: createEntity,
                }
            });
            engine.triggerEvent(20 /* defines.events.on_chunk_generated */, {
                position: { x: 0, y: 0 },
                surface: {
                    name: planet,
                    create_entity: createEntity,
                }
            });

            expect(createEntity).toHaveBeenCalledOnce();
        }
    });

    it('should not generate starting chest when non-origin chunk generated', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runControlPhase();
        const planets = ['nauvis', 'gleba', 'fulgora', 'vulcanus', 'aquilo'];
        for(let planet of planets)
        {
            const createEntity = vi.fn();
            engine.triggerEvent(defines.events.on_chunk_generated, {
                position: { x: 1, y: 0 },
                surface: {
                    name: planet,
                    create_entity: createEntity,
                }
            });

            expect(createEntity).not.toHaveBeenCalled();
        }
    });
});