import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        black: "#292929",
        white: "#FFFFFF",
        textLight: "#eff5ff",
        primary: {
          green: "#6fd64a",
          greenBold: "#0d2706",
          greenMedium: "#6fd64a",
          greenDark: "#b8ff44",
          purpleMedium: "#885bab",
          red: "#bf1818",
          redBold: "#671213",
          yellow: "#fbff44",
          yellowBold: "#4c4d0b",
          orange: "#ff7c44",
          orangeBold: "#441c0b",
        },
        dark: {
          darkMain: "#0f001b",
          darkMedium: "#140321",
          darkLight: "#272238",
        },
        error: {
          50: "#FFF1F1",
          100: "#FFE0E0",
          200: "#FFC5C5",
          300: "#FF9D9D",
          400: "#FF6665",
          500: "#FE3635",
          600: "#DB1312",
          700: "#C70F0E",
          800: "#A41110",
          900: "#881514",
          950: "#4A0505",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #0f001b, #1c0330)",
        "toright-gradient": "linear-gradient(to right, #0f001b, #1c0330)",
        "deploy-card-gradient": "linear-gradient(to bottom, #0f001b, #1c0330)",
        "red-gradient": "linear-gradient(to right, #671213, #13011a)",
        "yellow-gradient": "linear-gradient(to right, #4c4d0b, #0f001b)",
        "orange-gradient": "linear-gradient(to right, #441b0b, #0f001b)",
        "green-gradient": "linear-gradient(to right, #0e2704, #0f001b)",
        "progress-gradient":
          "linear-gradient(to right, #FF7A7A,  #FFF179, #7EFF8B)",
        "progress-gradient-low": "linear-gradient(to right, #FF7A7A,  #FFF179)",
        "progress-transparetn-gradient":
          "linear-gradient(to right, #ff7a7a47,  #fff17947, #7eff8b4f)",
      },
    },
  },
  plugins: [],
};

export default config;
