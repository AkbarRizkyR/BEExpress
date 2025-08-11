class UpdatePengeluaranDto {
  constructor({ deskripsi, jumlah, tanggal, tipe_id }) {
    this.deskripsi = deskripsi;
    this.jumlah = jumlah;
    this.tanggal = tanggal;
    this.tipe_id = tipe_id;
  }
}

module.exports = UpdatePengeluaranDto;
