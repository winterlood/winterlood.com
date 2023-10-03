const themeInitializer = `
const theme = localStorage.getItem("theme");
if (theme) {
  document.documentElement.setAttribute("data-theme", theme);
} else {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}
  `;

export default themeInitializer;
