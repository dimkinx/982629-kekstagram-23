// eslint-disable-next-line no-unused-vars
const getRandomInteger = function(min, max) {
  const ArgumentsError = function(message) {
    this.name = 'Ошибка переданных значений аргументов функции getRandomInteger';
    this.message = message;
  };

  if (min < 0 && max <= min) {
    throw new ArgumentsError('Неверно задан диапазон значений!');
  }

  if (min < 0) {
    throw new ArgumentsError('Значение первого аргумента не натуральное число!');
  }

  if (max <= min) {
    throw new ArgumentsError('Значение второго аргумента должно быть больше значения первого аргумента!');
  }

  try {
    // Ilya Kantor's solution from https://javascript.info/task/random-int-min-max
    return Math.floor(min + Math.random() * (max + 1 - min));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.name, error.message);
  }
};

// eslint-disable-next-line no-unused-vars
const isNotExceedMaxLength = (string, maxLength) => [...string].length <= maxLength;
