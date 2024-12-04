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
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/portrait_2.jpg',
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
    title: 'Yam haTalmud',
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
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/urban_2.jpg',
    title: 'Urban 2',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 5,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/urban_3.jpg',
    title: 'Urban 3',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/yellowfields.jpg',
    title: 'Yellow Fields',
    description: 'Текст-рыба для веб-дизайна: лорем ипсум долор сит амет, consectetur adipiscing элит. Элиас интеллегам мел ид, при пертинах хонистас ут. Не про вирис сапиентем, вис номинави детрахит адиписцинг ут. Яуидам сенсибус вис ид, ин про убикве ирьяредем. Эос ут обликве веритус.',
    available: true
  },
  {
    userId: 6,
    imageId: 'https://once-upon-an-easel-bucket.s3.us-east-1.amazonaws.com/usher-art/nachlaot.jpg',
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
