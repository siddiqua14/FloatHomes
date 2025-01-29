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
document.addEventListener('DOMContentLoaded', function() {
    const selectWrap = document.querySelector('.select-wrap');
    const defaultOption = document.querySelector('.default-option');
    const selectUl = document.querySelector('.select-ul');
    const options = document.querySelectorAll('.select-ul li');

    // Toggle dropdown
    defaultOption.addEventListener('click', function(e) {
        e.stopPropagation();
        selectWrap.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const selectedText = this.querySelector('p').textContent;
            defaultOption.querySelector('p').textContent = selectedText;
            selectWrap.classList.remove('active');
            selectWrap.dataset.currencyCountry = this.dataset.currencyCountry;
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!selectWrap.contains(e.target)) {
            selectWrap.classList.remove('active');
        }
    });
});
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
document.addEventListener('DOMContentLoaded', function () {
    const selectWrap = document.querySelector('.js-language-sort');
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
            const selectedCountry = this.getAttribute('data-language-country');

            // Update default option text
            defaultOption.querySelector('p').textContent = selectedText;

            // Update data attribute
            selectWrap.setAttribute('data-language-country', selectedCountry);

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

