document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const captchaElement = document.getElementById("captcha");

  if (!themeToggleButton) {
    console.error("Element with ID 'theme-toggle' not found.");
    return;
  }

  if (!captchaElement) {
    console.error("Element with ID 'captcha' not found.");
    return;
  }

  function toggleTheme() {
    const isDark = document.body.getAttribute("data-bs-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    document.body.setAttribute("data-bs-theme", newTheme);
    themeToggleButton.textContent = newTheme === "dark" ? "🌞 Tryb jasny" : "🌙 Tryb ciemny";
    localStorage.setItem("theme", newTheme);

    // Update captcha element's data-theme attribute and background color
    captchaElement.setAttribute("data-theme", newTheme);
    captchaElement.style.backgroundColor = newTheme === "dark" ? "#222529" : "#ffffff";
    location.reload();
  }

  // Sprawdza zapisany motyw lub domyślnie ustawia jasny
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-bs-theme", savedTheme);
  themeToggleButton.textContent = savedTheme === "dark" ? "🌞 Tryb jasny" : "🌙 Tryb ciemny";

  // Set initial captcha element's data-theme attribute and background color
  captchaElement.setAttribute("data-theme", savedTheme);
  captchaElement.style.backgroundColor = savedTheme === "dark" ? "#222529" : "#ffffff";

  themeToggleButton.addEventListener("click", toggleTheme);
});