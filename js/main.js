const ArgumentsError = function(message) {
  this.name = 'Ошибка переданных значений аргументов функции';
  this.message = message;
};

// eslint-disable-next-line no-unused-vars
const getRandomInteger = (min, max) => {
  if (min < 0 && max <= 0) {
    throw new ArgumentsError('Неверно задан диапазон значений!');
  }

  if (min < 0 || max < 0) {
    throw new ArgumentsError('Значения аргументов должны быть натуральными числами!');
  }

  if (max <= min) {
    throw new ArgumentsError('Значение второго аргумента должно быть больше значения первого аргумента!');
  }

  try {
    return Math.floor(min + Math.random() * (max + 1 - min));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.name, error.message);
  }
};

// eslint-disable-next-line no-unused-vars
const isNotExceedMaxLength = (string, maxLength) => [...string].length <= maxLength;
