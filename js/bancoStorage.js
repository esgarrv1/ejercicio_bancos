import { Cuenta } from "./cuenta.js";

/**
 * Guarda en el localStorage todo el banco con sus cuentas
 * 
 * @param {Banco} banco 
 */
export function guardar(banco) {
    const json = JSON.stringify(banco.obtenerCuentas());
    localStorage.setItem('cuentas', json);
}

/**
 * Carga las cuentas del localStorage
 * 
 * @returns {Cuenta []}
 */
export function cargar() {
    const json = localStorage.getItem('cuentas');
    if(json === null) {
        return [];
    }
    const cuentas = [];
    for (const o of JSON.parse(json)) {
        cuentas.push(Cuenta.fromJSON(o));
    }
    return cuentas;
}