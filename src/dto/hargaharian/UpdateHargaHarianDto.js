// src/dto/harga_harian_item/UpdateHargaHarianItemDto.js
class UpdateHargaHarianItemDto {
    constructor({ harga, tanggal }) {
        this.harga = harga ?? null;
        this.tanggal = tanggal ?? null;
    }
}

module.exports = UpdateHargaHarianItemDto;
