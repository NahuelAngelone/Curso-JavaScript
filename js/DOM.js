let calculoRealizado = false;

document.getElementById('datosMineria').addEventListener('submit', function(event) {
    event.preventDefault();

    const gpuHashrate = Number(document.getElementById('gpuHashrate').value);
    const gpuConsumo = Number(document.getElementById('gpuConsumo').value);
    const costoKWh = Number(document.getElementById('costoKWh').value);

    // Guardo el costo de la luz en localStorage
    localStorage.setItem('costoKWh', costoKWh);

    Algoritmo.actualizarPreciosGlobales(algoritmos);
    const resultados = ejecutarCalculos(gpuHashrate, gpuConsumo, costoKWh);
    mostrarResultadosEnDOM(resultados);

    calculoRealizado = true;
    mostrarMensajeCalcular();
});

// Cuando se carga la página, verifica si hay un costo guardado y lo usa
document.addEventListener('DOMContentLoaded', (event) => {
    const costoGuardado = localStorage.getItem('costoKWh');
    if (costoGuardado) {
        document.getElementById('costoKWh').value = costoGuardado;
    }
});

function ejecutarCalculos(gpuHashrate, gpuConsumo, costoKWh) {
    let resultados = [];

resultados.push('<h2>Por el momento solo soportamos ' + algoritmos.map(algo => algo.nombre).join("/") + '</h2>');

resultados.push('<div class="resultados-container">');

resultados.push('<table class="mining-table">');

// Datos del Rig
resultados.push('<tr><th colspan="2"><h3>Datos del Rig</h3></th></tr>');
resultados.push('<tr><td>Mh/s</td><td>' + gpuHashrate + '</td></tr>');
resultados.push('<tr><td>Consumo</td><td>' + gpuConsumo + 'W</td></tr>');
resultados.push('<tr><td>Costo KWh</td><td>' + costoKWh + '</td></tr>');

// Cotizaciones
resultados.push('<tr><th colspan="2"><h3>Cotizaciones</h3></th></tr>');
resultados.push('<tr><td>RVN/USDT</td><td>' + algo2.rvnPrecio + '</td></tr>');
resultados.push('<tr><td>XNA/USDT</td><td>' + algo1.xnaPrecio + '</td></tr>');
resultados.push('<tr><td>NEOXA/USDT</td><td>' + algo3.neoxaPrecio + '</td></tr>');

// Costo de luz
resultados.push('<tr><th colspan="2"><h3>Costo de luz</h3></th></tr>');
const costoDeLuz = costoEnergia(gpuConsumo, costoKWh);
resultados.push('<tr><td>Costo</td><td>' + costoDeLuz.toFixed(2) + ' u$d</td></tr>');

// Crypto Diaria
resultados.push('<tr><th colspan="2"><h3>Crypto Diaria</h3></th></tr>');
resultados.push('<tr><td>XNA</td><td>' + recompensaXna(gpuHashrate, algo1).toFixed(6) + '</td></tr>');
resultados.push('<tr><td>RVN</td><td>' + recompensaRvn(gpuHashrate, algo2).toFixed(6) + '</td></tr>');
resultados.push('<tr><td>NEOXA</td><td>' + recompensaNeoxa(gpuHashrate, algo3).toFixed(6) + '</td></tr>');

// Ganancia Diaria
resultados.push('<tr><th colspan="2"><h3>Ganancia Diaria</h3></th></tr>');
resultados.push('<tr><td>XNA</td><td>' + gananciaXna(gpuHashrate, gpuConsumo, costoKWh).toFixed(2) + ' XNA/USDT</td></tr>');
resultados.push('<tr><td>RVN</td><td>' + gananciaRvn(gpuHashrate, gpuConsumo, costoKWh).toFixed(2) + ' RVN/USDT</td></tr>');
resultados.push('<tr><td>NEOXA</td><td>' + gananciaNeoxa(gpuHashrate, gpuConsumo, costoKWh).toFixed(2) + ' NEOXA/USDT</td></tr>');

// Conclusion
resultados.push('<tr><th colspan="2"><h3>Conclusion</h3></th></tr>');
const gananciaMaxima = Math.max(gananciaXna(gpuHashrate, gpuConsumo, costoKWh), gananciaRvn(gpuHashrate, gpuConsumo, costoKWh), gananciaNeoxa(gpuHashrate, gpuConsumo, costoKWh));
if (gananciaMaxima > 0) {
    resultados.push('<tr><td colspan="2">Prende los rigs!!!</td></tr>');
    if (gananciaRvn(gpuHashrate, gpuConsumo, costoKWh) === gananciaMaxima) {
        resultados.push('<tr><td colspan="2">Mina RVN</td></tr>');
    } else if (gananciaXna(gpuHashrate, gpuConsumo, costoKWh) === gananciaMaxima) {
        resultados.push('<tr><td colspan="2">Mina XNA</td></tr>');
    } else {
        resultados.push('<tr><td colspan="2">Mina NEOXA</td></tr>');
}
} else {
    resultados.push('<tr><td colspan="2">Apaga los rigs!!!</td></tr>');
}

resultados.push('</table>');

resultados.push('</div>');

return resultados;

}

