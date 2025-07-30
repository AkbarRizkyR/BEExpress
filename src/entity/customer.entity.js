// Untuk mapping kolom dan definisi struktur data (optional seperti Java Entity)
class Customer {
    constructor({ id, name, total_hutang, total_pesanan, total_bayar, kilo_pesanan, created_at, updated_at }) {
        this.id = id;
        this.name = name;
        this.total_hutang = total_hutang;
        this.total_pesanan = total_pesanan;
        this.total_bayar = total_bayar;
        this.kilo_pesanan = kilo_pesanan;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Customer;
