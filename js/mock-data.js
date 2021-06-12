import * as util from './util.js';

const PHOTOS_NUM = 25;
const MAX_COMMENT_LENGTH = 140;

let commentId = 0;

const PHOTOS_DESCRIPTIONS = [
  'Отель Eden (город Ровинь, Хорватия)',
  'Karon Beach (остров Пхукет, Таиланд)',
  'Пляж (остров Натуна, Кепулауан-Риау, Индонезия)',
  'Девина Брюгман (Солт-Лейк-Сити, Штат Юта, США)',
  'Довольные рисовые человечки в карри',
  'Английский суперкар с гибридным двигателем McLaren P1',
  'Какудзара',
  'Горячий ягодный кисель «Поморский кёж»',
  'Maho Beach (остров Сен-Мартен, Карибское море)',
  'Органайзер для обуви под кроватью - Wheels India Ltd',
  'Пляж у отеля Clevelander (Майами-Бич, США)',
  'Audi RS 5 - спортивный автомобиль класса «гран-туризмо»',
  'Салат из овощей и фруктов',
  'Neko-Sushi - суши-кошка, существующая рядом с человеком от самого начала времён',
  'Гигантские «Роботапки» со звуком - в них вы будете выглядеть и звучать как робот',
  'Самолёт над горным массивом Сан-Гейбриел в окрестностях Дуарти',
  'Филлис Бердвелл дирижирует Евангельским хором в баптистской церкви на горе Сион',
  'Chevrolet Impala лоурайдер на выставке «Original Meet 2017» в Санкт-Петербурге',
  'Тапочки для гика: со встроенными светодиодами, USB-подогревом и Bluetooth',
  'Роскошный отель Long Beach на Маврикии',
  'FoodPorn: Slow Cooker Thai Chicken',
  'Закат на море',
  'Краб - инфраотряд десятиногих ракообразных, обитающих в солёной и пресной водах',
  'Watch The Throne Tour - концерт рэперов Jay-Z и Kanye West 19.05.2012 (O2 Arena, Лондон, Англия)',
  'Bali Safari and Marine Park - парк культуры и отдыха (остров Бали, Индонезия)',
];

const USERS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USERS_NAMES = [
  'Рэйчел Карен Грин',
  'Моника Е. Геллер',
  'Фиби Буффе',
  'Джозеф Фрэнсис Триббиани-младший',
  'Чендлер Мюриэл Бинг',
  'Росс Юстас Геллер',
  'Малькольм «Мэл» Рейнольдс',
  'Зои Эллейн Уошбурн',
  'Хобан «Уош» Уошбурн',
  'Инара Серра',
  'Джейн Кобб',
  'Кейуиннит Ли «Кейли» Фрай',
  'Доктор Саймон Тэм',
  'Ривер Тэм',
  'Дерриал «Пастор» Бук',
];

const AvatarsRange = {
  MIN: 1,
  MAX: 6,
};

const CommentsRange = {
  MIN: 1,
  MAX: 20,
};

const LikesRange = {
  MIN: 15,
  MAX: 200,
};

const makeMessage = (array) => {
  const [firstMessage, secondMessage] = util.shuffleArray(array);
  const singleMessage = secondMessage;
  const doubleMessage = `${firstMessage} ${secondMessage}`;
  const message = (Math.random() >= 0.5) ? doubleMessage : singleMessage;

  return util.checkStringLength(message, MAX_COMMENT_LENGTH) ? message : util.cropString(message, MAX_COMMENT_LENGTH);
};

const makeComment = (id) => ({
  id: id,
  avatar: `img/avatar-${util.getRandomPositiveInteger(AvatarsRange.MIN, AvatarsRange.MAX)}.svg`,
  message: makeMessage(USERS_COMMENTS),
  name: USERS_NAMES[util.getRandomPositiveInteger(0, USERS_NAMES.length - 1)],
});

const getComments = (number) => Array(number).fill(null).map(() => makeComment(++commentId));

const makePhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `${PHOTOS_DESCRIPTIONS[--id]}`,
  likes: util.getRandomPositiveInteger(LikesRange.MIN, LikesRange.MAX),
  comments: getComments(util.getRandomPositiveInteger(CommentsRange.MIN, CommentsRange.MAX)),
});

const getPhotosIds = (number) => Array(number).fill(null).map((_, index) => ++index);

const getPhotosData = (number) => getPhotosIds(number).map(makePhoto);

const mockData = getPhotosData(PHOTOS_NUM);

export {mockData};
