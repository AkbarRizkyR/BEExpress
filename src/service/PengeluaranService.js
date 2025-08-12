const PengeluaranRepository = require('../repository/PengeluaranRepository');
const PengeluaranEntity = require("../entity/PengeluaranEntity");
const cron = require("node-cron");

class PengeluaranService {
    async getAllWithTotal(tanggal) {
    const pengeluaran = await PengeluaranRepository.findAll();
    const totalHarian = await PengeluaranRepository.getTotalHarian();
    return {
        tanggal,
        total_harian: totalHarian,
        data: pengeluaran
    };
}

async getDetailWithTotalPerTipe(tipe_id) {
    const pengeluaran = await PengeluaranRepository.findById(tipe_id);
    const totalPerTipe = await PengeluaranRepository.getTotalPerTipe(tipe_id);
    return {
        tipe_id,
        total_per_tipe: totalPerTipe,
        data: pengeluaran
    };
}


    async create(data) {
        const entity = new PengeluaranEntity(data);
        return await PengeluaranRepository.create(entity);
    }

    async update(id, data) {
        const entity = new PengeluaranEntity({ id, ...data });
        return await PengeluaranRepository.update(id, entity);
    }

    async delete(id) {
        return await PengeluaranRepository.delete(id);
    }

    /**
     * Insert pengeluaran default untuk hari ini
     */
    async insertPengeluaranHariIni(tanggal = new Date()) {
        const pengeluaranHarian = [
            { deskripsi: "Gaji Karyawan", jumlah: 1000000, tipe_id: 5 },
            { deskripsi: "Listrik", jumlah: 500000, tipe_id: 6 },
            { deskripsi: "Internet", jumlah: 350000, tipe_id: 7 },
            { deskripsi: "Plastik", jumlah: 120000, tipe_id: 8 },
            { deskripsi: "Bensin", jumlah: 100000, tipe_id: 9 }
        ];

        const inserted = [];
        for (const item of pengeluaranHarian) {
            const entity = new PengeluaranEntity({
                ...item,
                tanggal: tanggal,
                created_at: new Date()
            });
            const created = await PengeluaranRepository.create(entity); // <--- pakai create biasa
            inserted.push(created);
        }

        return {
            message: "Pengeluaran harian berhasil dibuat",
            data: inserted
        };
    }


    /**
     * Menjalankan job scheduler setiap 00:01 WIB
     */
    startDailyScheduler() {
        cron.schedule("1 0 * * *", async () => {
            console.log(`[${new Date().toISOString()}] Menjalankan scheduler pengeluaran harian...`);
            try {
                const result = await this.insertPengeluaranHariIni();
                console.log("Scheduler selesai:", result);
            } catch (err) {
                console.error("Gagal menjalankan scheduler:", err.message);
            }
        }, {
            timezone: "Asia/Jakarta"
        });
    }
}

module.exports = new PengeluaranService();
