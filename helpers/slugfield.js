const slugify = require('slugify');

const options = {
  replacement: '-',      // Metindeki boşlukları veya özel karakterleri, tire işaretiyle değiştirir.
  remove: undefined,     //  Metindeki belirli karakterleri kaldırmak için kullanılır. Burada, herhangi bir karakter kaldırılmayacak şekilde ayarlandığı için "undefined" değeri kullanılmıştır.
  lower: true,           // Slug'un küçük harfle yazılmasını sağlar.
  strict: true,          // Geçersiz karakterleri veya özel sembolleri kaldırır ve yalnızca harf ve rakamların slug olarak kullanılmasını sağlar.
  locale: 'tr',          // dil ayarını yapar tr turkce, vi ingilizce gibi.
  trim: true             // Metnin başındaki ve sonundaki boşlukları kaldırır.
}


module.exports = function slugField(str) {
    return slugify(str, options);
}