
# Flight Reservation Uygulaması

## 🚀 Teknolojiler

Bu proje, uçuş bilgilerini listelemek ve filtrelemek için **MERN stack** (MongoDB, Express.js, React.js, Node.js) kullanılarak geliştirilmiştir.  
Arayüz tasarımı için **Tailwind CSS**, **Ant Design**, **Material UI** ve **FontAwesome** kullanılmıştır. Tarih ve saat işlemleri için **Day.js** tercih edilmiştir. Uçuş verileri, Schiphol Havalimanı API'sinden alınmıştır.

## 🚀 Proje Açıklaması

Bu uygulama, Schiphol Havalimanı'ndaki uçuşları listeleyip filtrelemenizi sağlar. Filtreleme işlemi uçuş tarihine ve yönüne göre yapılabilir. Ayrıca uçuşlar, havalimanı IATA kodları ile birlikte gösterilir ve kullanıcıya havaalanı isimleri dönüştürülerek sunulur. Her uçuş kartında şu bilgiler yer alır:

- Kalkış ve varış saati
- Uçuş süresi
- Havayolu şirketi ve havaalanı IATA kodu
- Uçuşa ait detaylar

Kullanıcılar, "Book Flight" butonuyla uçuşu kaydedebilir ve kendi uçuşlarım sayfasında uçuşlarını görüntüleyebilir. Kullanıcı dilerse uçuşunu silip, veri tabanından kaldırabilir.

## 🚀 Projeyi Kurma ve Çalıştırma

1. **Projeyi İndirin**  
   Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/kullanici-adiniz/muharremonel-Flight-Reservation.git
   cd muharremonel-Flight-Reservation
   ```

2. **Client ve Server Kurulumu**  
   Önce `frontend` dizinine gidin ve bağımlılıkları yükleyin:
   ```bash
   cd frontend
   npm install
   ```
   Sonra `backend` dizinine gidip bağımlılıkları yükleyin:
   ```bash
   cd ../backend
   npm install
   ```

3. **Uygulamayı Başlatma**  
   Frontend tarafını çalıştırın:
   ```bash
   cd frontend
   npm start
   ```
   Bu komut, React uygulamanızı [http://localhost:3000](http://localhost:3000) adresinde çalıştırır.

   Backend tarafını çalıştırın:
   ```bash
   cd ../backend
   node --watch back.js
   ```
   Bu komut, backend'i [http://localhost:5001](http://localhost:5001) adresinde çalıştırır.

## Uygulama Özellikleri

- **Filtreleme**: Uçuşlar tarih ve yön bilgisine göre filtrelenebilir.
- **IATA Kodları**: Havalimanı isimleri IATA kodlarına dönüştürülerek gösterilir.
- **Uçuş Kaydetme**: Seçilen uçuşlar "Book Flight" butonuyla kaydedilir.
- **Uçuşları Silme**: Kullanıcı, kaydettiği uçuşları istediği zaman silebilir.
