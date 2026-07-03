const hiddenEntities: prototype.EntityPrototype[] = [];

export function addHiddenEntity(entity: prototype.EntityPrototype) {
    hiddenEntities.push(entity);
}

export function listHiddenEntities() {
    return hiddenEntities;
}