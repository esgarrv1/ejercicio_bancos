import { Banco } from './banco.js';
import * as bancoStorage from './bancoStorage.js';

function mostrarCreacionCuenta(evt) {
  const dialogo = document.getElementById('crearCuenta');
  // Debemos borrar los datos que hubiese de una creación anterior
  document.getElementById('numeroCuenta').value = '';
  document.getElementById('titular').value = '';
  document.getElementById('saldoInicial').value = '';
  dialogo.showModal();
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.classList.add('popup-mostrar');
  // Cuando una función interna usa una variable local de la función
  // donde se encuentra, se crea un cierre (closure) y mantiene una copia de la
  // variable
  setTimeout(() => {
    mensaje.classList.remove('popup-mostrar');
  }, 1500);
}

function agregarCuenta(evt) {
  const numeroCuenta = document.getElementById('numeroCuenta').value;
  const titular = document.getElementById('titular').value;
  const saldo = Number(document.getElementById('saldoInicial').value);
  banco.agregarCuenta(numeroCuenta, titular, saldo);
  mostrarCuenta(banco.obtenerCuenta(numeroCuenta));
  mostrarMensaje('Cuenta creada');
  bancoStorage.guardar(banco);
  actualizarSaldos();
}

function mostrarCuenta(cuenta) {
  document.querySelector('.cuentas').insertAdjacentHTML(
    'beforeend',
    `
         <div class="cuenta" data-numero-cuenta="${cuenta.numeroCuenta}">
                <p class="cuenta-texto">${cuenta.numeroCuenta}</p>
                <p class="titular">${cuenta.titular}</p>
                <p class="cuenta-texto">Saldo disponible</p>
                <p class="saldo"><span>${cuenta.saldo}</span> €</p>
                <div class="cuenta-opciones">
                    <button class="boton boton-eliminar">Eliminar</button>
                    <button class="boton boton-ingresar">Ingresar</button>
                    <button class="boton boton-retirar">Retirar</button>
                </div>
                <button class="boton boton-informe">📈</button>
          </div>
        `,
  );
}

function mostrarCuentas(cuentas) {
  document.querySelector('.cuentas').textContent = '';
  for (const c of cuentas) {
    mostrarCuenta(c);
  }
}

function mostrarIngresarRetirar(cuenta, texto, tipoOperacion) {
  document.querySelector('#tipoOperacion').textContent = texto;
  document.querySelector('#datosCuenta').textContent =
    `${cuenta.numeroCuenta} ${cuenta.titular}`;
  const dialogo = document.querySelector('#realizarOperacion');
  dialogo.dataset.tipoOperacion = tipoOperacion;
  dialogo.dataset.numeroCuenta = cuenta.numeroCuenta;
  document.querySelector('#importe').value = '';
  dialogo.showModal();
}

function eliminarCuenta(cuenta) {
  banco.eliminarCuenta(cuenta.numeroCuenta);
  bancoStorage.guardar(banco);
  evt.target.closest('.cuenta').remove();
  actualizarSaldos();
}

function manejarCuenta(evt) {
  if (evt.target.classList.contains('boton-ingresar')) {
    const cuenta = banco.obtenerCuenta(
      evt.target.closest('.cuenta').dataset.numeroCuenta,
    );
    mostrarIngresarRetirar(cuenta, 'Ingresar', 'I');
  } else if (evt.target.classList.contains('boton-retirar')) {
    const cuenta = banco.obtenerCuenta(
      evt.target.closest('.cuenta').dataset.numeroCuenta,
    );
    mostrarIngresarRetirar(cuenta, 'Retirar', 'R');
  } else if (evt.target.classList.contains('boton-eliminar')) {
    const cuenta = banco.obtenerCuenta(
      evt.target.closest('.cuenta').dataset.numeroCuenta);
      eliminarCuenta(cuenta);
  } else if (evt.target.classList.contains('boton-informe')) {
     const cuenta = banco.obtenerCuenta(
      evt.target.closest('.cuenta').dataset.numeroCuenta);
      mostrarMovimientos(cuenta.obtenerMovimientos());
  }
}

