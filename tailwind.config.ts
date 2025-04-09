import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // tambahin sesuai kebutuhan
    },
  },
  plugins: [
    require("tailwindcss-animate"), // ini penting untuk animasi shadcn
  ],
}
export default config
