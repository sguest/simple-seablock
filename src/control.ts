import './control/starting-items';

script.on_init(() => {
    if(remote.interfaces['freeplay'] !== null) {
        remote.call('freeplay', 'set_disable_crashsite', true);
        remote.call('freeplay', 'set_skip_intro', true);
    }

    // Any Planet Start clobbers the standard freeplay crash site and intro, but provides an alternate interface
    if(remote.interfaces.APS !== null) {
        remote.call('APS', 'set_disable_crashsite', true);
        remote.call('APS', 'set_skip_intro', true);
    }
})