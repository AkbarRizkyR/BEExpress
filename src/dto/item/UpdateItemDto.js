// src/dto/item/UpdateItemDto.js
class UpdateItemDto {
    constructor({ name, harga_pengali }) {
        this.name = name ?? null;
        this.harga_pengali = harga_pengali ?? null;
    }
}

module.exports = UpdateItemDto;