function mostrarResultadosEnDOM(resultados) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = resultados.join('<br>');
}

function costoEnergia(gpuConsumo, costoKWh) {
    return (gpuConsumo / 1000) * costoKWh * 24;
}

function recompensaXna(gpuHashrate, algo) {
    return (gpuHashrate / algo.hashred) * algo.recompensaBlock * algo.nblocksxh;
}

function recompensaRvn(gpuHashrate, algo) {
    return (gpuHashrate / algo.hashred) * algo.recompensaBlock * algo.nblocksxh;
}

function recompensaNeoxa(gpuHashrate, algo) {
    return (gpuHashrate / algo.hashred) * algo.recompensaBlock * algo.nblocksxh;
}

function gananciaXna(gpuHashrate, gpuConsumo, costoKWh) {
    return recompensaXna(gpuHashrate, algo1) * algo1.xnaPrecio - costoEnergia(gpuConsumo, costoKWh);
}

function gananciaRvn(gpuHashrate, gpuConsumo, costoKWh) {
    return recompensaRvn(gpuHashrate, algo2) * algo2.rvnPrecio - costoEnergia(gpuConsumo, costoKWh);
}

function gananciaNeoxa(gpuHashrate, gpuConsumo, costoKWh) {
    return recompensaNeoxa(gpuHashrate, algo3) * algo3.neoxaPrecio - costoEnergia(gpuConsumo, costoKWh);
}

function Algoritmo(nombre, dificultad, recompensaBlock, hashred, nblocksxh, min, max) {
    this.nombre = nombre;
    this.dificultad = dificultad;
    this.recompensaBlock = recompensaBlock;
    this.hashred = hashred;
    this.nblocksxh = nblocksxh;
    this.min = min;
    this.max = max;
    this.actualizarPrecios();
}

Algoritmo.prototype.actualizarPrecios = function() {
    this.precio = Algoritmo.generarPrecio(this.min, this.max);
    this.xnaPrecio = this.precio;
    this.rvnPrecio = this.precio;
    this.neoxaPrecio = this.precio;
};

Algoritmo.generarPrecio = function(min, max) {
    return Math.random() * (max - min) + min;
};

// Actualizo precios antes de cada cálculo
Algoritmo.actualizarPreciosGlobales = function(algoritmos) {
    algoritmos.forEach(algo => algo.actualizarPrecios());
};

const algo1 = new Algoritmo('XNA', 72759, 16176, 5510000, 1464, 0.004, 0.1);
const algo2 = new Algoritmo('RVN', 69776, 2500, 5290000, 1440, 0.01, 0.4);
const algo3 = new Algoritmo('NEOX', 8124, 2250, 581000, 1440, 0.0374, 0.05);

const algoritmos = [algo1, algo2, algo3];
const nombresAlgoritmos = ['RVN', 'XNA', 'NEOX', 'CLORE', 'NEURAI', 'SATOX'];   

function mostrarMensajeCalcular() {
    if (calculoRealizado) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Calculado!",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!",
            footer: 'Datos incorrectos o incompletos'
        });
    }
    calculoRealizado = false;
}

btnCalcular.addEventListener('click', () => {
    mostrarMensajeCalcular();
});

btnBorrar.addEventListener('click', () => {
    limpiarResultados();
    
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Borrado!",
        showConfirmButton: false,
        timer: 1500
        });
});

function limpiarResultados() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
}