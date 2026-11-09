/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          black: "#101311",
          navy: {
            DEFAULT: "#172B3A",
            hover: "#12222E",
            light: "#213D52",
            subtle: "#2C4A61",
          },
          green: {
            DEFAULT: "#347653",
            hover: "#2B6244",
            dark: "#1F4832",
            light: "#3E8D63",
            subtle: "#EAF3ED",
          },
          cream: {
            DEFAULT: "#F5F0E4",
            muted: "#EAE3D2",
            subtle: "#FAF8F2",
          },
          white: "#FFFFFF",
          sage: {
            DEFAULT: "#DDE9D9",
            text: "#2C4F3B",
            border: "#C8DCC4",
          },
          mist: {
            DEFAULT: "#E2E9E8",
            text: "#28444A",
            border: "#C6D8D7",
          },
          sand: {
            DEFAULT: "#EDE4D4",
            text: "#524430",
            border: "#DFCDB5",
          },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 19, 17, 0.04), 0 1px 2px -1px rgba(16, 19, 17, 0.04)',
        'card': '0 2px 6px -1px rgba(23, 43, 58, 0.05), 0 2px 4px -2px rgba(23, 43, 58, 0.05)',
        'card-hover': '0 8px 20px -3px rgba(23, 43, 58, 0.08), 0 4px 6px -4px rgba(23, 43, 58, 0.04)',
        'dropdown': '0 10px 25px -5px rgba(16, 19, 17, 0.1), 0 8px 10px -6px rgba(16, 19, 17, 0.05)',
      },
      borderRadius: {
        'card': '12px',
        'badge': '6px',
        'button': '8px',
      }
    },
  },
  plugins: [],
}
