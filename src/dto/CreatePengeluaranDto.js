class CreatePengeluaranDto {
    constructor({ deskripsi, jumlah, tanggal, tipe_id }) {
        if (!deskripsi || !jumlah || !tanggal || !tipe_id) {
            throw new Error("Semua field wajib diisi");
        }
        this.deskripsi = deskripsi;
        this.jumlah = jumlah;
        this.tanggal = tanggal;
        this.tipe_id = tipe_id;
    }
}

module.exports = CreatePengeluaranDto;
