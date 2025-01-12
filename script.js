// курсор
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.classList.add("trail");
  trail.style.left = `${e.pageX - 5}px`; // Центрирование по X
  trail.style.top = `${e.pageY - 5}px`; // Центрирование по Y
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove(); // Удаляем элемент после анимации
  }, 500); // Через 0.5s (анимируется)
});

// красные фотки
const images = document.querySelectorAll(".image");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); // Когда изображение становится видимым, добавляем класс show
        entry.target.classList.remove("hide"); // Убираем класс hide
      } else {
        entry.target.classList.add("hide"); // Когда изображение скрывается, добавляем класс hide
        entry.target.classList.remove("show"); // Убираем класс show
      }
    });
  },
  {
    threshold: 0.6, // Когда хотя бы 50% изображения становится видно
  }
);
images.forEach((image) => observer.observe(image));

// снежинки
const snowContainer = document.getElementById("snow-container");

const maxSnowflakes = 50; // Максимальное количество снежинок
let currentSnowflakes = 0; // Текущее количество снежинок

function createSnowflake() {
  if (currentSnowflakes >= maxSnowflakes) {
    return; // Прерываем создание, если достигнуто максимальное количество снежинок
  }

  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  // Устанавливаем случайные размеры, положение и длительность анимации
  const size = Math.random() * 10 + 4; // Размер снежинки
  const position = Math.random() * 100; // Положение по горизонтали
  const duration = Math.random() * 10 + 3; // Длительность анимации
  const delay = Math.random() * 2; // Случайная задержка

  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${position}%`;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.animationDelay = `${delay}s`;

  // Увеличиваем счётчик снежинок
  currentSnowflakes++;

  snowContainer.appendChild(snowflake);

  // Удаляем снежинку после завершения анимации
  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
    currentSnowflakes--; // Уменьшаем счётчик снежинок
  });
}

// Создаём снежинки с заданным интервалом
setInterval(createSnowflake, 150);

let lastFrameTime = 0;
const fps = 60;

// пузырики красные
const bubblesContainer = document.getElementById("bubbles-container");

const maxBubbles = 30; // Максимальное количество пузырьков
let currentBubbles = 0; // Текущее количество пузырьков

function createBubble() {
  if (currentBubbles >= maxBubbles) {
    return; // Прерываем создание, если достигнуто максимальное количество пузырьков
  }

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Устанавливаем случайные размеры, положение и скорость анимации
  const size = Math.random() * 10 + 5; // Размер пузырька (5-15px)
  const position = Math.random() * 300; // Положение по горизонтали
  const duration = Math.random() * 5 + 6; // Продолжительность анимации (6-11 сек)

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${position}%`;
  bubble.style.animationDuration = `${duration}s`;

  bubblesContainer.appendChild(bubble);

  // Увеличиваем счётчик пузырьков
  currentBubbles++;

  // Удаляем пузырёк после завершения анимации
  bubble.addEventListener("animationend", () => {
    bubble.remove();
    currentBubbles--; // Уменьшаем счётчик пузырьков
  });
}
function animate(time) {
  if (time - lastFrameTime >= 1000 / fps) {
    // Логика анимации: создаём пузырьки с определённым интервалом
    createBubble();
    lastFrameTime = time;
  }
  requestAnimationFrame(animate);
}

// Запуск анимации
requestAnimationFrame(animate);
