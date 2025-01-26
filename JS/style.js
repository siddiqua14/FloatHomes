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
    let index = 0;

    function showSlide(i) {
        index = i < 0 ? dots.length - 1 : i >= dots.length ? 0 : i;
        images.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    slider.querySelector('.left').addEventListener('click', () => showSlide(index - 1));
    slider.querySelector('.right').addEventListener('click', () => showSlide(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

    // Auto-slide every 5 seconds
    setInterval(() => showSlide(index + 1), 5000);
});


document.addEventListener('DOMContentLoaded', function () {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function createCalendar(containerId, input, isCheckout = false) {
        const container = document.getElementById(containerId);
        let currentDate = new Date();

        function renderCalendar() {
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            let calendarHTML = `
                <div class="calendar-header">
                    <span>${months[currentDate.getMonth()]} ${currentDate.getFullYear()}</span>
                    <div class="calendar-navigation">
                        <button type="button" class="prev-month">&lt;</button>
                        <button type="button" class="next-month">&gt;</button>
                    </div>
                </div>
                <div class="calendar-grid">
                    <div class="calendar-weekdays">
                        ${weekdays.map(day => `<div>${day}</div>`).join('')}
                    </div>
                    <div class="calendar-days">`;

            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay.getDay(); i++) {
                calendarHTML += '<div></div>';
            }

            // Add days of the month
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const today = new Date();
                const isDisabled = date < today;
                const className = isDisabled ? 'calendar-day disabled' : 'calendar-day';

                calendarHTML += `<div class="${className}" data-date="${date.toISOString()}">${day}</div>`;
            }

            calendarHTML += `</div></div>`;
            container.innerHTML = calendarHTML;

            // Add event listeners for navigation buttons
            container.querySelector('.prev-month').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });

            container.querySelector('.next-month').addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });

            // Add event listeners for selecting a date
            container.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
                day.addEventListener('click', () => {
                    const selectedDate = new Date(day.dataset.date);
                    input.value = formatDate(selectedDate);
                    container.classList.remove('active');

                    if (!isCheckout) {
                        // Update check-out minimum date
                        const checkOut = document.getElementById('check-out');
                        if (parseCustomDate(checkOut.value) <= selectedDate) {
                            const nextDay = new Date(selectedDate);
                            nextDay.setDate(nextDay.getDate() + 1);
                            checkOut.value = formatDate(nextDay);
                        }
                    }
                });
            });
        }

        return renderCalendar;
    }

    function formatDate(date) {
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function parseCustomDate(dateStr) {
        const [day, month, year] = dateStr.split(' ');
        const monthIndex = months.indexOf(month);
        return new Date(year, monthIndex, parseInt(day));
    }

    // Initialize calendars
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');
    createCalendar('checkin-calendar', checkIn)();
    createCalendar('checkout-calendar', checkOut, true)();

    // Set default dates
    const today = new Date();
    checkIn.value = formatDate(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    checkOut.value = formatDate(tomorrow);

    // Show/hide calendars on input click
    checkIn.addEventListener('click', () => {
        document.getElementById('checkin-calendar').classList.toggle('active');
        document.getElementById('checkout-calendar').classList.remove('active');
    });

    checkOut.addEventListener('click', () => {
        document.getElementById('checkout-calendar').classList.toggle('active');
        document.getElementById('checkin-calendar').classList.remove('active');
    });

    // Close calendars when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.form-group')) {
            document.querySelectorAll('.calendar-dropdown').forEach(calendar => {
                calendar.classList.remove('active');
            });
        }
    });

    // Form submission handling
    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Search submitted');
    });
});
