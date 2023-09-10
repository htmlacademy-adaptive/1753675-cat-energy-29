// Слайдер
const sliderWrapper = document.querySelector('.comparison-slider__image-wrapper'),
      sliderImageBefore = document.querySelector('.comparison-slider__image--before'),
      sliderImageAfter = document.querySelector('.comparison-slider__image--after'),
      sliderToggle = document.querySelector('.comparison-slider__toggle');

// Через деструктуризацию сохраняем значения нужных свойств полученных от метода Web API
const {x: containerX, width: containerWidth} = sliderWrapper.getBoundingClientRect();

const handleDown = (event) => {
  // Прослушиваем события движения и опускание кнопки мыши
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', handleMouseUp);
}

const handleMouseUp = () => {
  // Снимаем с прослушивания события
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', handleMouseUp);
}

const handleDrag = (event) => {
  // Вычисляем позицию тогглера относительно контейнера
  const clientX = event.clientX || event.touches[0].clientX;
  const togglePosition = clientX - containerX;

  // Проверяем находится ли тогглер в допустимой области
  if (togglePosition < 0) {
    return;
  }

  if (togglePosition > containerWidth) {
    return;
  }

  // Вычисляем процент текущей позиции тогглера от ширины контейнера для дальнейшего использования в clip-path
  const percent = togglePosition / containerWidth * 100;

  window.requestAnimationFrame(() => {
    sliderToggle.style.left = togglePosition + 'px';
    sliderImageAfter.style = `clip-path: polygon(${percent}% 0%, 100% 0%, 100% 100%, ${percent}% 100%);`;
    sliderImageBefore.style = `clip-path: polygon(${percent}% 0%, 0% 0%, 0% 100%, ${percent}% 100%);`;
  })
}

if (sliderToggle) {
  sliderToggle.addEventListener('mousedown', handleDown);
}
