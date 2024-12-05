'use strict';

const { ArtPiece } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//^ --------------- Seeder Data ---------------
const seedData = [
  {
    userId: 1,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/candles.jpg',
    title: 'Candles',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 1,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/portrait_1.jpg',
    title: 'Portrait',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 1,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/colorincup.jpg',
    title: 'Color in Cup',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 2,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/replace-portrait2.jpg',
    title: 'Portrait 2',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 2,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/bababasra74a.jpg',
    title: 'Baba Basra folio 74a',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 3,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/portrait_3.jpg',
    title: 'Portrait 3',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 3,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/portrait_4.jpg',
    title: 'Portrait 4',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 3,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/yamhatalmud.jpg',
    title: 'Yam HaTalmud',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 3,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/bimainshul.jpg',
    title: 'Bima in Shul',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 3,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/thehills.jpg',
    title: 'The Hills',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 4,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/lillypads.jpg',
    title: 'Lilly Pads',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 4,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/olivebranch.jpg',
    title: 'Olive Branch',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 4,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/field.jpg',
    title: 'Field',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 4,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/yearning.jpg',
    title: 'Yearning',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/tzedaka.jpg',
    title: 'Tzedaka',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/urban_1.jpg',
    title: 'Urban',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/replace-urban2jpg.jpg',
    title: 'Urban 2',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/replace-urban3.jpg',
    title: 'Urban 3',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/yellow-fields.jpg',
    title: 'Yellow Fields',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/nachlaot+(2).jpg',
    title: 'Nachlaot',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/chavrusah.jpg',
    title: 'Chavrusah',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/mosheinthesuf.jpg',
    title: 'Moshe in the Suf',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/fromthedepths.jpg',
    title: 'From the Depths',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 7,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/palace.jpg',
    title: 'Palace',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 7,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/oncloudsofglory.jpg',
    title: 'On Clouds of Glory',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 7,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/catchmewhenifall.jpg',
    title: 'Catch Me When I Fall',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 7,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/buildingworlds.jpg',
    title: 'Building Worlds',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 8,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/vehicle.jpg',
    title: 'Vehicle',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 8,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/kapparos.jpg',
    title: 'Kapparos',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 8,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/prayinginblue.jpg',
    title: 'Praying in Blue',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },{
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/92-jaffa-st.jpg',
    title: '92 Yaffo St',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/abode.jpg',
    title: 'Abode',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/basket-of-apples.jpg',
    title: 'Basket of Apples',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/book-shelf.jpg',
    title: 'Book Shelf',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/bush.jpg',
    title: 'Foliage',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/cafe-sketch.jpg',
    title: 'Cafe',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/chanukah.jpg',
    title: 'Chanukah Lights',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/coffee-break.jpg',
    title: 'Coffee Break',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/coffee-shop.jpg',
    title: 'Coffee Shop',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/connecting.jpg',
    title: 'Connected',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/corner-street.jpg',
    title: 'Rechov',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/courtyard.jpg',
    title: 'Courtyard',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/father-son.jpg',
    title: 'Father & Son',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/flowers.jpg',
    title: 'Flowers',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/friends.jpg',
    title: 'Friends',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/fruit.jpg',
    title: 'Fruit',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/holy-man.jpg',
    title: 'Holy Man',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/house-table.jpg',
    title: 'Home',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/houseware.jpg',
    title: 'Houseware',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/illumination.jpg',
    title: 'Illumination',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/jam.jpg',
    title: 'Jam',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/kiddush-levanah.jpg',
    title: 'Kiddush Levana',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/kum-kum.jpg',
    title: 'Kum Kum',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/light.jpg',
    title: 'Light',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/like-a-rose.jpg',
    title: 'Like The Rose',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/meadow.jpg',
    title: 'Meadow',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/nachlaot2.jpg',
    title: 'Nachlaot 2',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/neighborhood.jpg',
    title: 'Neighborhood',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/nurture.jpg',
    title: 'Nurture',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/pashkivillim.jpg',
    title: 'Pashkavilim',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/portrait5.jpg',
    title: 'Portrait 5',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/pot-on-roof.jpg',
    title: 'Rooftop',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/shepherd.jpg',
    title: 'Shepherd',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/sunflowers.jpg',
    title: 'Sunflowers',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/shuk.jpg',
    title: 'Shuk',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/vintage.jpg',
    title: 'Vintage',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/walking-group.jpg',
    title: "Chomos Ha'ir",
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/2-usher-art/word-art.jpg',
    title: 'Word Art',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  // {
  //   userId: ,
  //   imageId: '',
  //   title: '',
  //   description: '',
  //   available: true
  // }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ArtPiece.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ArtPieces';
    for (const art of seedData) {
      await ArtPiece.destroy({ where: art });
    }
  }
};
