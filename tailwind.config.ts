import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                login: "linear-gradient(180deg, rgba(96,165,250,1) 0%, rgba(37,99,235,1) 31%, rgba(30,64,175,1) 100%);",
                "none-image": "unset",
                "initial-notebook": "url('/home-background.jpg')",
            },
        },
    },
    plugins: [],
};
export default config;
