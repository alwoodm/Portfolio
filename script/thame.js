document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("theme-toggle");
  
    function toggleTheme() {
      const isDark = document.body.getAttribute("data-bs-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
  
      document.body.setAttribute("data-bs-theme", newTheme);
      themeToggleButton.textContent = newTheme === "dark" ? "🌞 Tryb jasny" : "🌙 Tryb ciemny";
      localStorage.setItem("theme", newTheme);
    }
  
    // Sprawdza zapisany motyw lub domyślnie ustawia jasny
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-bs-theme", savedTheme);
    themeToggleButton.textContent = savedTheme === "dark" ? "🌞 Tryb jasny" : "🌙 Tryb ciemny";
  
    themeToggleButton.addEventListener("click", toggleTheme);
  });
  