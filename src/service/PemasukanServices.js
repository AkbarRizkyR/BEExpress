// services/PemasukanService.js
const PemasukanRepository = require('../repository/PemasukanRepository');

class PemasukanService {
    async getAllPemasukan() {
        return await PemasukanRepository.findAll();
    }

    async getPemasukanById(id) {
        return await PemasukanRepository.findById(id);
    }

    async createPemasukan(data) {
        return await PemasukanRepository.create(data);
    }

    async updatePemasukan(id, data) {
        return await PemasukanRepository.update(id, data);
    }

    async deletePemasukan(id) {
        return await PemasukanRepository.delete(id);
    }
}

module.exports = new PemasukanService();
