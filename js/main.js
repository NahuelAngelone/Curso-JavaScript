let gpuHashrate = Number(prompt('Cantidad de mh/s')); // Hashrate de la GPU en MH/s
let gpuConsumo = Number(prompt('Consumo de la GPU en Watts')); // Consumo de la GPU en Watts
let costoKWh = Number(prompt('Costo del KWh')); // Costo por kWh en dólares

console.log( '---------------------Datos del rig---------------------');
console.log( 'Mh/s ' + gpuHashrate, 'Consumo ' + gpuConsumo + 'W', 'U$D ' + costoKWh);

let algo1 = 'XNA';
let xnaDificultad = 72759; 
let xnaRecompensaBlock = 16176;
let xnaHashred = 5510000;
let xnaNblocksxh = 1464;
// randomizo el precio para que vayan cambiando los resultados.
let xmin = 0.005;
let xmax = 0.2
let xnaPrecio = Math.random() * (xmax - xmin) + xmin;

let algo2 = 'RVN'; 
let rvnDificultad = 69776;
let rvnRecompensaBlock = 2500;
let rvnHashred = 5290000;
let rvnNblocksxh = 1440;
let rmin = 0.005;
let rmax = 0.2
let rvnPrecio = Math.random() * (rmax - rmin) + rmin;

console.log( '---------------------Cotizacion---------------------');
console.log( rvnPrecio + ' RVN/USDT', xnaPrecio + ' XNA/USDT');

console.log( '---------------------Hay que pagar la luz---------------------');
const costoEnergia = (gpuConsumo / 1000) * costoKWh * 24
console.log( 'Costo de luz ' + costoEnergia + ' u$d');

console.log( '---------------------Crypto Diaria---------------------');
const recompensaXna = (gpuHashrate / xnaHashred) * xnaRecompensaBlock * xnaNblocksxh
console.log(recompensaXna + ' XNA');

const recompensaRvn = (gpuHashrate / rvnHashred) * rvnRecompensaBlock * rvnNblocksxh
console.log(recompensaRvn + ' RVN');

console.log( '---------------------Ganancia diaria---------------------');
const gananciaXna  = recompensaXna * xnaPrecio - costoEnergia
console.log('u$d Diarios ' + gananciaXna + ' XNA/USDT')

const gananciaRvn  = recompensaRvn * rvnPrecio - costoEnergia
console.log( 'u$d Diarios ' + gananciaRvn + ' RVN/USDT')


console.log( '---------------------Conclusion---------------------');
while ( (gananciaRvn > 0) || (gananciaXna > 0)) {
    console.log ( 'Prende los rigs!!!');
if (gananciaRvn > gananciaXna) {
    console.log ('Mina RVN')
    break
} else {
    console.log ('Mina XNA')
    break
}
}

while ( (gananciaRvn < 0) && (gananciaXna < 0)) {
    console.log ( 'Apaga los rigs!!!');
    break
}

console.log( '--------------------Proyeccion de Ganancias--------------------');
if  ( (gananciaRvn > 0) || (gananciaXna > 0)) {
    if (gananciaRvn > gananciaXna) {
    console.log ( 'Diario ' + gananciaRvn * 1 + ' u$d','Semanal ' + gananciaRvn * 7 + ' u$d', 'Mensual ' + gananciaRvn * 31 + ' u$d' )
} else {
    console.log ( 'Diario ' + gananciaXna * 1  + ' u$d','Semanal ' + gananciaXna * 7 + ' u$d', 'Mensual ' + gananciaXna * 31 + ' u$d')
}
} else {
    console.log("Agarra la pala")
}
