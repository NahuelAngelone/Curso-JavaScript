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

    // Actualizo precios antes de cada cálculo
    algoritmos.forEach(algo => actualizarPrecios(algo));

    // Llamo a la function
    let { gpuHashrate, gpuConsumo, costoKWh } = solicitarDatos();

    console.log ( 'Por el momento solo soportamos ' + algoritmos.map(algo => algo.nombre).join("/"))
    console.log(algoritmosFiltrados);
    console.log( '---------------------Datos del rig---------------------');
    console.log( 'Mh/s ' + gpuHashrate, 'Consumo ' + gpuConsumo + 'W', 'U$D ' + costoKWh);

    console.log( '---------------------Cotizacion---------------------');
    console.log( algo2.rvnPrecio + ' RVN/USDT', algo1.xnaPrecio + ' XNA/USDT', algo3.neoxaPrecio + ' NEOXA/USDT');

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

    function recompensaNeoxa (gpuHashrate, algo3) {
        return (gpuHashrate / algo3.hashred) * algo3.recompensaBlock * algo3.nblocksxh
    }
    console.log(recompensaNeoxa (gpuHashrate, algo3) + ' NEOXA');

    console.log( '---------------------Ganancia diaria---------------------');
    function gananciaXna () {
        return recompensaXna (gpuHashrate,algo1) * algo1.xnaPrecio - costoEnergia (gpuConsumo, costoKWh)
    }
    console.log('u$d Diarios ' + gananciaXna () + ' XNA/USDT')
    
    function gananciaRvn () {
        return recompensaRvn (gpuHashrate,algo2) * algo2.rvnPrecio - costoEnergia (gpuConsumo, costoKWh)
    }
    console.log( 'u$d Diarios ' + gananciaRvn () + ' RVN/USDT')

    function gananciaNeoxa () {
        return recompensaNeoxa (gpuHashrate,algo3) * algo3.neoxaPrecio - costoEnergia (gpuConsumo, costoKWh)
    }
    console.log( 'u$d Diarios ' + gananciaNeoxa () + ' NEOXA/USDT')


    console.log( '---------------------Conclusion---------------------');
    // con que alguna de ganancia, calcula que minar
    if ( (gananciaRvn() > 0) || (gananciaXna() > 0) || (gananciaNeoxa() > 0)) {
        console.log ( 'Prende los rigs!!!');
        if (gananciaRvn() > gananciaXna() && gananciaRvn() > gananciaNeoxa()) {
            console.log('Mina RVN');
        } else if (gananciaXna() > gananciaNeoxa()) {
            console.log('Mina XNA');
        } else {
            console.log('Mina NEOXA');
        }
    }
    // si ambas dan perdida recomienda apagar
    if ( (gananciaRvn() < 0) && (gananciaXna() < 0) && (gananciaNeoxa() < 0)) {
        console.log ( 'Apaga los rigs!!!');
    }

    console.log( '--------------------Proyeccion de Ganancias--------------------');
    // de la recomendacion te hace el calculo en tiempo
    if ((gananciaRvn() > 0) || (gananciaXna() > 0) || (gananciaNeoxa() > 0)) {
        if (gananciaRvn() > gananciaXna() && gananciaRvn() > gananciaNeoxa()) {
            console.log('Diario ' + gananciaRvn() * 1 + ' u$d', 'Semanal ' + gananciaRvn() * 7 + ' u$d', 'Mensual ' + gananciaRvn() * 31 + ' u$d');
        } else if (gananciaXna() > gananciaNeoxa()) {
            console.log('Diario ' + gananciaXna() * 1 + ' u$d', 'Semanal ' + gananciaXna() * 7 + ' u$d', 'Mensual ' + gananciaXna() * 31 + ' u$d');
        } else {
            console.log('Diario ' + gananciaNeoxa() * 1 + ' u$d', 'Semanal ' + gananciaNeoxa() * 7 + ' u$d', 'Mensual ' + gananciaNeoxa() * 31 + ' u$d');
        }
    } else {
        console.log("Agarra la pala");
    }
    // para realizar otro calculo
    continuar = confirm("¿Deseas realizar otro calculo?");
    
    
    // Función para actualizar precios
    function actualizarPrecios(algo) {
        algo.precio = Math.random() * (algo.max - algo.min) + algo.min;
        algo.xnaPrecio = Math.random() * (algo.max - algo.min) + algo.min;
        algo.rvnPrecio = Math.random() * (algo.max - algo.min) + algo.min;
        algo.neoxaPrecio = Math.random() * (algo.max - algo.min) + algo.min;
}
}
console.log("Gracias por usar el programa de calculo de mineria.");