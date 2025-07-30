const Item = require('../entity/item.entity');
const ItemRepository = require('../repository/item.repository');

const ItemService = {
    async getAll() {
        const data = await ItemRepository.findAll();
        return data.map(d => new Item(d));
    },

    async getById(id) {
        const data = await ItemRepository.findById(id);
        if (!data) throw new Error('Item not found');
        return new Item(data);
    },

    async create(dto) {
        const data = await ItemRepository.save(dto);
        return new Item(data);
    }
};

module.exports = ItemService;
