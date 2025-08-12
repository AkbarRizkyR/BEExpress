// src/dto/pemasukan/UpdatePemasukanDto.js
class UpdatePemasukanDto {
    constructor({ deskripsi, jumlah, tanggal, customer_id, tipe_id }) {
        this.deskripsi = deskripsi ?? null;
        this.jumlah = jumlah ?? null;
        this.tanggal = tanggal ?? null;
        this.customer_id = customer_id ?? null;
        this.tipe_id = tipe_id ?? null;
    }
}

module.exports = UpdatePemasukanDto;
