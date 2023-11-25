let gpuHashrate = Number(prompt('Cantidad de mh/s')); // Hashrate de la GPU en MH/s
let gpuConsumo = Number(prompt('Consumo de la GPU en Watts')); // Consumo de la GPU en Watts
let costoKWh = Number(prompt('Costo del KWh')); // Costo por kWh en dólares
console.log( 'Mh/s ' + gpuHashrate, 'Consumo ' + gpuConsumo + 'W', 'U$D ' + costoKWh)

let algo1 = 'XNA';
let xnaDificultad = 72759; 
let xnaRecompensaBlock = 16176;
let xnaHashred = 5510000;
let xnaNblocksxh = 1464;
let xnaPrecio = 0.004843;

let algo2 = 'RVN'; 
let rvnDificultad = 69776;
let rvnRecompensaBlock = 2500;
let rvnHashred = 5290000;
let rvnNblocksxh = 1440;
let rvnPrecio = 0.018;

const costoEnergia = (gpuConsumo / 1000) * costoKWh * 24
console.log(costoEnergia);

const recompensaXna = (gpuHashrate / xnaHashred) * xnaRecompensaBlock * xnaNblocksxh
console.log(recompensaXna);

const recompensaRvn = (gpuHashrate / rvnHashred) * rvnRecompensaBlock * rvnNblocksxh
console.log(recompensaRvn);


const gananciaXna  = recompensaXna * xnaPrecio - costoEnergia
console.log('u$d Diarios ' + gananciaXna)

const gananciaRvn  = recompensaRvn * rvnPrecio - costoEnergia
console.log( 'u$d Diarios ' + gananciaRvn)

