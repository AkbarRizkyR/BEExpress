// src/dto/tipe_pemasukan/CreateTipePemasukanDto.js
class CreateTipePemasukanDto {
    constructor({ nama }) {
        if (!nama) throw new Error("Nama is required");
        this.nama = nama;
    }
}

module.exports = CreateTipePemasukanDto;
