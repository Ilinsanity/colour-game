/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluepaint: "url('/src/images/Vector(1).png')",
        mesh: "url('/src/images/Group 18(4).png')",
        nund: "url('/src/images/fillSketch.png')",
        arrow: "url('/src/images/arrow.png')",
        gb: "url('/src/images/GB.png')",
        home: "url('/src/images/home-sketch 1.png')",
        linescore: "url('/src/images/linescore.png')",
        gamebrush: "url('/src/images/Group 16(1).png')",
        gameoverbrush: "url('/src/images/Group 17(1).png')",
        submitbutton: "url('/src/images/Group 12.svg')",
        namebox: "url('/src/images/Rectangle 14(1).png')"
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
        score: "#A7FF7D",
        gameovercont: "#395698",
        lb: "#85CCFF", 
      },
    },
  },
  plugins: [],
};
