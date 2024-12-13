import { fileURLToPath } from "url";
import { dirname } from "path";
import store from "app-store-scraper";
import gplay from "google-play-scraper";
import fs from "fs";
import path from "path";
import xlsx from "xlsx";

const appIdApple = "net.whatsapp.WhatsApp"; // Ganti dengan ID aplikasi yang diinginkan
const appIdGoogle = "com.whatsapp"; // Ganti dengan ID aplikasi yang diinginkan

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let reviewApple = [];
let reviewGoogle = [];

async function fetchReviewsApple() {
    let page = 1;
    for (let i = 0; i < 10; i++) {
        try {
            const data = await store.reviews({
                appId: appIdApple,
                sort: store.sort.RECENT,
                country: "id",
                page: page,
            });

            data.forEach((element) => {
                reviewApple.push({
                    id: element.id,
                    userName: element.userName,
                    userUrl: element.userUrl,
                    version: element.version,
                    score: element.score,
                    title: element.title,
                    text: element.text,
                    url: element.url,
                    updated: element.updated,
                });
            });
            page++;
        } catch (error) {
            console.error(
                "Terjadi kesalahan saat mengambil ulasan Apple:",
                error
            );
        }
    }

    const jsonFolderPath = path.join(__dirname, "result");
    if (!fs.existsSync(jsonFolderPath)) {
        fs.mkdirSync(jsonFolderPath);
    }

    const jsonFilePath = path.join(
        jsonFolderPath,
        `apple-reviews-${Date.now()}.json`
    );
    fs.writeFileSync(
        jsonFilePath,
        JSON.stringify(reviewApple, null, 2),
        "utf-8"
    );
    console.log("Ulasan Apple berhasil disimpan dalam format JSON.");

    const worksheet = xlsx.utils.json_to_sheet(reviewApple);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Reviews");

    const excelFilePath = path.join(
        jsonFolderPath,
        `apple-reviews-${Date.now()}.xlsx`
    );
    xlsx.writeFile(workbook, excelFilePath);
    console.log("Ulasan Apple berhasil disimpan dalam format Excel.");
}

async function fetchReviewsGoogle() {
    try {
        const response = await gplay.reviews({
            appId: appIdGoogle,
            sort: gplay.sort.NEWEST,
            num: 999999999999999,
        });

        let dataResult = response.data;

        if (dataResult.length > 0) {
            dataResult.forEach((element) => {
                reviewGoogle.push({
                    id: element.id,
                    userName: element.userName,
                    userImage: element.userImage,
                    date: element.date,
                    score: element.score,
                    scoreText: element.scoreText,
                    url: element.url,
                    title: element.title,
                    text: element.text,
                    replyDate: element.replyDate,
                    replyText: element.replyText,
                    version: element.version,
                    thumbsUp: element.thumbsUp,
                    criterias: element.criterias, // Simpan apa adanya untuk JSON
                });
            });
        }

        const jsonFolderPath = path.join(__dirname, "result");
        if (!fs.existsSync(jsonFolderPath)) {
            fs.mkdirSync(jsonFolderPath);
        }

        const jsonFilePath = path.join(
            jsonFolderPath,
            `google-reviews-${Date.now()}.json`
        );
        fs.writeFileSync(
            jsonFilePath,
            JSON.stringify(reviewGoogle, null, 2),
            "utf-8"
        );
        console.log("Ulasan Google berhasil disimpan dalam format JSON.");

        const formattedGoogleReviews = reviewGoogle.map((review) => {
            const parsedCriterias = {};
            if (review.criterias) {
                review.criterias.forEach((c, index) => {
                    parsedCriterias[`criteria_${index + 1}_name`] = c.criteria;
                    parsedCriterias[`criteria_${index + 1}_rating`] = c.rating;
                });
            }
            return {
                ...review,
                ...parsedCriterias,
            };
        });

        const worksheet = xlsx.utils.json_to_sheet(formattedGoogleReviews);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Reviews");

        const excelFilePath = path.join(
            jsonFolderPath,
            `google-reviews-${Date.now()}.xlsx`
        );
        xlsx.writeFile(workbook, excelFilePath);
        console.log("Ulasan Google berhasil disimpan dalam format Excel.");
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil ulasan Google:", error);
    }
}

async function fetchAllReviews() {
    await Promise.all([fetchReviewsApple(), fetchReviewsGoogle()]);
    console.log("Ulasan Apple dan Google berhasil diambil dan disimpan.");
}

fetchAllReviews();
