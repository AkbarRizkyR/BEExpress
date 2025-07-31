const HargaHarianItemRepository = require('../repository/HargaHarianItemRepository');
const HargaHarianItem = require('../entity/HargaHarianItem');

const HargaHarianItemService = {
    async createOrUpdate(dto) {
        const data = await HargaHarianItemRepository.upsert(dto);
        return new HargaHarianItem(data);
    },

    async getToday(item_id) {
        const today = new Date().toISOString().split('T')[0];
        const data = await HargaHarianItemRepository.findByItemAndDate(item_id, today);
        return data ? new HargaHarianItem(data) : null;
    },

    async getAll() {
        const list = await HargaHarianItemRepository.getAll();
        return list.map(item => new HargaHarianItem(item));
    }
};

module.exports = HargaHarianItemService;
