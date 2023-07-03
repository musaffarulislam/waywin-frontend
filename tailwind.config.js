/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_dark : "#050a19",
        secondary_dark : "#032046",
        primary_light : "#F0FCFF",
        secondary_light : "#C4CCEE",
        // secondary_light : "#ffc0c0",
        trainer_dark : "#120202",
        secondaryTrainer_dark : "#4F0303",
        admin_dark : "#001019",
        secondaryAdmin_dark : "#012232"
      }
    },
  },
  plugins: [],
}