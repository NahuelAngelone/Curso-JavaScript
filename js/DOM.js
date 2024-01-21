
document.getElementById('datosMineria').addEventListener('submit', function (event) {
  event.preventDefault();

  const gpuHashrate = Number(document.getElementById('gpuHashrate').value);
  const gpuConsumo = Number(document.getElementById('gpuConsumo').value);
  const costoKWh = Number(document.getElementById('costoKWh').value);

  // Guardo el costo de la luz en localStorage
  localStorage.setItem('costoKWh', costoKWh);

  const resultados = ejecutarCalculos(gpuHashrate, gpuConsumo, costoKWh);
  mostrarResultadosEnDOM(resultados);
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  toggleMode(currentMode);

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
  resultados.push('<tr><td>RVN/USDT</td><td>' + algoritmos[0].precio + '</td></tr>');
  resultados.push('<tr><td>XNA/USDT</td><td>' + algoritmos[2].precio + '</td></tr>');
  resultados.push('<tr><td>NEOXA/USDT</td><td>' + algoritmos[1].precio + '</td></tr>');

  // Costo de luz
  resultados.push('<tr><th colspan="2"><h3>Costo de luz</h3></th></tr>');
  const costoDeLuz = costoEnergia(gpuConsumo, costoKWh);
  resultados.push('<tr><td>Costo</td><td>' + costoDeLuz.toFixed(2) + ' u$d</td></tr>');

  // Crypto Diaria
  resultados.push('<tr><th colspan="2"><h3>Crypto Diaria</h3></th></tr>');
  resultados.push('<tr><td>XNA</td><td>' + recompensaXna(gpuHashrate, algoritmos[2]).toFixed(6) + '</td></tr>');
  resultados.push('<tr><td>RVN</td><td>' + recompensaRvn(gpuHashrate, algoritmos[0]).toFixed(6) + '</td></tr>');
  resultados.push('<tr><td>NEOXA</td><td>' + recompensaNeoxa(gpuHashrate, algoritmos[1]).toFixed(6) + '</td></tr>');

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
  return recompensaXna(gpuHashrate, algoritmos[2]) * algoritmos[2].precio - costoEnergia(gpuConsumo, costoKWh);
}

function gananciaRvn(gpuHashrate, gpuConsumo, costoKWh) {
  return recompensaRvn(gpuHashrate, algoritmos[0]) * algoritmos[0].precio - costoEnergia(gpuConsumo, costoKWh);
}

function gananciaNeoxa(gpuHashrate, gpuConsumo, costoKWh) {
  return recompensaNeoxa(gpuHashrate, algoritmos[1]) * algoritmos[1].precio - costoEnergia(gpuConsumo, costoKWh);
}

function Algoritmo(nombre, precio, hashred, dificultad, recompensaBlock, nblocksxh) {
  this.nombre = nombre;
  this.dificultad = dificultad;
  this.recompensaBlock = recompensaBlock;
  this.hashred = hashred;
  this.nblocksxh = nblocksxh;
  this.precio = precio
}


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

  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  saveMode(currentMode);
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

//theme mode

// Verifica el modo actual al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  const savedMode = localStorage.getItem('mode');
  if (savedMode) {
    toggleMode(savedMode);
  }
});

// Guarda el modo actual en localStorage
function saveMode(mode) {
  localStorage.setItem('mode', mode);
}


// evento de clic a los botones de cambio de modo
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

if (lightModeBtn && darkModeBtn) {
  lightModeBtn.addEventListener('click', function () {
    toggleMode('light');
  });

  darkModeBtn.addEventListener('click', function () {
    toggleMode('dark');
  });
}

function toggleMode(mode) {
  const body = document.body;
  const container = document.querySelector('.container');
  const miningForm = document.querySelector('.mining-form');
  const miningResults = document.querySelector('.mining-results');
  const miningTable = document.querySelector('.mining-table');

  if (mode === 'light') {
    body.classList.remove('dark-mode');
    container.classList.remove('dark-mode');
    miningForm.classList.remove('dark-mode');
    miningResults.classList.remove('dark-mode');
    miningTable?.classList?.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
    container.classList.add('dark-mode');
    miningForm.classList.add('dark-mode');
    miningResults.classList.add('dark-mode');
    miningTable?.classList?.add('dark-mode');
  }

  saveMode(mode);
}

let calculoRealizado = false;

let algoritmos;

//fetch 

fetch('https://api.minerstat.com/v2/coins?algo=KAWPOW')
  .then(response => response.json())
  .then(data => {
    // Array crypto data
    const cryptosData = [];

    //  Ravencoin
    const ravencoinData = data.find(coin => coin.name === 'Ravencoin');
    if (ravencoinData) {
      cryptosData.push({
        nombre: ravencoinData.name,
        precio: ravencoinData.price,
        hashrateRed: ravencoinData.network_hashrate,
        dificultad: ravencoinData.difficulty,
        recompensaBloque: ravencoinData.reward_block
      });
    }

    //  NEOX
    const neoxData = data.find(coin => coin.name === 'NEOX');
    if (neoxData) {
      cryptosData.push({
        nombre: neoxData.name,
        precio: neoxData.price,
        hashrateRed: neoxData.network_hashrate,
        dificultad: neoxData.difficulty,
        recompensaBloque: neoxData.reward_block
      });
    }

    // Neurai
    const neuraiData = data.find(coin => coin.name === 'Neurai');
    if (neuraiData) {
      cryptosData.push({
        nombre: neuraiData.name,
        precio: neuraiData.price,
        hashrateRed: neuraiData.network_hashrate,
        dificultad: neuraiData.difficulty,
        recompensaBloque: neuraiData.reward_block
      });
    }

    // Creo Algoritmo con cryptosData
    algoritmos = [
      new Algoritmo(
        cryptosData[0].nombre,
        cryptosData[0].precio,
        cryptosData[0].hashrateRed / 1e6,
        cryptosData[0].dificultad,
        cryptosData[0].recompensaBloque,
        1440, // nblocksxh

      ),
      new Algoritmo(
        cryptosData[1].nombre,
        cryptosData[1].precio,
        cryptosData[1].hashrateRed / 1e6,
        cryptosData[1].dificultad,
        cryptosData[1].recompensaBloque,
        1440, // nblocksxh

      ),
      new Algoritmo(
        cryptosData[2].nombre,
        cryptosData[2].precio,
        cryptosData[2].hashrateRed / 1e6,
        cryptosData[2].dificultad,
        cryptosData[2].recompensaBloque,
        1440, // nblocksxh

      ),
    ];


    document.getElementById('datosMineria').addEventListener('submit', function (event) {
      event.preventDefault();

      const gpuHashrate = Number(document.getElementById('gpuHashrate').value);
      const gpuConsumo = Number(document.getElementById('gpuConsumo').value);
      const costoKWh = Number(document.getElementById('costoKWh').value);

      // Costo de electricidad en local storage
      localStorage.setItem('costoKWh', costoKWh);

      const resultados = ejecutarCalculos(gpuHashrate, gpuConsumo, costoKWh);
      mostrarResultadosEnDOM(resultados);
      const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      toggleMode(currentMode);

      calculoRealizado = true;
      mostrarMensajeCalcular();

    });

  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error en la solicitud',
      text: 'Hubo un problema al obtener los datos. Por favor, intenta nuevamente más tarde.',
    });
  });