function mostrarMovimientos(movimientos) {
  if(movimientos.length === 0) {
    mostrarMensaje('No hay movimientos');
    return;
  }
  const informe = document.getElementById('informe');
  const contenedor = document.querySelector('.informe-movimientos');
  contenedor.textContent = '';
  for (const m of movimientos) {
    //const clase = m.tipoMovimiento === 'I' ? 'movimientos-ingreso' : 'movimientos-retirada';
    //const tipoMovimiento = m.tipoMovimiento === 'I' ? 'Ingreso' : 'Retirada';

    // Desestructuración
    const [clase, tipoMovimiento] = 
      m.tipoMovimiento === 'I' ? ['movimientos-ingreso', 'Ingreso']
                               : ['movimientos-retirada', 'Retirada'];

    contenedor.insertAdjacentHTML('beforeend',
      `
        <div class="movimientos-importe ${clase}">${m.importe} €</div>
        <div class="movimientos-tipo">${tipoMovimiento}</div>
      `
    );
  }
  informe.showModal();
}

function actualizarSaldos(cuenta = null) {
  if (cuenta) {
    document.querySelector(
      `.cuenta[data-numero-cuenta="${cuenta.numeroCuenta}"] .saldo`,
    ).textContent = cuenta.saldo + ' €';
  }
  document.getElementById('saldo').textContent = banco.obtenerSaldoTotal();
}

function realizarOperacion() {
  const importe = Number(document.querySelector('#importe').value);
  const dialogo = document.getElementById('realizarOperacion');
  const numeroCuenta = dialogo.dataset.numeroCuenta;
  const cuenta = banco.obtenerCuenta(numeroCuenta);
  if (dialogo.dataset.tipoOperacion === 'I') {
    cuenta.ingresar(importe);
    mostrarMensaje('Ingreso realizado');
  } else {
    const resultado = cuenta.retirar(importe);
    mostrarMensaje(
      resultado ? 'Retirada realizada' : 'No hay suficiente saldo',
    );
  }
  bancoStorage.guardar(banco);
  actualizarSaldos(cuenta);
}

function ordenarPorNombre(evt) {
  const cuentas = banco.obtenerCuentas((c1, c2) =>
    c1.titular.localeCompare(c2.titular)
  );
  mostrarCuentas(cuentas);
}

function ordenarPorSaldo(evt) {
    const cuentas = banco.obtenerCuentas((c1, c2) =>
    c1.saldo - c2.saldo
  );
  mostrarCuentas(cuentas);
}

const banco = new Banco();
mostrarCuentas(banco.obtenerCuentas());
actualizarSaldos();

document
  .getElementById('nuevaCuenta')
  .addEventListener('click', mostrarCreacionCuenta);
document
  .getElementById('crearCuenta')
  .addEventListener('submit', agregarCuenta);
document
  .querySelectorAll('.dialogo-cerrar')
  .forEach((d) =>
    d.addEventListener('click', (evt) =>
      evt.currentTarget.closest('dialog').close(),
    ),
  );
document.querySelector('.cuentas').addEventListener('click', manejarCuenta);
document
  .getElementById('realizarOperacion')
  .addEventListener('submit', realizarOperacion);
document
  .getElementById('ordenarPorNombre')
  .addEventListener('click', ordenarPorNombre);
document
  .getElementById('ordenarPorSaldo')
  .addEventListener('click', ordenarPorSaldo);

/*
const banco = new Banco();
banco.agregarCuenta('a1', 'pedro', 1000);
banco.agregarCuenta('a2', 'marta', 500);
banco.agregarCuenta('a3', 'eva', 1200);
banco.agregarCuenta('a4', 'sergio', 300);
banco.obtenerCuenta('a3').ingresar(10);
console.log('--------');
banco.obtenerCuentas().forEach(c => console.log(c.numeroCuenta, c.titular, c.saldo));
console.log('--------');
banco.obtenerCuentas(
    (c1, c2) => c1.titular.localeCompare(c2.titular)
).forEach(c => console.log(c.numeroCuenta, c.titular, c.saldo));
console.log('--------');
banco.obtenerCuentas(
    (c1, c2) => c1.saldo - c2.saldo
).forEach(c => console.log(c.numeroCuenta, c.titular, c.saldo));

*/
