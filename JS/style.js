const nav = document.querySelector(".nav");
const mobileSearchIcon = document.querySelector("#mobileSearchIcon");
const mobileSearchInput = document.querySelector(".mobile-search-input");
const navOpenBtn = document.querySelector(".navOpenBtn");
const navCloseBtn = document.querySelector(".navCloseBtn");

mobileSearchIcon.addEventListener("click", () => {
    mobileSearchInput.classList.toggle("active");
    nav.classList.remove("openNav");
});

navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    mobileSearchInput.classList.remove("active");
});

navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});

/////sliding 
document.querySelectorAll('.image-slider').forEach(slider => {
    const images = slider.querySelector('.slider-images');
    const dots = slider.querySelectorAll('.dot');
    const leftBtn = slider.querySelector('.left');
    const rightBtn = slider.querySelector('.right');
    let index = 0;
    let autoSlide;
    
    const slides = Array.from(images.children);
    const totalSlides = slides.length;

    // Clone first and last images for seamless looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    
    images.appendChild(firstClone); // Append first image at the end
    images.insertBefore(lastClone, slides[0]); // Insert last image at the beginning

    const newTotalSlides = totalSlides + 2; // Include the cloned slides
    index = 1; // Start from the real first image

    images.style.transition = "none";
    images.style.transform = `translateX(-${index * 100}%)`;

    function showSlide(i) {
        images.style.transition = "transform 0.5s ease-in-out";
        images.style.transform = `translateX(-${i * 100}%)`;
        index = i;

        setTimeout(() => {
            if (index === 0) {
                images.style.transition = "none";
                index = totalSlides;
                images.style.transform = `translateX(-${index * 100}%)`;
            } else if (index === newTotalSlides - 1) {
                images.style.transition = "none";
                index = 1;
                images.style.transform = `translateX(-${index * 100}%)`;
            }
        }, 500);

        updateDots();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        const realIndex = (index === 0 ? totalSlides - 1 : index === newTotalSlides - 1 ? 0 : index - 1);
        dots[realIndex].classList.add('active');
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => showSlide(index + 1), 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    rightBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index + 1);
    });

    leftBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index - 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(i + 1);
        });
    });

    // Start auto-slide initially
    // startAutoSlide();
});





function highlightSelectWrapper() {
    // Get the select-wrapper element
    const selectWrapper = document.getElementById('select-wrapper');

    // Add the highlight effect
    selectWrapper.style.border = '2px solid #007bff';

    // Function to remove highlight when clicking outside
    function handleClickOutside(event) {
        if (!selectWrapper.contains(event.target)) {
            // Reset the border
            selectWrapper.style.border = '1px solid #E5E7EB';
            // Remove this event listener
            document.removeEventListener('click', handleClickOutside);
        }
    }

    // Add a click event listener to the document
    document.addEventListener('click', handleClickOutside);
}

// Attach the function to the search-icon-wrapper click
document.querySelector('.search-icon-wrapper').addEventListener('click', (event) => {
    // Prevent the click from triggering the outside click listener immediately
    event.stopPropagation();
    highlightSelectWrapper();
});
// Attach the function to the mobile-search-icon-wrapper click
document.querySelector('.mobile-search-icon-wrapper').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from triggering the outside click listener immediately
    highlightSelectWrapper();
});

///currency

///foooter
document.addEventListener('DOMContentLoaded', function () {
    const selectWrap = document.querySelector('.js-currency-sort');
    const defaultOption = selectWrap.querySelector('.default-option');
    const options = selectWrap.querySelectorAll('.select-ul li');

    // Toggle dropdown
    defaultOption.addEventListener('click', function (e) {
        e.stopPropagation();
        selectWrap.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const selectedText = this.querySelector('p').textContent;
            const selectedCountry = this.getAttribute('data-currency-country');

            // Update default option text
            defaultOption.querySelector('p').textContent = selectedText;

            // Update data attribute
            selectWrap.setAttribute('data-currency-country', selectedCountry);

            // Close dropdown
            selectWrap.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!selectWrap.contains(e.target)) {
            selectWrap.classList.remove('active');
        }
    });

});



///input clear
document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location');
    const clearButton = document.getElementById('clear-location');

    clearButton.addEventListener('click', function () {
        locationInput.value = '';
        clearButton.style.display = 'none';
    });

    locationInput.addEventListener('input', function () {
        clearButton.style.display = locationInput.value ? 'block' : 'none';
    });
});
