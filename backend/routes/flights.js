const Flight = require("../models/flight.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Schiphol API'si için URL ve kimlik bilgileri
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const appKey = "9ff348a861f7d94eb07299d84bdba85e"; // API gizli anahtar
const appId = "7c5d30bc"; // API kimlik

// Uçuş verilerini almak için GET endpoint'i
router.get("/", async (req, res) => {
  try {
    // İstekle gelen uçuş yönü ve tarihi bilgileri
    const { direction, flightdate } = req.query;
    
    // Schiphol API'ye uçuş verileri için istek gönder
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId, // API kimliği
        app_key: appKey, // API gizli anahtarı
        resourceversion: "v4", // API sürüm bilgisi
        Accept: "application/json", // JSON formatını kabul et
      },
      params: {
        scheduleDate: flightdate, // Uçuş tarihi
        flightDirection: direction, // Uçuş yönü (varış veya kalkış)
      },
    });

    // API'den gelen verileri başarılı şekilde yanıt olarak döndür
    res.json(response.data);
  } catch (error) {
    console.error("Uçuş verisi alınırken hata:", error);
    // Hata durumunda, 500 HTTP kodu ile genel hata mesajı döndür
    res.status(500).send("Uçuş verisi alınırken bir hata oluştu.");
  }
});

// Yeni uçuş eklemek için POST endpoint'i
router.post("/add-flight", async (req, res) => {
  try {
    // Gönderilen uçuş bilgilerini al
    const newFlight = new Flight(req.body);

    // Yeni uçuşu MongoDB veritabanına kaydet
    await newFlight.save();

    // Başarılı işlem sonrası 200 HTTP kodu ile mesaj döndür
    res.status(200).json("Uçuş başarıyla eklendi!");
  } catch (error) {
    console.error("Uçuş eklenirken hata oluştu:", error);
    // Hata durumunda detaylı mesaj ile 500 HTTP kodu döndür
    res.status(500).json({
      message: "Uçuş eklenirken hata oluştu",
      error: error.message,
    });
  }
});

// Veritabanındaki uçuşları almak için GET endpoint'i
router.get("/get-flight", async (req, res) => {
  try {
    // MongoDB'den tüm uçuş verilerini al
    const flights = await Flight.find();
    
    // Başarılı şekilde verileri döndür
    res.status(200).json(flights);
  } catch (error) {
    console.error("MongoDB'den uçuş verileri alınırken hata:", error);
    // Hata durumunda, 500 HTTP kodu ile hata mesajı döndür
    res.status(500).json({
      message: "MongoDB'den uçuş verisi alınırken bir hata oluştu",
      error: error.message,
    });
  }
});

// Uçuşu silmek için DELETE endpoint'i
router.delete("/delete-flight", async (req, res) => {
  try {
    const { id } = req.body; // İstek gövdesindeki uçuş ID'sini al

    // Veritabanında uçuşu bulmak için `id` değerini kullan
    const flight = await Flight.findOne({ id: id });

    // Uçuş bulunamazsa 404 HTTP kodu ile hata mesajı döndür
    if (!flight) {
      return res.status(404).json({ message: "Uçuş bulunamadı." });
    }

    // Uçuşu veritabanından sil
    await Flight.findByIdAndDelete(flight._id);

    // Başarılı silme işlemi sonrası 200 HTTP kodu ile mesaj döndür
    res.status(200).json({ message: "Uçuş başarıyla silindi." });
  } catch (error) {
    console.error("Uçuş silinirken hata oluştu:", error.message);
    // Hata durumunda, 500 HTTP kodu ile hata mesajı döndür
    res.status(500).json({
      message: "Uçuş silinirken bir hata oluştu",
      error: error.message,
    });
  }
});

// Router'ı dışa aktararak diğer dosyalarda kullanılmasını sağla
module.exports = router;
