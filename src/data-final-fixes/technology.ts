import { listHiddenTechs, removePrerequisite } from 'src/utils/technology';

// Find any techs that depend on ones we removed and make the removed tech no longer a dependency
const hiddenTechs = listHiddenTechs();

for(const [i, technology] of pairs(data.raw.technology)) {
    if(technology.prerequisites) {
        for(let tech of hiddenTechs) {
            for(let prerequisite of technology.prerequisites) {
                if(prerequisite === tech) {
                    removePrerequisite(technology.name, prerequisite);
                }
            }
        }
    }
}