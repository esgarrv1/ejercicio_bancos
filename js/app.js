import { Cuenta } from "./cuenta.js";
import { Banco } from "./banco.js";


function mostrarCreacionCuenta(evt) {
    const dialogo = document.getElementById('crearCuenta');
    dialogo.showModal();
}

function agregarCuenta(evt) {
    
}

document.getElementById('nuevaCuenta').addEventListener('click', mostrarCreacionCuenta);
document.getElementById('crearCuenta').addEventListener('submit', agregarCuenta);






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
