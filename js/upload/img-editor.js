
const ScaleParameters = {
  START: 100,
  STEP: 25,
  UNIT: '%',
  FUNCTION: 'scale',
  value: 100,
  Range: {
    MIN: 25,
    MAX: 100,
  },
};

const SliderDefaultParameters = {
  START: 100,
  STEP: 1,
  CONNECT: 'lower',
  Range: {
    MIN: 0,
    MAX: 100,
  },
};

const effectValueToParameters = {
  none: {
    CLASS: 'effects__preview--none',
  },
  chrome: {
    CLASS: 'effects__preview--chrome',
    FILTER: 'grayscale',
    START: 1,
    STEP: 0.1,
    UNIT: '',
    Range: {
      MIN: 0,
      MAX: 1,
    },
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    FILTER: 'sepia',
    START: 1,
    STEP: 0.1,
    UNIT: '',
    Range: {
      MIN: 0,
      MAX: 1,
    },
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    FILTER: 'invert',
    START: 100,
    STEP: 1,
    UNIT: '%',
    Range: {
      MIN: 0,
      MAX: 100,
    },
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    FILTER: 'blur',
    START: 3,
    STEP: 0.1,
    UNIT: 'px',
    Range: {
      MIN: 0,
      MAX: 3,
    },
  },
  heat: {
    CLASS: 'effects__preview--heat',
    FILTER: 'brightness',
    START: 3,
    STEP: 0.1,
    UNIT: '',
    Range: {
      MIN: 1,
      MAX: 3,
    },
  },
};

const scaleControlContainerElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderValueElement = document.querySelector('.effect-level__value');
const effectsContainerElement = document.querySelector('.img-upload__effects');
const noneEffectInputElement = document.querySelector('#effect-none');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const setScaleValue = (value) => {
  scaleControlValueElement.value = `${value}${ScaleParameters.UNIT}`;
  imgPreviewElement.style.transform = `${ScaleParameters.FUNCTION}(${value / 100})`;
};

const scaleClickHandler = (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.scale__control--smaller')) {
    ScaleParameters.value -= ScaleParameters.STEP;

    if (ScaleParameters.value < ScaleParameters.Range.MIN) {
      ScaleParameters.value = ScaleParameters.Range.MIN;
    }

    return setScaleValue(ScaleParameters.value);
  }

  if (targetElement.matches('.scale__control--bigger')) {
    ScaleParameters.value += ScaleParameters.STEP;

    if (ScaleParameters.value > ScaleParameters.Range.MAX) {
      ScaleParameters.value = ScaleParameters.Range.MAX;
    }

    return setScaleValue(ScaleParameters.value);
  }

};

const initSlider = () => {
  sliderValueElement.value = SliderDefaultParameters.START;

  noUiSlider.create(sliderElement, {
    range: {
      min: SliderDefaultParameters.Range.MIN,
      max: SliderDefaultParameters.Range.MAX,
    },
    start: SliderDefaultParameters.START,
    step: SliderDefaultParameters.STEP,
    connect: SliderDefaultParameters.CONNECT,
    format: {
      to: (value) => value.toFixed(Number.isInteger(value) ? 0 : 1),
      from: (value) => parseFloat(value),
    },
  });
};

const effectsChangeHandler = (evt) => {
  const targetElement = evt.target;

  if (targetElement.matches('.effects__radio')) {
    const effect = effectValueToParameters[targetElement.value];

    imgPreviewElement.removeAttribute('class');
    imgPreviewElement.classList.add(effect.CLASS);

    if (targetElement.value === 'none') {
      sliderContainerElement.classList.add('hidden');
      imgPreviewElement.style.filter = targetElement.value;
      sliderValueElement.value = '';
    } else {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: effect.Range.MIN,
          max: effect.Range.MAX,
        },
        step: effect.STEP,
      });

      sliderElement.noUiSlider.set(effect.START);
      sliderContainerElement.classList.remove('hidden');

      sliderElement.noUiSlider.on('update', (values, handle) => {
        sliderValueElement.value = values[handle];
        imgPreviewElement.style.filter = `${effect.FILTER}(${values[handle]}${effect.UNIT})`;
      });
    }
  }
};

const initScaleImg = () => {
  ScaleParameters.value = ScaleParameters.START;
  scaleControlValueElement.value = `${ScaleParameters.START}${ScaleParameters.UNIT}`;
  scaleControlContainerElement.addEventListener('click', scaleClickHandler);
};

const destroyScaleImg = () => {
  scaleControlContainerElement.removeEventListener('click', scaleClickHandler);
};

const initEffectImg = () => {
  imgPreviewElement.classList.add(effectValueToParameters.none.CLASS);
  sliderContainerElement.classList.add('hidden');
  initSlider();
  sliderValueElement.value = '';
  noneEffectInputElement.checked = true;
  effectsContainerElement.addEventListener('change', effectsChangeHandler);
};

const destroyEffectImg = () => {
  imgPreviewElement.removeAttribute('class');
  imgPreviewElement.removeAttribute('style');
  sliderContainerElement.classList.remove('hidden');
  sliderElement.noUiSlider.off();
  sliderElement.noUiSlider.destroy();
  effectsContainerElement.removeEventListener('change', effectsChangeHandler);
};

const initImgEditor = () => {
  initScaleImg();
  initEffectImg();
};

const destroyImgEditor = () => {
  destroyScaleImg();
  destroyEffectImg();
};

export {initImgEditor, destroyImgEditor};
