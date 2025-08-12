// src/dto/sisa_stock/UpdateSisaStockDto.js
class UpdateSisaStockDto {
    constructor({ jumlah_stock }) {
        this.jumlah_stock = jumlah_stock ?? null;
    }
}

module.exports = UpdateSisaStockDto;
