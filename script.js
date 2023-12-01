document.addEventListener('DOMContentLoaded', function () {
    // Get the container element that wraps the navigation menu
    var navContainer = document.querySelector('nav');

    // Add a click event listener to the container
    navContainer.addEventListener('click', function (event) {
        // Check if the clicked element is an anchor (a) within an li
        if (event.target.tagName === 'A' && event.target.parentElement.tagName === 'LI') {
            // Remove the "active" class from all the list items
            var navItems = navContainer.querySelectorAll('li');
            navItems.forEach(function (item) {
                item.classList.remove('active');
            });

            // Add the "active" class to the clicked list item
            event.target.parentElement.classList.add('active');
        }
    });
});



const animateUpElements = document.querySelectorAll('.animate-up');
const animateLeftElements = document.querySelectorAll('.animate-left');
const animateRightElements = document.querySelectorAll('.animate-right');

// Call toggleAnimation() once immediately after page load
document.addEventListener('DOMContentLoaded', () => {
    toggleAnimation('animate-up', animateUpElements);
    toggleAnimation('animate-left', animateLeftElements);
    toggleAnimation('animate-right', animateRightElements);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
});

window.addEventListener('scroll', () => {
    toggleAnimation('animate-up', animateUpElements);
    toggleAnimation('animate-left', animateLeftElements);
    toggleAnimation('animate-right', animateRightElements);
});


function toggleAnimation(animationClass, targetElements) {
    targetElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight - 100 && elementBottom >= 0) {
            element.classList.remove(animationClass);
            element.classList.add('reset');
        } else if (element.classList.contains('reset')) {
            element.classList.remove('reset');
        } else {
            element.classList.add(animationClass);
            element.classList.remove('reset');
        }
    });
}


window.addEventListener('load', function () {
    var loadingContainer = document.querySelector('#loading-container');
    var duration = 300; // Set the duration in milliseconds (e.g., 3500 = 3.5 seconds)
    var fadeOutDuration = 500; // Set the fade out duration in milliseconds (e.g., 500 = 0.5 seconds)
    var body = document.querySelector('body')
    setTimeout(function () {
        loadingContainer.style.opacity = '0';

        body.style.overflowY = 'visible'
        setTimeout(function () {
            loadingContainer.style.display = 'none';
        }, fadeOutDuration);
    }, duration);
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menuList = document.querySelector('.menu-list');

    menuIcon.addEventListener('click', () => {
        menuList.classList.toggle('open');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const specialistsContainer = document.querySelector('.swiper-wrapper');

    // Fetch the data from the specialists.json file
    fetch('specialists.json')
        .then((response) => response.json())
        .then((data) => {
            // Loop through the data and create HTML elements for each specialist
            data.forEach((specialist) => {
                const specialistDiv = document.createElement('div');
                specialistDiv.classList.add('swiper-slide');

                specialistDiv.innerHTML = `
                    <div class="image">
                        <img src="${specialist.imageSrc}" alt="">
                    </div>
                    <div class="text">
                        <h3 class="name">${specialist.name}</h3>
                        <p class="specialization">${specialist.specialization}</p>
                        <p class="brief">${specialist.brief}</p>
                    </div>
                `;

                specialistsContainer.appendChild(specialistDiv);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});





document.getElementById("message-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var subjectError = document.getElementById("subject-error");
    var messageError = document.getElementById("message-error");
    var successMessage = document.getElementById("success-message");
    var errorMessage = document.getElementById("error-message");

    nameError.textContent = name === "" ? "Name is required." : "";
    emailError.textContent = email === "" ? "Email is required." : "";
    subjectError.textContent = subject === "" ? "Subject is required." : "";
    messageError.textContent = message === "" ? "Message is required." : "";

    if (name === "" || email === "" || subject === "" || message === "") {
        return; // Exit the function if there are validation errors
    }

    // Configure your EmailJS settings
    emailjs.init("w2Mz_h4uxP9lUf0lW");

    // Prepare the email parameters
    var emailParams = {
        to_email: "artqalaa@gmail.com", // Replace with your email
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    // Send the email using EmailJS
    emailjs.send("service_ld04ftc", "template_94zrpyd", emailParams)
        .then(function (response) {
            successMessage.textContent = "Message sent successfully!";
            // Optionally, you can reset the form here
        }, function (error) {
            errorMessage.textContent = "An error occurred. Please try again later.";
        });
});
