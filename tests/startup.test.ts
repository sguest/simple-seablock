import { FactorioEngine } from 'synthetic-factorio';
import { describe, expect, it, vi } from 'vitest';

describe('startup', () => {
    it('should call freeplay interface to disable crash site and intro', () => {
        const engine = new FactorioEngine({ mods: ['base', 'space-age', 'elevated-rails', 'recycler', 'SimpleSeablock']});
        const disableCrashSite = vi.fn();
        const skipIntro = vi.fn();
        engine.registerRemote('freeplay', 'set_disable_crashsite', disableCrashSite);
        engine.registerRemote('freeplay', 'set_skip_intro', skipIntro);
        engine.runControlPhase(['SimpleSeablock']);
        engine.triggerInit();
        expect(disableCrashSite).toHaveBeenCalledWith(true);
        expect(skipIntro).toHaveBeenCalledWith(true);
    });
})