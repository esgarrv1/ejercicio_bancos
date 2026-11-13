import { Cuenta } from "./cuenta.js"

/** Guestiona las cuentas de un banco */
export class Banco {
    /** type {[Cuenta]} */
    #cuentas = [];

    /**
     * Aañade una nueva cuenta
     *      
     * @param {string} numeroCuenta 
     * @param {string} titular 
     * @param {number} saldo 
     */
    agregarCuenta(numeroCuenta, titular, saldo) {
        this.#cuentas.push(new Cuenta(numeroCuenta, titular, saldo));
    }


    /**
     * Elimina una cuenta
     * 
     * @param {string} numeroCuenta 
     */
    eliminarCuenta(numeroCuenta) {
        this.#cuentas = this.#cuentas.filter(c => c.numeroCuenta !== numeroCuenta);
    }

    /**
     * Devuelve una copia superficial de la colección de cuentas ordenadas
     * según la función pasada como parámetro
     * 
     * @param {((Cuenta, Cuenta) => number) | null } funcionOrdenar - la función para 
     * ordenar las cuentas o nada si no se quieren ordenar
     * @returns {[Cuenta]} Las cuentas ordenadas
     */
    obtenerCuentas(funcionOrdenar = null) {
        if(funcionOrdenar === null) {
            return [...this.#cuentas];
        }
        return this.#cuentas.toSorted(funcionOrdenar);
    }

    /**
     * Busca una cuenta
     * 
     * @param {string} numeroCuenta 
     * @returns {Cuenta} - la cuenta buscada
     */
    obtenerCuenta(numeroCuenta) {
        return this.#cuentas.find(c => c.numeroCuenta === numeroCuenta);
    }
}