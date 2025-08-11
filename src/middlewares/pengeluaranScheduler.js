const cron = require("node-cron");
const PengeluaranService = require("../service/PengeluaranService");

function startDailyScheduler() {
    // Jalan tiap hari jam 00:01 WIB
    cron.schedule("1 0 * * *", async () => {
        try {
            console.log("⏳ Menjalankan job createDaily pengeluaran...");
            const result = await PengeluaranService.insertPengeluaranHariIni();
            console.log("✅ Job selesai:", result);
        } catch (err) {
            console.error("❌ Job createDaily gagal:", err.message);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });
}

module.exports = { startDailyScheduler };
