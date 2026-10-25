import { FactorioEngine } from 'synthetic-factorio';
import { describe, expect, it } from 'vitest';

describe('bobores compat with furnaces', () => {
    it('should not touch furnaces by default', () => {
        const engine = new FactorioEngine({
            mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'bobores', 'boblibrary'],
        });
        engine.runSettingsPhase();
        engine.runDataPhase();
        for(const furnace of ['stone-furnace', 'steel-furnace', 'electric-furnace']) {
            expect(engine.getRawData().furnace[furnace].result_inventory_size).toBe(1);
        }
    });

    it('should give furnaces 2 output slots when gems from other ores is enabled', () => {
        const engine = new FactorioEngine({
            mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', 'bobores', 'boblibrary'],
        });
        engine.runSettingsPhase();
        engine.setSettings({ startup: { 'bobmods-ores-gemsfromotherores': true } });
        engine.runDataPhase();
        for(const furnace of ['stone-furnace', 'steel-furnace', 'electric-furnace']) {
            expect(engine.getRawData().furnace[furnace].result_inventory_size).toBe(2);
        }
    });
});