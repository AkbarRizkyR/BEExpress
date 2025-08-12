// src/dto/tipe_pemasukan/UpdateTipePemasukanDto.js
class UpdateTipePemasukanDto {
    constructor({ nama }) {
        this.nama = nama ?? null;
    }
}

module.exports = UpdateTipePemasukanDto;
