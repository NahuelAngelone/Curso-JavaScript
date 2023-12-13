const algo1 = {
    nombre: 'XNA',
    xnaDificultad: 72759,
    xnaRecompensaBlock: 16176,
    xnaHashred: 5510000,
    xnaNblocksxh: 1464,
    xmin: 0.004,
    xmax: 0.1,
}
algo1.xnaPrecio= Math.random() * (algo1.xmax - algo1.xmin) + algo1.xmin;

const algo2 = {
    nombre: 'RVN',
    rvnDificultad: 69776,
    rvnRecompensaBlock: 2500,
    rvnHashred: 5290000,
    rvnNblocksxh: 1440,
    rmin: 0.01,
    rmax: 0.4,
}
algo2.rvnPrecio= Math.random() * (algo2.rmax - algo2.rmin) + algo2.rmin;