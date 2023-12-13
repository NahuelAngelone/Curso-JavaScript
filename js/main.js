// estableciendo variables condicionando numeros y no negatividad  
function solicitarDatos() {
    let gpuHashrate = Number(prompt('Cantidad de mh/s'));
    while (Number.isNaN(gpuHashrate) || (gpuHashrate <= 0))
        gpuHashrate = Number(prompt('Valor incorrecto, pone un numero correspondiente a tu Mh/s'));
    let gpuConsumo = Number(prompt('Consumo de la GPU en Watts')); 
    while (Number.isNaN(gpuConsumo) || (gpuConsumo <= 0)) 
        gpuConsumo = Number(prompt('Valor incorrecto, pone un numero correspondiente a tu consumo en watts'))
    let costoKWh = Number(prompt('Costo del KWh'));
    while (Number.isNaN(costoKWh) || (costoKWh < 0)) 
        costoKWh = Number(prompt('Valor incorrecto, pone un numero correspondiente al precio del Kwh'));       
    return { gpuHashrate, gpuConsumo, costoKWh };
}
 
let continuar = true;
// ciclo para seguir realizando calculos
while (continuar) {

    // Llamo a la function
    let { gpuHashrate, gpuConsumo, costoKWh } = solicitarDatos();


    console.log( '---------------------Datos del rig---------------------');
    console.log( 'Mh/s ' + gpuHashrate, 'Consumo ' + gpuConsumo + 'W', 'U$D ' + costoKWh);

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

    console.log( '---------------------Cotizacion---------------------');
    console.log( algo2.rvnPrecio + ' RVN/USDT', algo1.xnaPrecio + ' XNA/USDT');

    console.log( '---------------------Hay que pagar la luz---------------------');
    const costoEnergia = (gpuConsumo / 1000) * costoKWh * 24
    console.log( 'Costo de luz ' + costoEnergia + ' u$d');

    console.log( '---------------------Crypto Diaria---------------------');
    const recompensaXna = (gpuHashrate / algo1.xnaHashred) * algo1.xnaRecompensaBlock * algo1.xnaNblocksxh
    console.log(recompensaXna + ' XNA');

    const recompensaRvn = (gpuHashrate / algo2.rvnHashred) * algo2.rvnRecompensaBlock * algo2.rvnNblocksxh
    console.log(recompensaRvn + ' RVN');

    console.log( '---------------------Ganancia diaria---------------------');
    const gananciaXna  = recompensaXna * algo1.xnaPrecio - costoEnergia
    console.log('u$d Diarios ' + gananciaXna + ' XNA/USDT')

    const gananciaRvn  = recompensaRvn * algo2.rvnPrecio - costoEnergia
    console.log( 'u$d Diarios ' + gananciaRvn + ' RVN/USDT')


    console.log( '---------------------Conclusion---------------------');
    // con que alguna de ganancia, calcula que minar
    if ( (gananciaRvn > 0) || (gananciaXna > 0)) {
        console.log ( 'Prende los rigs!!!');
    if (gananciaRvn > gananciaXna) {
        console.log ('Mina RVN')
    } else {
        console.log ('Mina XNA')
    }
    }
    // si ambas dan perdida recomienda apagar
    if ( (gananciaRvn < 0) && (gananciaXna < 0)) {
        console.log ( 'Apaga los rigs!!!');
    }

    console.log( '--------------------Proyeccion de Ganancias--------------------');
    // de la recomendacion te hace el calculo en tiempo
    if  ( (gananciaRvn > 0) || (gananciaXna > 0)) {
        if (gananciaRvn > gananciaXna) {
        console.log ( 'Diario ' + gananciaRvn * 1 + ' u$d','Semanal ' + gananciaRvn * 7 + ' u$d', 'Mensual ' + gananciaRvn * 31 + ' u$d' )
    } else {
        console.log ( 'Diario ' + gananciaXna * 1  + ' u$d','Semanal ' + gananciaXna * 7 + ' u$d', 'Mensual ' + gananciaXna * 31 + ' u$d')
    }
    } else {
        console.log("Agarra la pala")
    }
    // para realizar otro calculo
    continuar = confirm("¿Deseas realizar otro calculo?");
}
console.log("Gracias por usar el programa de calculo de mineria.");