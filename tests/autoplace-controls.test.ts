import { FactorioEngine } from 'synthetic-factorio';
import { describe, expect, it } from 'vitest';
import { ignoredDependencies } from './testGlobals';

describe('Autoplace controls', () => {
    it.each([
        [[]],
        [['any-planet-start']],
        [['space-is-fake']],
        [['Krastorio2-spaced-out', 'Krastorio2', 'flib']],
        [['bobores', 'boblibrary']],
        [['dw-frozen-reaches', 'dredgeworks', 'stirling-generator']],
        [['onlyGleba']],
    ])('should hide all autoplace controls for $0', (modList) => {
        const engine = new FactorioEngine({
            mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock', ...modList],
            ignoredDependencies,
        });
        engine.runSettingsPhase();
        engine.runDataPhase();
        const autoplaceControls = engine.getRawData()['autoplace-control'];
        for(const key in autoplaceControls) {
            if(autoplaceControls[key]) {
                if(!autoplaceControls[key].hidden) {
                    console.log(autoplaceControls[key]);
                }
                expect(autoplaceControls[key].hidden, `${key} autoplace control hidden`).toBe(true);
            }
        }
    });
});