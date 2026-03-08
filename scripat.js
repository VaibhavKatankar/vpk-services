console.log("Website Loaded Successfully");
console.log("Website Loaded");

document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mouseover", () => {

            card.style.background = "#334155"

        })

    }) // Wait until page loads
document.addEventListener("DOMContentLoaded", function() {

    // Get Started Button
    const btn = document.querySelector(".btn");

    btn.addEventListener("click", function() {
        alert("Welcome to ProTrade! Let's get started.");
    });


    // Card hover effect animation
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-12px) scale(1.03)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });

    });


    // Smooth scroll for navbar links
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const section = document.querySelector(this.getAttribute("href"));

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // Navbar shadow when scrolling
    window.addEventListener("scroll", function() {

        const navbar = document.querySelector(".navbar");

        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        } else {
            navbar.style.boxShadow = "none";
        }

    });

});

function scrollServices() {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    })

}

function bookService(service) {

    alert(service + " Service Booked Successfully!")

}