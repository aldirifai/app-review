# App Review Scraper

## Deskripsi

Project ini bertujuan untuk mengambil ulasan aplikasi dari **App Store** dan **Google Play Store**. Ulasan yang diambil akan disimpan dalam format **JSON** dan **Excel** untuk analisis lebih lanjut.

### Fitur Utama

-   Mengambil ulasan aplikasi dari:
    -   **Apple App Store** menggunakan `app-store-scraper`
    -   **Google Play Store** menggunakan `google-play-scraper`
-   Menyimpan data dalam:
    -   **JSON** (untuk penyimpanan mentah)
    -   **Excel** (untuk analisis tabel)
-   Menyertakan informasi seperti skor ulasan, versi aplikasi, dan kriteria tambahan dari Google Play Store.

---

## Persyaratan

-   **Node.js** (disarankan versi terbaru)
-   **NPM** (terinstal bersama Node.js)

---

## Instalasi

1. Clone repositori ini:

    ```bash
    git clone https://github.com/aldirifai/app-review
    cd app-review
    ```

2. Instal dependensi yang diperlukan:
    ```bash
    npm install
    ```

---

## Pengaturan Aplikasi

Sebelum menjalankan proyek, pastikan untuk menyesuaikan ID aplikasi yang ingin diambil ulasannya di file `index.js`:

```javascript
const appIdApple = "net.whatsapp.WhatsApp"; // Ganti dengan ID aplikasi yang diinginkan
const appIdGoogle = "com.whatsapp"; // Ganti dengan ID aplikasi yang diinginkan
```

## Penggunaan

1. Pastikan dependensi sudah terinstal.
2. Jalankan Project menggunakan perintah berikut:
    ```bash
    npm start
    ```
3. Project akan:
    - Mengambil ulasan dari App Store dan Google Play Store.
    - Menyimpan data ulasan dalam folder `result` dengan format JSON dan Excel.

---

## Struktur File

-   **index.js**: Skrip utama untuk mengambil ulasan dan menyimpannya dalam format JSON dan Excel.
-   **package.json**: Konfigurasi Project dan daftar dependensi.
-   **result**: Folder untuk menyimpan hasil ulasan yang diambil.

---

## Dependensi

-   [`app-store-scraper`](https://www.npmjs.com/package/app-store-scraper): Untuk mengambil ulasan dari App Store.
-   [`google-play-scraper`](https://www.npmjs.com/package/google-play-scraper): Untuk mengambil ulasan dari Google Play Store.
-   [`xlsx`](https://www.npmjs.com/package/xlsx): Untuk menyimpan data dalam format Excel.

---

## Output

1. **JSON**:

    - Nama file: `apple-reviews-<timestamp>.json` dan `google-reviews-<timestamp>.json`
    - Struktur data Google Play Store menyertakan properti `criterias` dalam bentuk array objek.

2. **Excel**:
    - Nama file: `apple-reviews-<timestamp>.xlsx` dan `google-reviews-<timestamp>.xlsx`
    - Data `criterias` dari Google Play Store akan dipecah menjadi kolom terpisah, seperti `criteria_1_name` dan `criteria_1_rating`.

---

## Lisensi

Project ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).

---
