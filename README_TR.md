
# Instagram Auto Comment Delete
**[English](README.md) | Türkçe**
<p align="center">

[![License](https://img.shields.io/github/license/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/stargazers)
[![Forks](https://img.shields.io/github/forks/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/network/members)
[![Issues](https://img.shields.io/github/issues/dokess/Instagram-Auto-Comment-Delete-System)](https://github.com/dokess/Instagram-Auto-Comment-Delete-System/issues)

</p>

<p align="center">
  Akıllı rate-limit koruması ve insan benzeri davranış simülasyonu içeren otomatik Instagram yorum silme aracı.
</p>

---

Auto Comment Delete, Instagram yorumlarını tarayıcı konsolu üzerinden toplu şekilde yönetmek ve silmek için geliştirilmiş bir JavaScript aracıdır.

Script, Instagram yorum ekranında çalışır ve kullanıcıya işlem sürecini yönetebileceği modern bir kontrol paneli sunar. Panel üzerinden yorum silme işlemi başlatılabilir, duraklatılabilir, devam ettirilebilir ve sonlandırılabilir.

> Developed by **DOKES**  
> GitHub: https://github.com/dokess

---

## Özellikler

- Instagram yorumlarını toplu olarak seçme ve silme
- Tarayıcı içinde çalışan modern kontrol paneli
- Çoklu dil desteği
- Instagram arayüz dilini otomatik algılama
- Beyaz liste desteği
- Kara liste desteği
- Regex ile yorum filtreleme
- İşlemi duraklatma, devam ettirme ve sonlandırma
- Son silinen yorumları görüntüleme
- Oturum istatistikleri
- Güvenlik skoru takibi
- Akıllı rate-limit koruması
- İnsan benzeri davranış simülasyonu
- Adaptif bekleme sistemi
- Sesli uyarı desteği
- Tarayıcı bildirimi desteği
- Log kayıtlarını dışa aktarma
- JSON, CSV ve TXT formatlarında rapor alma
- Tema değiştirme
- Kompakt görünüm
- Panel boyutu değiştirme
- Panel opaklığı ayarlama
- Klavye kısayolları

---

## Kullanım

1. Instagram’da yorumları silmek istediğiniz gönderiyi veya yorum alanını açın.
2. Tarayıcı geliştirici araçlarını açın.
3. Console sekmesine geçin.
4. Script kodunu konsola yapıştırın.
5. Enter tuşuna basın.
6. Açılan panel üzerinden işlemi başlatın.

### Geliştirici Araçlarını Açma

Windows / Linux:

    F12

macOS:

    Option + Command + I

---

## **Kurulum** 
**Herhangi bir paket kurulumu gerekmez.** 

**Bu proje tek dosyalık JavaScript script’i olarak çalışır.** [`script.js`](./script.js) 

*Kurulum Gerektirmez*&*Tarayıcı konsolunda çalışır.*


---

## Beyaz Liste

Beyaz listeye eklenen kullanıcıların yorumları silinmez. Bu kullanıcıların yorumları işlem sırasında atlanır.

Örnek:

    arkadasim
    guvenilir_hesap
    marka_hesabi

---

## Kara Liste

Kara listeye kullanıcı eklenirse yalnızca listedeki kullanıcıların yorumları hedeflenir.

Örnek:

    spam_hesap
    bot_hesap
    reklam_hesabi

Kara liste boş bırakılırsa filtrelere uyan tüm yorumlar işleme alınabilir.

---

## Regex Filtreleme

Regex filtresi ile belirli kelimeleri veya desenleri içeren yorumlar hedeflenebilir.

Örnek:

    spam|reklam|bot

Bu örnekte spam, reklam veya bot kelimelerini içeren yorumlar filtrelenir.

Regex alanı boş bırakılırsa tüm uygun yorumlar işleme alınır.

---

## Klavye Kısayolları

| Kısayol | İşlev |
|---|---|
| Space | Duraklat / devam et |
| Esc | Bitir / kapat |
| T | Tema değiştir |
| L | Dil değiştir |
| U | Son işlemi geri al |
| C | Kompakt görünüm |
| ? | Yardım penceresini aç |
| Shift + S | Panel boyutunu değiştir |
| Shift + R | İstatistikleri sıfırla |
| Shift + O | Panel opaklığını değiştir |

---

## Log ve Raporlama

Script işlem sırasında kayıt tutar.

Log kayıtları aşağıdaki formatlarda dışa aktarılabilir:

- JSON
- CSV
- TXT

Oturum sonunda aşağıdaki bilgiler görüntülenebilir:

- Toplam silinen yorum sayısı
- Toplam tur sayısı
- Atlanan yorum sayısı
- İşlem süresi
- Saatlik işlem hızı
- Güvenlik skoru

---

## Dil Desteği

Script, Instagram arayüzündeki butonları algılamak için birden fazla dili destekler.

Desteklenen Instagram arayüz dilleri:

- Türkçe
- İngilizce
- Almanca
- Fransızca
- İspanyolca
- İtalyanca
- Portekizce
- Hollandaca
- Rusça
- Arapça
- Korece
- Japonca
- Çince

Panel arayüzünde desteklenen diller:

- Türkçe
- İngilizce
- Almanca
- İspanyolca
- Fransızca

---

## Tema ve Görünüm

Panel farklı tema seçenekleriyle kullanılabilir:

- Dark
- Light
- OLED
- Pink

Ek olarak panel:

- Kompakt moda alınabilir
- Boyutlandırılabilir
- Opaklığı değiştirilebilir
- Ekran üzerinde taşınabilir

---

## Güvenlik Notları

Auto Comment Delete, işlem hızını kontrol altında tutmak için bekleme süreleri, adaptif zamanlama ve rate-limit koruması kullanır.

Daha güvenli kullanım için:

- Çok yüksek miktarda yorumu tek seferde silmeyin.
- Tur başına yorum sayısını düşük tutun.
- Bekleme sürelerini çok kısa ayarlamayın.
- İşlem sırasında hesabınızda olağan dışı hareketlerden kaçının.
- Instagram arayüzü değişirse script’in bazı özellikleri çalışmayabilir.

---

## Panel Ayarları

Panel üzerinden aşağıdaki ayarlar yönetilebilir:

| Ayar | Açıklama |
|---|---|
| Instagram Dili | Instagram arayüz dilini belirler veya otomatik algılar |
| Panel Dili | Panel arayüz dilini değiştirir |
| Tur Başına Yorum | Her turda kaç yorumun seçileceğini belirler |
| Hedef | Toplam silinecek yorum sayısını belirler |
| Bekleme Süresi | İşlem turları arasındaki bekleme süresini ayarlar |
| Seçim Gecikmesi | Yorum seçme işlemleri arasındaki gecikmeyi belirler |
| Adaptif Zamanlama | İşlem durumuna göre bekleme sürelerini otomatik düzenler |
| Regex Filtre | Belirli kelime veya desenlere göre yorumları filtreler |
| Ses Bildirimi | İşlem sırasında sesli uyarıları açar veya kapatır |
| Browser Bildirimi | Tarayıcı bildirimlerini açar veya kapatır |

---

## Uyarı

Bu proje Instagram tarafından resmi olarak desteklenmez veya onaylanmaz.

Instagram arayüzü, DOM yapısı veya buton isimleri değiştiğinde script beklenildiği gibi çalışmayabilir.

Bu aracı kullanırken Instagram kullanım koşullarına, platform kurallarına ve geçerli yasalara uymak kullanıcının sorumluluğundadır.

---

## Sorumluluk Reddi

Bu proje kişisel kullanım ve eğitim amacıyla paylaşılmıştır.

Geliştirici; script’in hatalı kullanımı sonucunda oluşabilecek hesap kısıtlamaları, veri kaybı, platform yaptırımları veya diğer sonuçlardan sorumlu değildir.

Kullanım tamamen kullanıcı sorumluluğundadır.

---

## Geliştirici

**DOKES**

GitHub: https://github.com/dokess

---

## Lisans

Bu proje **MIT License** ile lisanslanmıştır.

Detaylar için [`LICENCE`](.LICENCE) dosyasını inceleyebilirsiniz.
---

## Destek

Projeyi faydalı bulduysanız GitHub üzerinden yıldız verebilirsiniz.

Auto Comment Delete v6.0  
Controlled Instagram Comment Cleanup Tool.
