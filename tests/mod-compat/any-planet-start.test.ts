import { FactorioEngine, tableToArray } from 'synthetic-factorio';
import { describe, expect, it, vi } from 'vitest';

function assertRecipeOnPlanet(data: prototype.dataCollection, recipe: string, planet: string) {
    const technology = data.technology[`planet-discovery-${planet}`];
    const effects = tableToArray(technology.effects);
    expect(effects, `${recipe} unlocked on ${planet}`).toContainEqual({ type: 'unlock-recipe', recipe });
}

function checkNauvisRecipes(engine: FactorioEngine, isGleba = true) {
    const data = engine.getRawData();
    const recipes = [
        'wood-to-coal',
        'fish-spoilage',
        'iron-from-sediment',
        'copper-from-sediment',
        'uranium-from-sediment',
        'tree-seed',
    ];

    if(!isGleba) {
        recipes.push('sediment', 'stone-from-sediment', 'driftwood-forage');
    }

    for(const recipe of recipes) {
        expect(data.recipe[recipe].enabled, `${recipe} disabled`).toBe(false);
        assertRecipeOnPlanet(data, recipe, 'nauvis');
    }
}

describe('Any planet start compat', () => {
    describe('starting on Vulcanus', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'any-planet-start']});
        engine.runSettingsPhase();
        engine.setSettings({ startup: { ['aps-planet']: 'vulcanus' } });
        engine.runDataPhase();

        it('should move nauvis recipes', () => {
            checkNauvisRecipes(engine);
        });

        it('should move recipes to gleba', () => {
            const data = engine.getRawData();
            assertRecipeOnPlanet(data, 'sediment', 'gleba');
            assertRecipeOnPlanet(data, 'stone-from-sediment', 'gleba');
        });

        it('should add starting recipes', () => {
            const data = engine.getRawData();
            expect(data.recipe['molten-iron-from-lava'].enabled).toBe(true);
            expect(data.recipe['molten-copper-from-lava'].enabled).toBe(true);
            expect(data.recipe['casting-iron'].enabled).toBe(true);
            expect(data.recipe['casting-copper'].enabled).toBe(true);
        });
    });

    describe('starting on Fulgora', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'any-planet-start']});
        engine.runSettingsPhase();
        engine.setSettings({ startup: { ['aps-planet']: 'fulgora' } });
        engine.runDataPhase();

        it('should move nauvis recipes', () => {
            checkNauvisRecipes(engine);
        });

        it('should move recipes to gleba', () => {
            const data = engine.getRawData();
            assertRecipeOnPlanet(data, 'sediment', 'gleba');
            assertRecipeOnPlanet(data, 'stone-from-sediment', 'gleba');
        });

        it('should add starting recipes', () => {
            const data = engine.getRawData();
            expect(data.recipe['offshore-pump'].enabled).toBe(true);
        });
    });

    describe('starting on Gleba', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'any-planet-start']});
        engine.runSettingsPhase();
        engine.setSettings({ startup: { ['aps-planet']: 'gleba' } });
        engine.runDataPhase();

        it('should move nauvis recipes', () => {
            checkNauvisRecipes(engine, true);
        });

        it('should move recipes to gleba', () => {
            const data = engine.getRawData();
            assertRecipeOnPlanet(data, 'sediment', 'gleba');
            assertRecipeOnPlanet(data, 'stone-from-sediment', 'gleba');
        });

        it('should retain starting recipes', () => {
            const data = engine.getRawData();
            expect(data.recipe['sediment'].enabled).toBe(true);
            expect(data.recipe['stone-from-sediment'].enabled).toBe(true);
            expect(data.recipe['driftwood-forage'].enabled).toBe(true);
        });
    });

    it('should call APS interface to disable crash site and intro', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'any-planet-start']});
        const disableCrashSite = vi.fn();
        const skipIntro = vi.fn();
        engine.registerRemote('APS', 'set_disable_crashsite', disableCrashSite);
        engine.registerRemote('APS', 'set_skip_intro', skipIntro);
        engine.runControlPhase(['SimpleSeablock']);
        engine.triggerInit();
        expect(disableCrashSite).toHaveBeenCalledWith(true);
        expect(skipIntro).toHaveBeenCalledWith(true);
    });
});