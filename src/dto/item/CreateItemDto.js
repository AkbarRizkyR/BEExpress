// src/dto/item/CreateItemDto.js
class CreateItemDto {
    constructor({ name, harga_pengali }) {
        if (!name) throw new Error("Name is required");
        if (harga_pengali == null) throw new Error("Harga pengait is required");
        this.name = name;
        this.harga_pengali = harga_pengali;
    }
}

module.exports = CreateItemDto;
