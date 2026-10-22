document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Знаходимо всі маленькі картинки на сторінці
  const images = document.querySelectorAll('.gallery-item');
  
  // 2. Знаходимо елементи нашого темного вікна перегляду
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Змінна, яка пам'ятатиме номер відкритої картинки
  let currentIndex = 0;

  // Функція, яка бере адресу картинки під потрібним номером і вставляє її у велике вікно
  function updateImage(index) {
    lightboxImg.src = images[index].src;
    currentIndex = index;
  }

  // Робимо так, щоб кожна картинка реагувала на клік
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex'; // Показуємо темне вікно
      updateImage(index);             // Вставляємо туди картинку, на яку клікнули
    });
  });

  // Клік на хрестик — ховаємо вікно
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // Клік на темне тло навколо картинки — теж ховаємо вікно
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Клік на праву стрілочку — показуємо НАСТУПНУ картинку
  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Щоб вікно випадково не закрилося при кліку на стрілку
    let nextIndex = currentIndex + 1;
    
    // Якщо дійшли до кінця списку — повертаємось на першу картинку (номер 0)
    if (nextIndex >= images.length) {
      nextIndex = 0;
    }
    updateImage(nextIndex);
  });

  // Клік на ліву стрілочку — показуємо ПОПЕРЕДНЮ картинку
  prevBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    let prevIndex = currentIndex - 1;
    
    // Якщо ми на першій картинці й тиснемо назад — переходимо на найостаннішу
    if (prevIndex < 0) {
      prevIndex = images.length - 1;
    }
    updateImage(prevIndex);
  });
});
