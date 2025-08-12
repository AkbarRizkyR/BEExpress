// src/dto/harga_harian_item/CreateHargaHarianItemDto.js
class CreateHargaHarianItemDto {
    constructor({ item_id, harga, tanggal }) {
        if (!item_id) throw new Error("Item ID is required");
        if (harga == null) throw new Error("Harga is required");
        if (!tanggal) throw new Error("Tanggal is required");

        this.item_id = item_id;
        this.harga = harga;
        this.tanggal = tanggal;
    }
}

module.exports = CreateHargaHarianItemDto;
