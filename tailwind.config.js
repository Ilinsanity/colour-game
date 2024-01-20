/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluepaint: "url('/src/images/blue brush2.png')",
        mesh: "url('/src/images/meshes.png')",
        nund: "url('/src/images/fillSketch.png')",
      },
      colors: {
        gold: "#FFD700",
        blindcol: "#989898",
        c1: "#FF8A8A",
        c2: "#66FF4E",
        c3: "#98E6FF",
        c4: "#FF82EB",
        c5: "#FFA63E",
        c6: "#B78BFF",
      },
    },
  },
  plugins: [],
};
