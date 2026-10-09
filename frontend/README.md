# SkillHub web · portfolyo demosu

Turkcell Code Night Trabzon birincisi SkillHub'ın React arayüzü iki veri kaynağıyla çalışır.
Varsayılan `demo` modu yalnızca frontend dağıtımıyla kullanılabilir; backend, PostgreSQL veya
Anthropic servisini çalıştırmak gerekmez. Full stack uygulamanın Java / Spring Boot backend'i
`../backend` klasöründe korunur.

## Vercel dağıtımı

- Repository: `mrfiratatalay/Turkcell-Skillhub`, production branch: `main`.
- Root Directory: `frontend`.
- Framework: Vite; build: `npm run build`; output: `dist`.
- `VITE_DATA_MODE=demo` ayarla veya bu değişkeni hiç ekleme: varsayılan demo modudur.
- `vercel.json` doğrudan ders, quiz ve profil bağlantılarının açılmasını ve sayfa yenilemeyi sağlar.

Giriş ekranındaki **Demoyu keşfet** düğmesi hazır örnek profili açar. Derslerin tamamı ve quizler
demoda erişime açıktır; orijinal ders ilişkileri önerilen öğrenme sırası olarak gösterilir.
Quiz sonuçları, XP, Gece Saati, rozetler, profil düzenleme ve öneriler tarayıcıda hesaplanır.
Şehirler ve sıralama örnek katılımcılardan oluşur; kendi ilerlemen sıralamalara yansır.
Rehber demo ilerlemesine göre kural tabanlı öneriler verir, Claude çağrısı yapmaz.

Kayıt formu bu tarayıcıya özel bir demo profili oluşturur. Gerçek kişisel bilgi veya başka
hesaplarda kullanılan bir şifre girilmemelidir. Veriler `localStorage` içinde tutulur;
depolama kapalıysa mevcut sekmenin belleğinde kalır. Çıkış yapmak ilerlemeyi silmez.
Profil sayfasındaki **Demoyu sıfırla** düğmesi bu tarayıcıdaki demo profillerini ve ilerlemeyi
başlangıç durumuna döndürür. Video izleme seçildiğinde YouTube açılır; uygulama verisi için
backend isteği atılmaz.

## Daha sonra gerçek API'ye geçiş

Backend ve PostgreSQL'i yayınladıktan sonra Vercel ortam değişkenlerini değiştirip yeniden dağıt:

```dotenv
VITE_DATA_MODE=api
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Backend ortamında `CORS_ALLOWED_ORIGINS` değerini frontend'in tam origin'i olarak ayarla
(örneğin `https://skillhub.example.com`). Birden fazla origin virgülle ayrılır. Origin sonuna
slash veya route ekleme. Backend için `DB_URL`, `DB_USER`, `DB_PASSWORD` ve `JWT_SECRET`
değerlerini de gerçek dağıtımına göre ayarla. Claude rehberi için backend ortamında
`ANTHROPIC_API_KEY` kullanılabilir; hiçbir backend sırrını `VITE_` değişkenlerine koyma.

`VITE_` değerleri derleme sırasında okunur; değişiklikten sonra yeniden dağıtım gerekir.
API modu mevcut endpoint sözleşmelerini kullanır; demo kullanıcıları ve oturumları API'ye
taşınmaz. Gerçek moda geçtiğinde backend üzerinden giriş veya kayıt yapılır.

Yerel geliştirmede `frontend/.env.example` dosyasını `.env.local` olarak kopyalayabilirsin.
Gerçek backend ile yerelde çalışmak için `VITE_DATA_MODE=api` kullan; `VITE_API_BASE_URL`
boş bırakıldığında Vite `/api` isteklerini `http://localhost:8080` adresine yönlendirir.
