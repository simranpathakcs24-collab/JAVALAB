/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    colors: {
      primary: "#2563eb",
      secondary: "#1e293b",
    },
    boxShadow: {
      soft: "0 4px 12px rgba(0,0,0,0.08)",
    }
  }
},
  plugins: [],
};

