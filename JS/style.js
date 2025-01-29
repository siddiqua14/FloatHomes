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

    function showSlide(i) {
        index = i < 0 ? dots.length - 1 : i >= dots.length ? 0 : i;
        images.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => showSlide(index + 1), 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Click navigation stops auto-slide and moves slides
    leftBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index - 1);
    });

    rightBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(i);
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
    // LANGUAGE DROPDOWN FUNCTIONALITY
    const languageSelectWrap = document.querySelector('.js-language-sort');
    const languageDefaultOption = languageSelectWrap.querySelector('.default-option');
    const languageOptions = languageSelectWrap.querySelectorAll('.select-ul li');

    // Toggle language dropdown
    languageDefaultOption.addEventListener('click', function (e) {
        e.stopPropagation();  // Prevent clicking inside the dropdown from triggering the document listener
        languageSelectWrap.classList.toggle('active');
    });

    // Handle language option selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent event propagation to other dropdowns
            const selectedText = this.querySelector('p').textContent;
            const selectedCountry = this.getAttribute('data-language-country');

            // Update language default option text
            languageDefaultOption.querySelector('p').textContent = selectedText;

            // Update data-language-country attribute
            languageSelectWrap.setAttribute('data-language-country', selectedCountry);

            // Close language dropdown
            languageSelectWrap.classList.remove('active');
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!languageSelectWrap.contains(e.target)) {
            languageSelectWrap.classList.remove('active');
        }
    });

    // CURRENCY DROPDOWN FUNCTIONALITY
    const currencySelectWrap = document.querySelector('.js-currency-sort');
    const currencyDefaultOption = currencySelectWrap.querySelector('.default-option');
    const currencyOptions = currencySelectWrap.querySelectorAll('.select-ul li');

    // Toggle currency dropdown
    currencyDefaultOption.addEventListener('click', function (e) {
        e.stopPropagation();  // Prevent clicking inside the dropdown from triggering the document listener
        currencySelectWrap.classList.toggle('active');
    });

    // Handle currency option selection
    currencyOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent event propagation to other dropdowns
            const selectedText = this.querySelector('p').textContent;
            const selectedCountry = this.getAttribute('data-currency-country');

            // Update currency default option text
            currencyDefaultOption.querySelector('p').textContent = selectedText;

            // Update data-currency-country attribute
            currencySelectWrap.setAttribute('data-currency-country', selectedCountry);

            // Close currency dropdown
            currencySelectWrap.classList.remove('active');
        });
    });

    // Close currency dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!currencySelectWrap.contains(e.target)) {
            currencySelectWrap.classList.remove('active');
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
