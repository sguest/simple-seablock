import path from 'path';
import { ModManager } from 'synthetic-factorio';

export async function setup() {
    const manager = new ModManager();
    await manager.installVanillaMods();
    manager.installDirectoryMod('SimpleSeablock', path.join(__dirname, '../dist/SimpleSeablock'), { clearCache: true })
    await manager.installPortalMod('any-planet-start');
    await manager.installPortalMod('space-is-fake', { omitDependencies: ['cr-commons'] });
    await manager.installPortalMod('Krastorio2-spaced-out', { omitDependencies: ['Krastorio2Assets', 'Krastorio2MenuSimulations', 'k2so-assets'] });
    await manager.installPortalMod('bobores');
}
