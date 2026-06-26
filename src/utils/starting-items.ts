export function addStartingItems(planet: string, item: string, amount: number)
{
    let key: 'simple-entity' | 'tree' = 'simple-entity';
    if(planet === 'gleba') {
        key = 'tree'
    }
    const chest = data.raw[key][planet + '-seablock-chest'];
    table.insert(chest.minable.results, { type: 'item', name: item, amount_min: amount, amount_max: amount });
}