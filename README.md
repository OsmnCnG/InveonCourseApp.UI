<img src="https://i.imgur.com/4M72gL0.png" width="400" height="300" />

# Mini Kurs API Projesi

Bu projede, bir kurs yönetim sistemi oluşturulmuştur. Kullanıcılar siteye giriş yaptıktan sonra, belirli yetkilere sahip kullanıcılara göre farklı işlemler yapabilirler. 

## Özellikler

- **İki Instructor Hesabı**: Eğitim oluşturma yetkisine sahip kullanıcılar.
- **Bir Regular Kullanıcı**: Kurs satın alma ve sahip olduğu kurslara erişme yetkisine sahip.
- **Veritabanı Konfigürasyonu**: `application.json` dosyasına kullanıcı tarafından MySQL veritabanı bilgisi girilerek yapılandırılacaktır.
- **Kurs Oluşturma ve Satın Alma**: Instructor hesapları eğitim oluşturabilirken, diğer kullanıcılar kurs satın alabilir ve "Kurslarım" bölümünde bu kurslara erişebilir.

## Başlangıç

### Gereksinimler

- MySQL veritabanı
- .NET ve C#
- Node.js ve npm/yarn (frontend için)

### Proje Yapısı

1. **Veritabanı Konfigürasyonu**: 
   - `application.json` dosyasını düzenleyerek veritabanı bağlantı bilgilerini girin.

```json
{
  "ConnectionStrings": {
    "MySqlConnection": "Server=localhost;Database=InveonDbTest;User=root;Password=yourpassword;Port=3306;"
  }
}
```

2. **Kullanıcı Seed Dosyası**:
   - Proje başladığında `userSeed` dosyası otomatik olarak çalışacak ve aşağıdaki kullanıcılar veritabanına eklenecektir:
     - **Instructor 1**: `instructor1@inveon.com` / `InveonInstructor1!`
     - **Instructor 2**: `instructor2@inveon.com` / `InveonInstructor2!`
     - **Regular User**: `user@inveon.com` / `InveonUser1!`

### Kullanıcı Girişi ve Yetkiler

- **Instructor Girişi**: Eğer giriş yapan kullanıcı bir instructor hesabına sahipse, eğitim oluşturma ve yönetme bölümüne erişebilir.
- **Regular Kullanıcı Girişi**: Normal kullanıcılar siteye giriş yaptıktan sonra kurs satın alabilirler. Satın aldıkları kurslara "Öğrenim içeriğim" bölümünden ulaşabilirler.
  
<img src="https://i.imgur.com/tDnSraR.png" width="250" height="300" />



### Veritabanı ve Kurulum

1. **Veritabanı Yapılandırma**:
   - Proje başlamadan önce, veritabanı oluşturulmalı ve yapılandırılmalıdır. `application.json` dosyasındaki veritabanı bağlantı bilgilerini girerek bu bağlantıyı sağlarsınız.

2. **Seed Verisi**:
   - Projeyi ilk çalıştırdığınızda, `userSeed` dosyası otomatik olarak çalışacak ve veritabanına 2 instructor ve 1 normal kullanıcıyı ekleyecektir.

### Kullanıcı Arayüzü

- **Instructor**:
  - Giriş yaptıktan sonra eğitim oluşturabilir ve yönetebilir.
  
- **Regular Kullanıcı**:
  - Giriş yaptıktan sonra, listelenen kursları satın alabilir ve "Kurslarım" kısmında satın aldığı kursları görüntüleyebilir.

<img src="https://i.imgur.com/cTr9N62.png" width="500" height="300" />

## Kullanım

1. Projeyi çalıştırın:
   ```bash
   dotnet run
   ```

2. `application.json` dosyasındaki veritabanı bilgilerini düzenleyin.

3. Siteye giriş yapın ve kullanıcı tipi doğrultusunda işlemler yapın.

---
