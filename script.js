if (typeof ymaps !== "undefined") {
    ymaps.ready(initMap);
}

function initMap() {
    var mapElement = document.getElementById("map");
    if (!mapElement) return; // Проверяем, есть ли элемент

    // Проверяем, не создана ли уже карта
    if (mapElement.dataset.mapInitialized) return;
    mapElement.dataset.mapInitialized = "true"; // Помечаем, что карта уже создана

    var myMap = new ymaps.Map("map", {
        center: [55.7558, 37.6808], // Лефортово, Москва
        zoom: 14
    });

    ymaps.geocode("Москва, 2-й Краснокурсантский проезд, 12").then(res => {
        var firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
            var coords = firstGeoObject.geometry.getCoordinates();
            var myPlacemark = new ymaps.Placemark(coords, {
                hintContent: "Стадион Энергия",
                balloonContent: "2-й Краснокурсантский пр-д, 12, м. Лефортово"
            });
            myMap.geoObjects.add(myPlacemark);
            myMap.setCenter(coords);
        } else {
            console.error("Адрес не найден!");
        }
    }).catch(err => console.error("Ошибка геокодирования:", err.message));
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".gallery-btn");
    const images = document.querySelectorAll(".gallery-img");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Убираем активный класс у всех кнопок
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Получаем выбранный год
            const year = this.getAttribute("data-year");

            // Показываем только нужное изображение
            images.forEach(img => {
                if (img.getAttribute("data-year") === year) {
                    img.classList.add("active");
                } else {
                    img.classList.remove("active");
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleryBtns = document.querySelectorAll(".gallery-btn");
    const images = document.querySelectorAll(".gallery-img");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentYear = "2023"; // Начальный год
    let currentIndex = 0;

    function updateGallery() {
        images.forEach(img => {
            img.classList.remove("active");
        });

        const yearImages = [...images].filter(img => img.getAttribute("data-year") === currentYear);
        if (yearImages.length > 0) {
            yearImages[currentIndex].classList.add("active");
        }
    }

    function showImage(index) {
        const yearImages = [...images].filter(img => img.getAttribute("data-year") === currentYear);
        yearImages.forEach(img => img.classList.remove("active"));
        yearImages[index].classList.add("active");
    }

    galleryBtns.forEach(button => {
        button.addEventListener("click", function () {
            galleryBtns.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            currentYear = this.getAttribute("data-year");
            currentIndex = 0;
            updateGallery();
        });
    });

    prevBtn.addEventListener("click", function () {
        const yearImages = [...images].filter(img => img.getAttribute("data-year") === currentYear);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = yearImages.length - 1;
        }
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", function () {
        const yearImages = [...images].filter(img => img.getAttribute("data-year") === currentYear);
        if (currentIndex < yearImages.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        showImage(currentIndex);
    });

    updateGallery(); // Показываем стартовую картинку
});

