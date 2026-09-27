# مسعف المستقبل | سفيرات الهلال الأحمر

منصة تفاعلية تعليمية للإسعافات الأولية، جاهزة للنشر مباشرة على **GitHub Pages**.

## هيكل الملفات

```
├── index.html          ← الملف الرئيسي (الصفحة الوحيدة للتطبيق)
├── style.css           ← أنماط التصميم المخصصة (الرسوم المتحركة، تنسيق الشهادة للطباعة، إلخ)
├── tailwind-config.js  ← إعدادات ألوان وخطوط Tailwind الخاصة بالمشروع
├── script.js           ← منطق التطبيق بالكامل (الأسئلة، النقاط، الشهادة، لوحة المتصدرين...)
└── README.md           ← هذا الملف
```

جميع الروابط بين الملفات نسبية (relative)، ولا تحتاج لأي تعديل بعد رفعها على GitHub.

## المكتبات الخارجية المستخدمة (عبر CDN، لا حاجة لتحميلها يدويًا)
- Tailwind CSS
- خطوط Google (Cairo, Tajawal, Amiri)
- Font Awesome (الأيقونات)
- Tone.js (المؤثرات الصوتية)
- Canvas Confetti (تأثير الاحتفال)

## خطوات النشر على GitHub Pages

1. أنشئ مستودع (Repository) جديد على GitHub، مثلاً باسم `future-paramedic-game`.
2. ارفع الملفات الأربعة (`index.html`, `style.css`, `tailwind-config.js`, `script.js`) إلى جذر المستودع مباشرة (وليس داخل مجلد فرعي)، إما عبر:
   - سحب وإفلات الملفات في واجهة GitHub عبر زر **Add file → Upload files**، أو
   - عبر الأوامر التالية من جهازك:
     ```bash
     git init
     git add index.html style.css tailwind-config.js script.js
     git commit -m "نشر لعبة مسعف المستقبل"
     git branch -M main
     git remote add origin https://github.com/USERNAME/REPO-NAME.git
     git push -u origin main
     ```
3. من داخل المستودع على GitHub: اذهب إلى **Settings → Pages**.
4. تحت **Build and deployment → Source** اختر **Deploy from a branch**.
5. اختر الفرع **main** والمجلد **/ (root)**، ثم اضغط **Save**.
6. انتظر دقيقة أو دقيقتين، وسيظهر رابط الموقع أعلى الصفحة بالشكل:
   ```
   https://USERNAME.github.io/REPO-NAME/
   ```

## ملاحظة مهمة
لا تُغيّر اسم أي من الملفات الأربعة (`index.html`, `style.css`, `tailwind-config.js`, `script.js`) ولا تنقلها إلى مجلدات فرعية، لأن الروابط بينها مكتوبة بأسمائها الحالية مباشرة في جذر المشروع.
