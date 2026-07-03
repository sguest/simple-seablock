import { listHiddenEntities } from 'src/utils/entity';

const hiddenEntities = listHiddenEntities();

// Anything that has been hidden will error out if it has a next_upgrade, so clear it out
for(let entity of hiddenEntities) {
    entity.next_upgrade = null;
}