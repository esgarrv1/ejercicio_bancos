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

    /**
     * @constructor 
     * @param {string} numeroCuenta 
     * @param {string} titular 
     * @param {number} saldo 
     */
    constructor(numeroCuenta, titular, saldo) {
        this.#numeroCuenta = numeroCuenta;
        this.#titular = titular;
        this.#saldo = saldo;
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
     * Ingresa un importe en la cuenta
     * 
     * @param {number} importe 
     * @returns {boolean} true si el ingreso fue correcto, false si no
     */
    ingresar(importe) {
        this.#saldo += importe;
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
        return true;
    }
}