class HargaHarianItem {
    constructor(data) {
        this.id = data.id;
        this.item_id = data.item_id;
        this.harga = data.harga;
        this.tanggal = data.tanggal;
        this.created_at = data.created_at;
    }
}

module.exports = HargaHarianItem;
