import { Movimiento } from "./movimiento.js";

/**
 * Gestiona una cuenta bancaria
 */
export class Cuenta {
    /** type {string} */
    #numeroCuenta;
    /** type {string} */
    #titular;
    /** type {number} */
    #saldo;
    /** type {Movimiento} */
    #movimientos

    /**
     * @constructor 
     * @param {string} numeroCuenta 
     * @param {string} titular 
     * @param {number} saldo 
     * @param {[movimientos[] = []]} movimientos de la cuenta
     */
    constructor(numeroCuenta, titular, saldo, movimientos = []) {
        this.#numeroCuenta = numeroCuenta;
        this.#titular = titular;
        this.#saldo = saldo;
        this.#movimientos = movimientos;
    }

    /**
     * Devuelve el saldo actual
     * @returns {number} El saldo actual
     */
    get saldo() {
        return this.#saldo;
    }

    /**
     * Devuelve el titular de la cuenta
     * @returns {string} El titular
     */
    get titular() {
        return this.#titular;
    }

    /**
     * Devuelve el número de la cuenta
     * @returns {string} El número de la cuenta
     */
    get numeroCuenta() {
        return this.#numeroCuenta;
    }

    /**
     * Devuelve una copia superficial de la colección de movimientos
     * 
     * @returns {Movimiento[]}
     */
    obtenerMovimientos() {
        return [...this.#movimientos];
    }

    /**
     * Guarda el movimiento realizado
     * 
     * @param {number} importe 
     * @param {string} tipoMovimiento - I (ingreso) o R (retirada)
     */
    #agregarMovimiento(importe, tipoMovimiento) {
        this.#movimientos.push(new Movimiento(importe, tipoMovimiento));
    }

    /**
     * Ingresa un importe en la cuenta
     * 
     * @param {number} importe 
     * @returns {boolean} true si el ingreso fue correcto, false si no
     */
    ingresar(importe) {
        this.#saldo += importe;
        this.#agregarMovimiento(importe, 'I');
        return true;
    }

    /**
     * Retira dinero de la cuenta
     * 
     * @param {number} importe 
     * @returns {boolean} true si se pudo retirar, false si no tenía saldo suficiente
     */
    retirar(importe) {
        if(this.#saldo - importe < 0) {
            return false;
        }
        this.#saldo -= importe;// this.#saldo = this.#saldo - importe;
        this.#agregarMovimiento(importe, 'R');
        return true;
    }

    toJSON() {
        return {
            numeroCuenta: this.#numeroCuenta, 
            titular: this.#titular, 
            saldo: this.#saldo,
            movimientos: this.#movimientos
        };
    }

    static fromJSON(objeto) {
        return new Cuenta(objeto.numeroCuenta, objeto.titular, Number(objeto.saldo), objeto.movimientos);
    }
}