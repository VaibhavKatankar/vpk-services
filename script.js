// ProTrade Service Website JavaScript

console.log("Website Loaded Successfully");

// Wait until page loads
document.addEventListener("DOMContentLoaded", function() {

    // Update navbar based on login status
    updateNavbarAuth();

    // Get Started Button
    const btn = document.querySelector(".btn");

    if (btn) {
        btn.addEventListener("click", function() {
            // Scroll to services section or show welcome message
            const services = document.querySelector(".services");
            if (services) {
                services.scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Welcome to ProTrade! Let's get started.");
            }
        });
    }

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

    // Navbar shadow when scrolling
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
            } else {
                navbar.style.boxShadow = "none";
            }
        }
    });

    // Form submissions
    const loginForm = document.querySelector(".login-container form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = loginForm.querySelector('input[type="text"]')?.value;
            const password = loginForm.querySelector('input[type="password"]')?.value;
            
            if (username && password) {
                // Simple validation
                if (username.length >= 3 && password.length >= 3) {
                    alert("Login Successful! Redirecting to dashboard...");
                    window.location.href = "profile.html";
                } else {
                    alert("Please enter valid credentials (min 3 characters)");
                }
            }
        });
    }

    // Booking form
    const bookingForm = document.querySelector(".form-container form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = bookingForm.querySelector('input[name="name"]')?.value;
            const service = bookingForm.querySelector('input[name="service"]')?.value || 
                           bookingForm.querySelector('select[name="service"]')?.value;
            const address = bookingForm.querySelector('input[name="address"]')?.value;

            if (name && service && address) {
                alert(`Thank you ${name}! Your ${service} booking request has been submitted. We will contact you shortly.`);
                bookingForm.reset();
            } else {
                alert("Please fill in all fields");
            }
        });
    }

    // Contact form
    const contactForm = document.querySelector(".contact-section form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Thank you for contacting us! We will get back to you soon.");
            contactForm.reset();
        });
    }

    // Category buttons
    const categoryBtns = document.querySelectorAll(".category-btn");
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            categoryBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Gallery image click
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            // Could implement lightbox here
            alert("Image preview coming soon!");
        });
    });

    // Admin sidebar navigation
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.style.color = "white");
            this.style.color = "#4d8dff";
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('button:contains("Logout")');
    if (logoutBtn || document.querySelector(".logout-btn")) {
        const btn = document.querySelector(".logout-btn") || logoutBtn;
        btn?.addEventListener("click", function() {
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "login.html";
            }
        });
    }

    // Order status buttons
    const acceptBtns = document.querySelectorAll(".accept");
    acceptBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const row = this.closest("tr");
            const status = row?.querySelector(".status");
            if (status) {
                status.className = "status completed";
                status.textContent = "Completed";
            }
            alert("Order accepted!");
        });
    });

    const rejectBtns = document.querySelectorAll(".reject");
    rejectBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            if (confirm("Are you sure you want to reject this order?")) {
                const row = this.closest("tr");
                const status = row?.querySelector(".status");
                if (status) {
                    status.className = "status cancelled";
                    status.textContent = "Cancelled";
                }
            }
        });
    });
});

// Smooth scroll for navbar links
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Book service function
function bookService(service) {
    // Store selected service in sessionStorage
    sessionStorage.setItem("selectedService", service);
    // Redirect to booking page
    window.location.href = "booking.html";
}

// Load selected service on booking page
function loadSelectedService() {
    const service = sessionStorage.getItem("selectedService");
    const serviceInput = document.querySelector('input[name="service"]');
    const serviceSelect = document.querySelector('select[name="service"]');
    
    if (service && serviceInput) {
        serviceInput.value = service;
    }
    if (service && serviceSelect) {
        serviceSelect.value = service;
    }
}

// Initialize on booking page
if (document.querySelector(".form-container")) {
    loadSelectedService();
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector("nav ul");
    if (nav) {
        nav.classList.toggle("mobile-active");
    }
}

// Search functionality
function searchServices(query) {
    const cards = document.querySelectorAll(".service-item, .card");
    const lowerQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Filter services by category
function filterByCategory(category) {
    const items = document.querySelectorAll(".service-item");
    
    items.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Show alert messages
function showAlert(message, type = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector(".container") || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Toggle between login and register
function toggleAuthMode(mode) {
    const container = document.querySelector(".login-container");
    if (!container) return;
    
    if (mode === "register") {
        container.innerHTML = `
            <h2>Create Account</h2>
            <input type="text" placeholder="Full Name" required>
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button onclick="handleRegister()">Register</button>
            <p class="register-link">Already have an account? <a href="#" onclick="toggleAuthMode('login')">Login</a></p>
        `;
    } else {
        container.innerHTML = `
            <h2>Login</h2>
            <input type="text" placeholder="Username" required>
            <input type="password" placeholder="Password" required>
            <button onclick="handleLogin()">Login</button>
            <p class="register-link">Don't have an account? <a href="#" onclick="toggleAuthMode('register')">Register</a></p>
        `;
    }
}

// Handle login
function handleLogin() {
    alert("Login Successful! Redirecting...");
    window.location.href = "profile.html";
}

// Handle register
function handleRegister() {
    alert("Registration Successful! Please login.");
    toggleAuthMode("login");
}

// Update profile
function updateProfile() {
    alert("Profile updated successfully!");
}

// Cancel booking
function cancelBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        alert(`Booking #${bookingId} has been cancelled.`);
        // Remove from UI
        const booking = document.querySelector(`[data-booking-id="${bookingId}"]`);
        if (booking) {
            booking.remove();
        }
    }
}

// Update navbar based on login status
function updateNavbarAuth() {
    const navAuth = document.getElementById('navAuth');
    if (!navAuth) return;
    
    const userData = sessionStorage.getItem('user');
    
    if (userData) {
        const user = JSON.parse(userData);
        if (user.type === 'admin') {
            navAuth.innerHTML = `
                <a href="admin.html" class="nav-profile-btn">
                    <i class="fa-solid fa-user-gear"></i> Admin
                </a>
            `;
        } else {
            navAuth.innerHTML = `
                <a href="profile.html" class="nav-profile-btn">
                    <i class="fa-solid fa-user"></i> Profile
                </a>
            `;
        }
    } else {
        navAuth.innerHTML = `
            <a href="login.html" class="nav-login-btn">
                <i class="fa-solid fa-sign-in-alt"></i> Login
            </a>
        `;
    }
}

