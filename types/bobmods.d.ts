interface bobOreData {
    icon: string;
    items: prototype.ProductPrototype[];
    mining_time: number;
    name: string;
    planets: string[];
    // Other props not needed for this mod
}

interface bobmodsData {
    ores: { [key: string]: bobOreData };
}

declare const bobmods: bobmodsData;