// src/dto/sisa_stock/CreateSisaStockDto.js
class CreateSisaStockDto {
    constructor({ item_id, jumlah_stock }) {
        if (!item_id) throw new Error("Item ID is required");
        if (jumlah_stock == null) throw new Error("Jumlah stock is required");

        this.item_id = item_id;
        this.jumlah_stock = jumlah_stock;
    }
}

module.exports = CreateSisaStockDto;
