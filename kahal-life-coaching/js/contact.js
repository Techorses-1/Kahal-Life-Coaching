// ================= MOBILE NAVBAR MENU TOGGLE =================
document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                mobileMenu.style.display = 'block';
                setTimeout(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                }, 10);
            } else {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            }
        });
    }

    // ================= SET ACTIVE CLASS FOR NAVBAR =================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        let currentPage = currentPath.split('/').pop();

        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }

        const desktopLinks = document.querySelectorAll('.navbar-links .nav-link');
        const mobileLinks = document.querySelectorAll('.mobile-menu .mobile-nav-link');

        desktopLinks.forEach(link => link.classList.remove('active'));
        mobileLinks.forEach(link => link.classList.remove('active'));

        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            let hrefPage = href.split('/').pop();
            if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';

            if (hrefPage === currentPage) {
                link.classList.add('active');
            }
        });

        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            let hrefPage = href.split('/').pop();
            if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';

            if (hrefPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // ================= SET ACTIVE CLASS FOR FOOTER LINKS =================
    function setActiveFooterLink() {
        const currentPath = window.location.pathname;
        let currentPage = currentPath.split('/').pop();

        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }

        const footerLinks = document.querySelectorAll('.footer-links .footer-nav-link');

        footerLinks.forEach(link => link.classList.remove('active'));

        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            let hrefPage = href.split('/').pop();
            if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';

            if (hrefPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Run both functions
    setActiveNavLink();
    setActiveFooterLink();

}); // End of DOMContentLoaded








/* =============================================
   CONTACT FORM JS — contact-form.js
   Add BEFORE </body>: <script src="js/contact.js"></script>
   ============================================= */

// ========== TOAST FUNCTION ==========
function showToast(message, type = "success") {
    // Remove existing toast if any
    const existingToast = document.querySelector(".cf-toast");
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `cf-toast cf-toast-${type}`;

    // Icon based on type
    let icon = '<i class="fas fa-check-circle"></i>';
    if (type === "error") icon = '<i class="fas fa-exclamation-circle"></i>';
    if (type === "warning") icon = '<i class="fas fa-clock"></i>';

    toast.innerHTML = `
        <div class="cf-toast-content">
            ${icon}
            <span>${message}</span>
        </div>
        <div class="cf-toast-progress"></div>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add("cf-toast-show");
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove("cf-toast-show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ========== MAIN SUBMIT FUNCTION ==========
async function cfHandleSubmit() {
    const btn = document.getElementById("cfSubmitBtn");
    const btnText = document.getElementById("cfBtnText");
    const btnIcon = document.getElementById("cfBtnIcon");
    const successMsg = document.getElementById("cfSuccess");

    // ---- Fields ----
    const fname = document.getElementById("cf-fname");
    const email = document.getElementById("cf-email");
    const brings = document.getElementById("cf-brings");
    const stuck = document.getElementById("cf-stuck");
    const interest = document.getElementById("cf-interest");
    const different = document.getElementById("cf-diff");

    let valid = true;

    // ---- Helper ----
    function setErr(id, msg, field) {
        const el = document.getElementById(id);
        el.textContent = msg;
        if (msg) {
            el.classList.add("visible");
            field.classList.add("cf-error-field");
            valid = false;
        } else {
            el.classList.remove("visible");
            field.classList.remove("cf-error-field");
        }
    }

    // ---- Clear all errors first ----
    setErr("err-fname", "", fname);
    setErr("err-email", "", email);
    setErr("err-brings", "", brings);
    setErr("err-stuck", "", stuck);
    setErr("err-interest", "", interest);

    // ---- Validate ----
    if (!fname.value.trim()) {
        setErr("err-fname", "First name is required.", fname);
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        setErr("err-email", "Email address is required.", email);
    } else if (!emailReg.test(email.value.trim())) {
        setErr("err-email", "Please enter a valid email address.", email);
    }

    if (!brings.value.trim()) {
        setErr("err-brings", "Please tell us what brings you here.", brings);
    }

    if (!stuck.value.trim()) {
        setErr("err-stuck", "Please share where you're feeling stuck.", stuck);
    }

    if (!interest.value) {
        setErr("err-interest", "Please select an option.", interest);
    }

    if (!valid) return;

    // ---- Disable button & show loading ----
    btn.disabled = true;
    btn.classList.add("loading");
    btnText.textContent = "SENDING…";
    btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const response = await fetch("https://kahallifecoaching.com/api/contact/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: fname.value.trim(),
                email: email.value.trim(),
                bringsYouHere: brings.value.trim(),
                stuck: stuck.value.trim(),
                interest: interest.value,
                different: different.value.trim() || ""
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // ---- SUCCESS ----
            showToast("Thank you! We'll be in touch soon.", "success");

            // Hide button, show success message
            btn.style.display = "none";
            successMsg.style.display = "flex";

            // Clear form fields
            fname.value = "";
            email.value = "";
            brings.value = "";
            stuck.value = "";
            interest.value = "";
            different.value = "";
        } else if (response.status === 429) {
            // ---- 48-HOUR ERROR ----
            showToast("You have already submitted within the last 48 hours. Please wait.", "warning");

            // Reset button
            btn.disabled = false;
            btn.classList.remove("loading");
            btnText.textContent = "SUBMIT";
            btnIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';
        } else {
            // ---- SERVER ERROR ----
            showToast("Something went wrong. Try again later.", "error");

            // Reset button
            btn.disabled = false;
            btn.classList.remove("loading");
            btnText.textContent = "SUBMIT";
            btnIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';
        }
    } catch (error) {
        console.error("Fetch error:", error);
        // ---- NETWORK ERROR ----
        showToast("Network error. Check your connection.", "error");

        // Reset button
        btn.disabled = false;
        btn.classList.remove("loading");
        btnText.textContent = "SUBMIT";
        btnIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';
    }
}

// ---- Live validation: clear error on input ----
document.addEventListener("DOMContentLoaded", function () {
    const liveFields = [
        { id: "cf-fname", errId: "err-fname" },
        { id: "cf-email", errId: "err-email" },
        { id: "cf-brings", errId: "err-brings" },
        { id: "cf-stuck", errId: "err-stuck" },
        { id: "cf-interest", errId: "err-interest" },
    ];

    liveFields.forEach(({ id, errId }) => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener("input", function () {
            document.getElementById(errId).classList.remove("visible");
            document.getElementById(errId).textContent = "";
            field.classList.remove("cf-error-field");
        });
        field.addEventListener("change", function () {
            document.getElementById(errId).classList.remove("visible");
            document.getElementById(errId).textContent = "";
            field.classList.remove("cf-error-field");
        });
    });
});


/* =============================================
   FAQ JS — faq.js
   Add BEFORE </body>: <script src="js/faq.js"></script>
   ============================================= */

function faqToggle(btn) {
    const item = btn.closest(".faq__item");
    const isActive = item.classList.contains("active");

    // Close ALL other open items across entire grid
    document.querySelectorAll(".faq__item.active").forEach(function (el) {
        if (el !== item) {
            el.classList.remove("active");
        }
    });

    // Toggle clicked item
    item.classList.toggle("active", !isActive);
}