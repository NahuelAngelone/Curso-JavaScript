// Defino el constructor de objetos para los algoritmos
function Algoritmo(nombre, dificultad, recompensaBlock, hashred, nblocksxh, min, max) {
    this.nombre = nombre;
    this.dificultad = dificultad;
    this.recompensaBlock = recompensaBlock;
    this.hashred = hashred;
    this.nblocksxh = nblocksxh;
    this.min = min;
    this.max = max;
    this.precio = Math.random() * (max - min) + min;
    this.xnaPrecio = Math.random() * (this.max - this.min) + this.min;
    this.rvnPrecio = Math.random() * (this.max - this.min) + this.min;
}

// Creo objetos usando el constructor
const algo1 = new Algoritmo('XNA', 72759, 16176, 5510000, 1464, 0.004, 0.1);
const algo2 = new Algoritmo('RVN', 69776, 2500, 5290000, 1440, 0.01, 0.4);
const algo3 = new Algoritmo('NEOX',70000, 2500, 6290000, 1470, 0.01, 0.4)

// Almaceno los objetos en un array llamado algoritmos
const algoritmos = [algo1, algo2, algo3];

// Array de nombres de algoritmos
const nombresAlgoritmos = ['RVN', 'XNA', 'NEOX', 'CLORE', 'NEURAI', 'SATOX'];

// Filtro el array de algoritmos para incluir solo los definidos en nombresAlgoritmos
const algoritmosFiltrados = algoritmos.filter(algo => nombresAlgoritmos.includes(algo.nombre));

