const CustomerRepository = require('../repository/customer.repository');
const Customer = require('../entity/customer.entity');

const CustomerService = {
    async getAll() {
        const customers = await CustomerRepository.findAll();
        return customers.map(c => new Customer(c));
    },

    async getById(id) {
        const customer = await CustomerRepository.findById(id);
        if (!customer) throw new Error('Customer not found');
        return new Customer(customer);
    },

    async create(dto) {
        const created = await CustomerRepository.create(dto);
        return new Customer(created);
    },

    async update(id, dto) {
        const updated = await CustomerRepository.update(id, dto);
        if (!updated) throw new Error('Customer not found');
        return new Customer(updated);
    },

    async delete(id) {
        const deleted = await CustomerRepository.delete(id);
        if (!deleted) throw new Error('Customer not found');
        return new Customer(deleted);
    }
};

module.exports = CustomerService;
