/* =========================================================
   script.js
   Task 2 - Dynamic Web Experience

   This file adds interactivity on top of the existing site.
   It is kept separate from js/main.js (which already handles
   the modals, filters and gallery) so it's clear what was
   built for this task specifically.

   Features in this file:
   1. Dark / Light mode toggle (saved in localStorage)
   2. Scroll to top button
   3. Toast notification helper (used by the other features)
   4. Real-time form validation for the contact and login forms
   ========================================================= */


// Wait for the whole page to load before touching the DOM.
// This is the standard way to make sure every element we
// look for with getElementById actually exists yet.
document.addEventListener("DOMContentLoaded", function () {

    setupThemeToggle();
    setupScrollTopButton();
    setupContactFormValidation();
    setupLoginFormValidation();

});


/* =========================================================
   1. DARK / LIGHT MODE TOGGLE
   ========================================================= */
function setupThemeToggle() {

    // grab the button from the nav bar
    var toggleBtn = document.getElementById("theme-toggle-btn");

    // if a page does not have the button for some reason, stop here
    // instead of throwing an error further down
    if (toggleBtn === null) {
        return;
    }

    var toggleIcon = document.getElementById("theme-toggle-icon");

    // Check localStorage for a saved preference from a previous visit.
    // localStorage only stores strings, so we saved "dark" or "light" as text.
    var savedTheme = localStorage.getItem("site-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggleIcon.textContent = "☀️";
    } else {
        // default to light mode if nothing was saved yet
        toggleIcon.textContent = "🌙";
    }

    // Now listen for clicks on the button.
    toggleBtn.addEventListener("click", function () {

        // classList.toggle() adds the class if it's missing and
        // removes it if it's already there, and it also tells us
        // which of the two just happened (true = class was added)
        var isDarkNow = document.body.classList.toggle("dark-mode");

        if (isDarkNow) {
            toggleIcon.textContent = "☀️";
            localStorage.setItem("site-theme", "dark");
            showToast("Dark mode turned on");
        } else {
            toggleIcon.textContent = "🌙";
            localStorage.setItem("site-theme", "light");
            showToast("Light mode turned on");
        }

    });
}


/* =========================================================
   2. SCROLL TO TOP BUTTON
   Built with createElement instead of hard-coding it into every
   HTML file, so it only had to be written once here.
   ========================================================= */
function setupScrollTopButton() {

    var scrollBtn = document.createElement("button");
    scrollBtn.setAttribute("id", "scroll-top-btn");
    scrollBtn.setAttribute("type", "button");
    scrollBtn.setAttribute("aria-label", "Scroll back to top");
    scrollBtn.textContent = "↑";

    // add the new button to the end of the page
    document.body.appendChild(scrollBtn);

    // show the button only after the user has scrolled down a bit
    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            scrollBtn.classList.add("is-visible");
        } else {
            scrollBtn.classList.remove("is-visible");
        }
    });

    // clicking it scrolls smoothly back to the top of the page
    scrollBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   3. TOAST NOTIFICATION HELPER
   A small reusable function so any other part of the script
   can pop up a short message without repeating this code.
   ========================================================= */
function showToast(message) {

    // the container only needs to be created once, so check
    // if it already exists before making a new one
    var container = document.getElementById("toast-container");

    if (container === null) {
        container = document.createElement("div");
        container.setAttribute("id", "toast-container");
        document.body.appendChild(container);
    }

    var toast = document.createElement("div");
    toast.classList.add("toast-message");
    toast.textContent = message;
    container.appendChild(toast);

    // adding the "show" class one tick after creating it lets the
    // CSS transition actually run (otherwise it would just appear
    // instantly with no fade-in)
    setTimeout(function () {
        toast.classList.add("show");
    }, 50);

    // after a few seconds, fade it out and then remove it from the
    // page completely so old toasts don't pile up in the HTML
    setTimeout(function () {
        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300); // matches the CSS transition time

    }, 3000);
}


/* =========================================================
   4. FORM VALIDATION
   Same basic pattern for both forms:
     - check each field as the user types (the "input" event)
     - do a final full check when the form is submitted
     - stop the submit if anything is invalid
   ========================================================= */

function setupContactFormValidation() {

    var form = document.getElementById("contact-form");

    if (form === null) {
        return;
    }

    var nameField = document.getElementById("contact-name");
    var emailField = document.getElementById("contact-email");
    var topicField = document.getElementById("contact-topic");
    var messageField = document.getElementById("contact-message");

    // check a field every time the user types in it
    nameField.addEventListener("input", function () {
        validateRequiredField(nameField, "Please enter your name.");
    });

    emailField.addEventListener("input", function () {
        validateEmailField(emailField);
    });

    messageField.addEventListener("input", function () {
        validateRequiredField(messageField, "Please write a short message.");
    });

    // final check when the form is actually submitted
    form.addEventListener("submit", function (event) {

        var nameOk = validateRequiredField(nameField, "Please enter your name.");
        var emailOk = validateEmailField(emailField);
        var topicOk = validateRequiredField(topicField, "Please choose a topic.");
        var messageOk = validateRequiredField(messageField, "Please write a short message.");

        // if any single check failed, block the form from submitting
        if (!nameOk || !emailOk || !topicOk || !messageOk) {
            event.preventDefault();
            showToast("Please fix the highlighted fields.");
        }
    });
}


function setupLoginFormValidation() {

    var form = document.getElementById("login-form");

    if (form === null) {
        return;
    }

    var emailField = document.getElementById("login-email");
    var passwordField = document.getElementById("login-password");

    emailField.addEventListener("input", function () {
        validateEmailField(emailField);
    });

    passwordField.addEventListener("input", function () {
        validateRequiredField(passwordField, "Please enter your password.");
    });

    form.addEventListener("submit", function (event) {

        var emailOk = validateEmailField(emailField);
        var passwordOk = validateRequiredField(passwordField, "Please enter your password.");

        if (!emailOk || !passwordOk) {
            event.preventDefault();
            showToast("Please fix the highlighted fields.");
        }
    });
}


// ---- shared helper functions used by both forms above ----

// checks that a field is not empty, shows/removes an error message
// underneath it, and returns true or false so the submit handler
// knows whether the whole form is allowed to go through
function validateRequiredField(field, errorMessage) {

    var value = field.value.trim();

    if (value === "") {
        showFieldError(field, errorMessage);
        return false;
    }

    clearFieldError(field);
    return true;
}

// same idea as above, but also checks the value looks like a
// real email address using a simple regular expression
function validateEmailField(field) {

    var value = field.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showFieldError(field, "Please enter your email address.");
        return false;
    }

    if (!emailPattern.test(value)) {
        showFieldError(field, "Please enter a valid email address (like name@example.com).");
        return false;
    }

    clearFieldError(field);
    return true;
}

// adds a red outline to the field and creates (or reuses) a small
// error message right underneath it
function showFieldError(field, message) {

    field.classList.add("input-invalid");

    // the error span goes right after the input, inside the same
    // .form-node wrapper div that already exists in the HTML
    var wrapper = field.parentElement;
    var errorEl = wrapper.querySelector(".field-error");

    if (errorEl === null) {
        errorEl = document.createElement("small");
        errorEl.classList.add("field-error");
        wrapper.appendChild(errorEl);
    }

    errorEl.textContent = message;
}

// removes the red outline and error message once a field becomes valid
function clearFieldError(field) {

    field.classList.remove("input-invalid");

    var wrapper = field.parentElement;
    var errorEl = wrapper.querySelector(".field-error");

    if (errorEl !== null) {
        errorEl.remove();
    }
}