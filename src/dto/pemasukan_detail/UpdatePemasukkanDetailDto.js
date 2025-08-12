// src/dto/pemasukan_detail/UpdatePemasukanDetailDto.js
class UpdatePemasukanDetailDto {
    constructor({
        kilo_pesanan,
        total_pengait,
        total_hutang,
        total_pesanan,
        total_bayar,
        tanggal
    }) {
        this.kilo_pesanan = kilo_pesanan ?? null;
        this.total_pengait = total_pengait ?? null;
        this.total_hutang = total_hutang ?? null;
        this.total_pesanan = total_pesanan ?? null;
        this.total_bayar = total_bayar ?? null;
        this.tanggal = tanggal ?? null;
    }
}

module.exports = UpdatePemasukanDetailDto;
