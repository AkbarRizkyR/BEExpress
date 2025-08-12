// src/dto/pemasukan_detail/CreatePemasukanDetailDto.js
class CreatePemasukanDetailDto {
    constructor({
        pemasukan_id,
        item_id,
        kilo_pesanan,
        total_pengait,
        total_hutang,
        total_pesanan,
        total_bayar,
        tanggal
    }) {
        if (!pemasukan_id) throw new Error("Pemasukan ID is required");
        if (!item_id) throw new Error("Item ID is required");
        if (kilo_pesanan == null) throw new Error("Kilo pesanan is required");

        this.pemasukan_id = pemasukan_id;
        this.item_id = item_id;
        this.kilo_pesanan = kilo_pesanan;
        this.total_pengait = total_pengait ?? 0;
        this.total_hutang = total_hutang ?? 0;
        this.total_pesanan = total_pesanan ?? 0;
        this.total_bayar = total_bayar ?? 0;
        this.tanggal = tanggal ?? null;
    }
}

module.exports = CreatePemasukanDetailDto;
