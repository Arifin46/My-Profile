/* ==========================================================================
   Ahasan Arefin — Personal Portfolio
   Small, dependency-free behaviours: theme toggle, mobile nav, scroll reveal,
   animated skill bars, contact form validation.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------- Theme toggle */
  var STORAGE_KEY = "arefin-theme";

  function applyTheme(theme) {
    document.body.classList.toggle("light", theme === "light");
    var btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "light" ? "🌙" : "☀️";
  }

  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") applyTheme(saved);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("#themeToggle");
    if (!btn) return;
    var next = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ------------------------------------------------ Active nav highlight */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var target = a.getAttribute("href").split("/").pop();
    if (target === here) a.classList.add("active");
  });

  /* --------------------------------------------- Reveal + skill bars */
  function reveal() {
    document.querySelectorAll(".card, .tl-item, .project").forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .5s ease, transform .5s ease";
    });
  }

  if ("IntersectionObserver" in window) {
    reveal();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = (i * 70) + "ms";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.querySelectorAll(".bar span[data-width]").forEach(function (bar) {
          bar.style.width = bar.dataset.width + "%";
        });
        io.unobserve(el);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".card, .tl-item, .project").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".bar span[data-width]").forEach(function (bar) {
      bar.style.width = bar.dataset.width + "%";
    });
  }

  /* --------------------------------------------------- Contact form */
  /*
   * The form posts to Formspree (https://formspree.io), a free form backend
   * for static sites. No API key or SMTP password ever appears in this file —
   * the endpoint in the form's action attribute is the only thing needed, and
   * that is safe to publish in a public repository.
   *
   *   >>> Replace YOUR_FORM_ID in contact.html with your real Formspree id. <<<
   *
   * Until that id is replaced the script falls back to opening the visitor's
   * email app, so the form is never a dead end.
   */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var submitBtn = form.querySelector("button[type=submit]");
    var sending = false; // guards against double clicks / duplicate sends

    /* SPAM TRAP: bots auto-fill every input; humans never see this one.
       If it is filled in, pretend the send worked and do nothing. */
    var trap = form.querySelector("[name=_gotcha]");

    /* Formspree endpoint, with the placeholder masked so it is not readable
       as plain text anywhere in the DOM. */
    var endpoint = (form.getAttribute("action") || "").split("YOUR_" +
      "FORM_ID").join("");
    var configured = endpoint.indexOf("formspree.io/f/") !== -1 && /f\/\S+/.test(endpoint);

    function say(message, isError) {
      if (!status) return;
      status.className = isError ? "note warn" : "note";
      status.textContent = message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (sending) return; // already in flight — ignore duplicate submits

      var name = form.querySelector("[name=name]");
      var email = form.querySelector("[name=email]");
      var subject = form.querySelector("[name=subject]");
      var message = form.querySelector("[name=message]");

      var nameVal = name.value.trim();
      var emailVal = email.value.trim();
      var subjectVal = subject.value.trim();
      var messageVal = message.value.trim();

      if (!nameVal || !emailVal || !messageVal) {
        say("Please fill in your name, email and message before sending.", true);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        say("That email address does not look right.", true);
        return;
      }

      /* Looks like a bot — report success and send nothing. */
      if (trap && trap.value) {
        form.reset();
        say("✓ Thank you! Your message has been sent.", false);
        return;
      }

      /* --- Not configured yet: hand the message to the visitor's mail app --- */
      if (!configured || location.protocol === "file:") {
        var to = form.dataset.fallbackMailto || "";
        var body = "Name: " + nameVal + "\nEmail: " + emailVal +
          (subjectVal ? "\nSubject: " + subjectVal : "") +
          "\n\n" + messageVal;
        window.location.href = "mailto:" + to +
          "?subject=" + encodeURIComponent(subjectVal || ("Portfolio message from " + nameVal)) +
          "&body=" + encodeURIComponent(body);
        say("Opening your email app so you can send this message…", false);
        return;
      }

      /* --- Send through Formspree (AJAX, so we stay on the page) --- */
      sending = true;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      say("Sending your message…", false);

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          if (response.ok) return response.json().catch(function () { return {}; });
          return response.json()
            .catch(function () { return {}; })
            .then(function (data) {
              var detail = data.errors
                ? data.errors.map(function (err) { return err.message; }).join(", ")
                : "Something went wrong. Please email me directly instead.";
              throw new Error(detail);
            });
        })
        .then(function () {
          form.reset();
          say("✓ Thank you! Your message has been sent — I'll reply within 24 hours.", false);
        })
        .catch(function (err) {
          say(err.message || "Message could not be sent. Please email 252-15-191@diu.edu.bd directly.", true);
        })
        .finally(function () {
          sending = false;
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send message →"; }
        });
    });
  }
})();
