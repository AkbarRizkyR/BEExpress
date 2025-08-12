// services/ItemService.js
const ItemRepository = require('../repository/ItemRepository');

class ItemService {
    async getAllItems() {
        return await ItemRepository.findAll();
    }

    async getItemById(id) {
        return await ItemRepository.findById(id);
    }

    async createItem(data) {
        return await ItemRepository.create(data);
    }

    async updateItem(id, data) {
        return await ItemRepository.update(id, data);
    }

    async deleteItem(id) {
        return await ItemRepository.delete(id);
    }
}

module.exports = new ItemService();
