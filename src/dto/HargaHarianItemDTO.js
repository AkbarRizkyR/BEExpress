class HargaHarianItemDTO {
    constructor({ item_id, harga, tanggal }) {
        this.item_id = item_id;
        this.harga = harga;
        this.tanggal = tanggal || new Date().toISOString().split('T')[0]; // default today
    }
}

module.exports = HargaHarianItemDTO;
