/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white:'#FFFFFF',
      primaryColor: '#0A4D68',
      secondaryColor: '#088395',
      thirdColor: '#05BFDB',
      fourthColor: '#00FFCA',
      gradient1: '#051937',
      gradient2: '#004770',
      gradient3: '#007c9e',
      gradient4: '#00b4b7',
      gradient5: '#12ebba',
      image: 'linear-gradient(to right bottom, #051937, #004770, #007c9e, #00b4b7, #12ebba)'
      },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    
  ],
}

