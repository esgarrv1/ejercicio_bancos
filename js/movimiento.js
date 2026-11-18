/**
 * Guarda un movimiento realizado
 */
export class Movimiento {
    #importe
    #tipoMovimiento

    /**
     * @constructor
     * @param {number} importe 
     * @param {string} tipoMovimiento - I (ingreso) o R (retirada)
     */
    constructor(importe, tipoMovimiento) {
        this.#importe = importe;
        this.#tipoMovimiento = tipoMovimiento;
    }

    /**
     * Devuelve el importe del movimiento
     * returns {number} el importe
     */
    get importe() {
        return this.#importe;
    }

    /**
     * Devuelve el tipo de movimiento
     * returns {string} I (ingreso) o R (retirada)
     */
    get tipoMovimiento() {
        return this.#tipoMovimiento;
    }

    /**
     * Devuelve un objeto a convertir a JSON
     * 
     * @returns {{importe: number, tipoMovimiento: string}}
     */
     toJSON() {
        return {
            importe: this.#importe, 
            tipoMovimiento: this.#tipoMovimiento 
        };
    }

    /**
     * Crea un objeto Movimiento
     * 
     * @param {{importe: number, tipoMovimiento: string}} objeto 
     * @returns {Movimiento}
     */
    static fromJSON(objeto) {
        return new Movimiento(Number(objeto.importe), objeto.tipoMovimiento);
    }
}