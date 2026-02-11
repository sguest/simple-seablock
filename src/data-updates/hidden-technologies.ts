import { listHiddenTechs } from 'src/utils/technology';

const hiddenTechs = listHiddenTechs();

for(let techName of hiddenTechs) {
    const tech = data.raw.technology[techName];
    tech.hidden = true;
}
