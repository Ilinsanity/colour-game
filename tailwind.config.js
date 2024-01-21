/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluepaint: "url('/src/images/Vector(1).png')",
        mesh: "url('/src/images/meshes.png')",
        nund: "url('/src/images/fillSketch.png')",
        arrow: "url('/src/images/arrow.png')",
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
        sg: "#C2FFC0",
        timed: "#FF7979",
        ldbd: "#86CCFF",
      },
    },
  },
  plugins: [],
};
