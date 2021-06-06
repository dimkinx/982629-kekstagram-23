const PHOTOS_NUM = 25;
const MAX_COMMENT_LENGTH = 140;

let commentId = 0;

const AvatarRange = {
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

const photosDescriptions = [
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

const usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const usersNames = [
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

const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const shuffleArray = (array) => [...array].map((_, index, newArray) => {
  const randomIndex = index + (Math.floor(Math.random() * (newArray.length - index)));
  [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];

  return newArray[index];
});

const checkStringLength = (string, length = MAX_COMMENT_LENGTH) => string.length <= length;

const cropString = (string) => !checkStringLength(string) && string
  .slice(0, MAX_COMMENT_LENGTH - 3)
  .padEnd(MAX_COMMENT_LENGTH, '.');

const makeMessage = (array) => {
  const [firstMessage, secondMessage] = shuffleArray(array);
  const singleMessage = secondMessage;
  const doubleMessage = `${firstMessage} ${secondMessage}`;
  const message = (Math.random() >= 0.5) ? doubleMessage : singleMessage;

  return checkStringLength(message) ? message : cropString(message);
};

const makeComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomPositiveInteger(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
  message: makeMessage(usersComments),
  name: usersNames[getRandomPositiveInteger(0, usersNames.length - 1)],
});

const getComments = (number) => Array(number).fill(null).map(() => makeComment(++commentId));

const makePhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `${photosDescriptions[--id]}`,
  likes: getRandomPositiveInteger(LikesRange.MIN, LikesRange.MAX),
  comments: getComments(getRandomPositiveInteger(CommentsRange.MIN, CommentsRange.MAX)),
});

const getPhotosIds = (number) => Array(number).fill(null).map((_, index) => ++index);

const getPhotosData = (number) => getPhotosIds(number).map(makePhoto);

// eslint-disable-next-line no-console
console.log(getPhotosData(PHOTOS_NUM));
