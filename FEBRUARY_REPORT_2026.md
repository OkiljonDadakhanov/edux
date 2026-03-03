# EduX — 2026-yil fevral oyi hisobot

**Davr:** 2026-yil 1-fevral — 28-fevral  
**Loyiha:** EduX (edux)

---

## Umumiy ko‘rinish

Fevral oyi davomida EduX veb-platformasida bosh sahifa (hero) bo‘limi kengaytirildi, yangi olimpiada e’lonlari qo‘shildi, jamoa bo‘limi yangilandi, podkast va mobil navigatsiya yaxshilandi.

---

## Bajarilgan ishlar

### 1. Bosh sahifa — Hero bo‘limi va olimpiada e’lonlari

- **IOAI 2026** — Xalqaro sun’iy intellekt olimpiadasi e’loni qo‘shildi (11-fevral). O‘zbekiston ilk bor IOAIda ishtirok etishi, 4 bosqichli saralash, ro‘yxatdan o‘tish va video havolalari.
- **AKHU STEAM Olimpiadasi 2026** — Al-Xorazmiy universiteti STEAM olimpiadasi uchun yangi slayd va rasmlar (STEAM.png, akhu.jpg) qo‘shildi (17-fevral).
- **Dasturlash va Kiberxavfsizlik olimpiadalari** — Hero slideriga ikkita yangi olimpiada e’loni qo‘shildi: Dasturlash (algoritmlar, dasturlash tillari) va Kiberxavfsizlik (tarmoq xavfsizligi, kriptografiya) (19-fevral).
- Olimpiada slaydlari bitta slider ichida birlashtirildi va Hero bo‘limi kichik tahrirlar bilan yangilandi (17–20-fevral).

### 2. Jamoa (Team) bo‘limi

- Yangi jamoa a’zolari qo‘shildi: Charos, Shermatov, Sherzod — rasmlar va ma’lumotlar (4-fevral).
- Jamoa tartibi yangilandi.
- Shahnoza uchun rol yozuvi „koordinatori“ deb to‘g‘rilandi (19-fevral).
- Shahnoza rasmi yangilandi (shahnoza.JPG) va Team bo‘limi matnlari yangilandi (19-fevral).

### 3. Podkast

- **4-son podkast** qo‘shildi (4-fevral).
- Podkast sahifasida kartochkalar joylashuvi va ko‘rinishi yaxshilandi (card layout).

### 4. Mobil navigatsiya va header

- Mobil menyuda submenular (ochiluvchi menyular) to‘g‘ri ishlashi ta’minlandi (14-fevral).
- Test rejimidagi ogohlantirish banneri olib tashlandi.
- `MobileEduXDropdown` va `MobileOlimpiadalarDropdown` komponentlari qo‘shildi/yangilandi.
- Header tuzilmasi soddalashtirildi (26 o‘zgarish).

### 5. Loyiha fayllari va resurslar

- **Rasmlar:** AI.jpg (IOAI), STEAM.png, akhu.jpg, podcast/1.jpg, team/charos.jpg, shermatov.jpg, sherzod.JPG, shahnoza.JPG — barchasi loyihaga qo‘shildi yoki yangilandi.

---

## Texnik qisqacha

| Joy | O‘zgarishlar |
|-----|----------------|
| `src/components/Home/Hero/index.tsx` | IOAI, AKHU STEAM, Dasturlash, Kiberxavfsizlik slaydlari; slider birlashtirish |
| `src/components/Home/Team/index.tsx` | Yangi a’zolar, tartib, Shahnoza matni va rasm |
| `src/components/Layout/Header/` | Mobil dropdown komponentlar, banner olib tashlash |
| `src/app/(site)/podcast/page.tsx` | 4-son podkast, kartochka layout |
| `public/` | Yangi rasmlar (team, banner, podcast) |

---

## Xulosa

Fevral oyida EduX platformasida bosh sahifa olimpiada e’lonlari (IOAI 2026, AKHU STEAM, Dasturlash, Kiberxavfsizlik) bilan boyitildi, jamoa bo‘limi yangilandi, podkast 4-son qo‘shildi va mobil navigatsiya muammolari bartaraf etildi. Barcha o‘zgarishlar Git orqali commit qilingan va remote repozitoriyga push qilindi.
