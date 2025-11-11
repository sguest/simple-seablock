import { settingKeys } from '../setting-keys';

if(settings.startup[settingKeys.useMenuBackgrounds].value) {
    data.raw['utility-constants']['default'].main_menu_simulations = {};

    data.raw['utility-constants']['default'].main_menu_simulations['simple-seablock-menu-background-1'] = {
        checkboard: false,
        save: '__SimpleSeablock__/menu-simulations/SimpleSeablockMenu1.zip',
        length: 600,
        init: `
            game.simulation.camera_zoom = 1.5
            game.simulation.camera_surface_index = game.planets['vulcanus'].surface.index
            game.simulation.camera_position = { x = -10, y = 0 }
        `,
    }

    data.raw['utility-constants']['default'].main_menu_simulations['simple-seablock-menu-background-2'] = {
        checkboard: false,
        save: '__SimpleSeablock__/menu-simulations/SimpleSeablockMenu2.zip',
        length: 600,
        init: `
            game.simulation.camera_zoom = 1.5
            game.simulation.camera_surface_index = game.planets['aquilo'].surface.index
            game.simulation.camera_position = { x = 20, y = 0 }
        `,
    }

    data.raw['utility-constants']['default'].main_menu_simulations['simple-seablock-menu-background-3'] = {
        checkboard: false,
        save: '__SimpleSeablock__/menu-simulations/SimpleSeablockMenu3.zip',
        length: 600,
        init: `
            game.simulation.camera_zoom = 1.2
            game.simulation.camera_position = { x = 14, y = 0 }
            game.simulation.camera_surface_index = game.planets['fulgora'].surface.index
        `,
    }
}
    data.raw['utility-constants']['default'].main_menu_simulations['simple-seablock-menu-background-4'] = {
        checkboard: false,
        save: '__SimpleSeablock__/menu-simulations/SimpleSeablockMenu4.zip',
        length: 600,
        init: `
            game.simulation.camera_zoom = 1.2
        `,
    }
