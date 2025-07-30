class CreateCustomerDTO {
    constructor({ name, total_hutang = 0, total_pesanan = 0, total_bayar = 0, kilo_pesanan = 0 }) {
        this.name = name;
        this.total_hutang = total_hutang;
        this.total_pesanan = total_pesanan;
        this.total_bayar = total_bayar;
        this.kilo_pesanan = kilo_pesanan;
    }
}

class UpdateCustomerDTO extends CreateCustomerDTO { }

module.exports = { CreateCustomerDTO, UpdateCustomerDTO };
