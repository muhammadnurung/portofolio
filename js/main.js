// Inisialisasi AOS
AOS.init({
  duration: 500,
  easing: "ease-in-out",
  once: false,
});

// Toggle menu navbar di layar kecil
document.getElementById("menu-button").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

const textArray = ["Web Developer", "Graphic Designer"];
const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = textArray[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typingText.innerHTML = currentText;

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 120);
    } else {
      isDeleting = true;
      setTimeout(type, 1500);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 60);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  const content = modal.querySelector("div");

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  setTimeout(() => {
    content.classList.remove("opacity-0", "scale-95");
    content.classList.add("opacity-100", "scale-100");
  }, 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  const content = modal.querySelector("div");

  content.classList.remove("opacity-100", "scale-100");
  content.classList.add("opacity-0", "scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }, 300);
}

//contact me
console.log("🔍 main.js dimuat!");

document.addEventListener("DOMContentLoaded", function () {
  console.log("🔍 DOM Ready!");

  // Jalankan animasi efek ketik
  type();

  // Feather icons
  feather.replace();

  // Inisialisasi EmailJS
  function initEmailJS() {
    if (typeof emailjs === "undefined") {
      console.log("⏳ Menunggu EmailJS...");
      setTimeout(initEmailJS, 100);
      return;
    }

    console.log("✅ EmailJS tersedia");

    try {
      emailjs.init("U9noyo27efiXAnJ3m");
      console.log("✅ EmailJS diinit");
    } catch (err) {
      console.error("❌ Error init EmailJS:", err);
      return;
    }

    setupFormHandler();
  }

  // Auto hide messages
  function autoHideMessage() {
    setTimeout(() => {
      const successMsg = document.getElementById("success-msg");
      const errorMsg = document.getElementById("error-msg");

      [successMsg, errorMsg].forEach((msg) => {
        if (msg && !msg.classList.contains("hidden")) {
          msg.classList.add("fade-out");
          setTimeout(() => {
            msg.classList.add("hidden");
            msg.classList.remove("fade-out");
          }, 500); // waktu yang sama dengan CSS transition
        }
      });
    }, 5000); // tampil selama 5 detik
  }

  // Form handler
  function setupFormHandler() {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("success-msg");
    const errorMsg = document.getElementById("error-msg");

    if (!form) {
      console.error("❌ Form 'contact-form' tidak ditemukan!");
      return;
    }

    if (!successMsg || !errorMsg) {
      console.error("❌ Elemen pesan sukses/error tidak ditemukan!");
      return;
    }

    console.log("✅ Semua elemen form ditemukan");

    form.addEventListener("submit", function (e) {
      console.log("📤 Mengirim form...");

      e.preventDefault();
      e.stopPropagation();

      successMsg.classList.add("hidden");
      errorMsg.classList.add("hidden");

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
      }

      emailjs
        .sendForm("service_4hh0dvs", "template_pjynx4d", form)
        .then(function (response) {
          console.log("✅ SUCCESS!", response.status, response.text);
          successMsg.classList.remove("hidden");
          form.reset();
          autoHideMessage();
        })
        .catch(function (error) {
          console.error("❌ ERROR:", error);
          errorMsg.classList.remove("hidden");
          autoHideMessage();
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            console.log("🔁 Tombol reset");
          }
        });
    });

    console.log("✅ Handler form terpasang");
  }

  initEmailJS();
});

//icons
feather.replace();
