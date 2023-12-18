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

    console.log ( 'Por el momento solo soportamos ' + algoritmos.map(algo => algo.nombre).join("/") + ' - NEOX en proceso')
    console.log(algoritmosFiltrados);
    console.log( '---------------------Datos del rig---------------------');
    console.log( 'Mh/s ' + gpuHashrate, 'Consumo ' + gpuConsumo + 'W', 'U$D ' + costoKWh);

    console.log( '---------------------Cotizacion---------------------');
    console.log( algo2.rvnPrecio + ' RVN/USDT', algo1.xnaPrecio + ' XNA/USDT');

    console.log( '---------------------Hay que pagar la luz---------------------');
    
    function costoEnergia(gpuConsumo, costoKWh) {
        return (gpuConsumo / 1000) * costoKWh * 24;
    }
    console.log( 'Costo de luz ' + costoEnergia(gpuConsumo, costoKWh) + ' u$d');

    console.log( '---------------------Crypto Diaria---------------------');
    function recompensaXna (gpuHashrate, algo1) {
        return (gpuHashrate / algo1.hashred) * algo1.recompensaBlock * algo1.nblocksxh
    }
    console.log(recompensaXna (gpuHashrate, algo1) + ' XNA');

    function recompensaRvn (gpuHashrate, algo2) {
        return (gpuHashrate / algo2.hashred) * algo2.recompensaBlock * algo2.nblocksxh
    }
    console.log(recompensaRvn (gpuHashrate, algo2) + ' RVN');

    console.log( '---------------------Ganancia diaria---------------------');
    function gananciaXna () {
        return recompensaXna (gpuHashrate,algo1) * algo1.xnaPrecio - costoEnergia (gpuConsumo, costoKWh)
    }
    console.log('u$d Diarios ' + gananciaXna () + ' XNA/USDT')
    
    function gananciaRvn () {
        return recompensaRvn (gpuHashrate,algo2) * algo2.rvnPrecio - costoEnergia (gpuConsumo, costoKWh)
    }
    console.log( 'u$d Diarios ' + gananciaRvn () + ' RVN/USDT')


    console.log( '---------------------Conclusion---------------------');
    // con que alguna de ganancia, calcula que minar
    if ( (gananciaRvn() > 0) || (gananciaXna() > 0)) {
        console.log ( 'Prende los rigs!!!');
    if (gananciaRvn() > gananciaXna()) {
        console.log ('Mina RVN')
    } else {
        console.log ('Mina XNA')
    }
    }
    // si ambas dan perdida recomienda apagar
    if ( (gananciaRvn() < 0) && (gananciaXna() < 0)) {
        console.log ( 'Apaga los rigs!!!');
    }

    console.log( '--------------------Proyeccion de Ganancias--------------------');
    // de la recomendacion te hace el calculo en tiempo
    if  ( (gananciaRvn() > 0) || (gananciaXna() > 0)) {
        if (gananciaRvn() > gananciaXna()) {
        console.log ( 'Diario ' + gananciaRvn() * 1 + ' u$d','Semanal ' + gananciaRvn() * 7 + ' u$d', 'Mensual ' + gananciaRvn() * 31 + ' u$d' )
    } else {
        console.log ( 'Diario ' + gananciaXna() * 1  + ' u$d','Semanal ' + gananciaXna() * 7 + ' u$d', 'Mensual ' + gananciaXna() * 31 + ' u$d')
    }
    } else {
        console.log("Agarra la pala")
    }
    // para realizar otro calculo
    continuar = confirm("¿Deseas realizar otro calculo?");
}
console.log("Gracias por usar el programa de calculo de mineria.");