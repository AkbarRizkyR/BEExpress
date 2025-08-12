// src/dto/pemasukan/CreatePemasukanDto.js
class CreatePemasukanDto {
    constructor({ deskripsi, jumlah, tanggal, customer_id, tipe_id }) {
        if (!deskripsi) throw new Error("Deskripsi is required");
        if (jumlah == null) throw new Error("Jumlah is required");
        if (!tanggal) throw new Error("Tanggal is required");
        if (!customer_id) throw new Error("Customer ID is required");
        if (!tipe_id) throw new Error("Tipe ID is required");

        this.deskripsi = deskripsi;
        this.jumlah = jumlah;
        this.tanggal = tanggal;
        this.customer_id = customer_id;
        this.tipe_id = tipe_id;
    }
}

module.exports = CreatePemasukanDto;
