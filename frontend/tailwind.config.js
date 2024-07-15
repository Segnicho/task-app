/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "btn-bg" : "#F57D9F",
        "primary-bg": "#17181F",
        "secondary-bg":'#20212C',
        'primary-text': '#ffffff',

      },
    },
  },
  plugins: [],
};
