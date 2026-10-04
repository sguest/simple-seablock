import { FactorioEngine, tableToArray } from 'synthetic-factorio';
import { Assertion, describe, expect, it } from 'vitest';
import { settingKeys } from '../src/setting-keys';

function assertMiningProductivity(data: prototype.dataCollection, message: string, tester: (effects: Assertion) => void) {
    for(let i = 1; i <= 3; i++)
    {
        const tech = data.technology[`mining-productivity-${i}`];

        tester(expect(tableToArray(tech.effects), `${message} for mining productivity level ${i}`));
    }
}

describe('Mining productivity', () => {
    it('should remove drill productivity by default', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runSettingsPhase();
        engine.runDataPhase();
        assertMiningProductivity(engine.getRawData(), 'drill productivity removed', effects => effects.not.toContainEqual(expect.objectContaining({ type: 'mining-drill-productivity-bonus' })))
    });

    it('should leave drill productivity when drills are enabled', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runSettingsPhase();
        engine.setSettings({ startup: { [settingKeys.disableMiningDrills]: false } });
        engine.runDataPhase();
        assertMiningProductivity(engine.getRawData(), 'drill productivity kept for drills', effects => effects.toContainEqual(expect.objectContaining({ type: 'mining-drill-productivity-bonus' })))
    });

    it('should leave drill productivity when pumpjacks are enabled', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runSettingsPhase();
        engine.setSettings({ startup: { [settingKeys.disablePumpjacks]: false } });
        engine.runDataPhase();
        assertMiningProductivity(engine.getRawData(), 'drill productivity kept for pumpjacks', effects => effects.toContainEqual(expect.objectContaining({ type: 'mining-drill-productivity-bonus' })))
    });

    it('Should add productivity for recipes', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        engine.runSettingsPhase();
        engine.runDataPhase();
        const data = engine.getRawData();

        for(const recipe  of [
            'wood-to-coal',
            'iron-from-sediment',
            'copper-from-sediment',
            'stone-from-sediment',
            'uranium-from-sediment',
            'scrap-from-heavy-oil',
            'calcite-crystallization',
            'tungsten-from-lava',
            'sulfuric-acid-from-carbon',
            'coal-synthesis-from-lava',
            'oil-from-ammonia',
            'lithium-brine-from-ammonia',
            'fluorine-from-ammonia',
        ]) {
            assertMiningProductivity(data, `${recipe} productivity added`, effects => effects.toContainEqual({ type: 'change-recipe-productivity', recipe, change: 0.1 }))
        }
    });
});