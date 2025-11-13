/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Base colors
                blue: "var(--blue)",
                "hov-blue": "var(--hov-blue)",
                "soft-blue": "var(--soft-blue)",

                primary: "var(--primary)",
                "hov-primary": "var(--hov-primary)",
                "soft-primary": "var(--soft-primary)",

                "secondary-base": "var(--secondary-base)",
                "hov-secondary-base": "var(--hov-secondary-base)",
                secondary: "var(--secondary)",
                "soft-secondary-base": "var(--soft-secondary-base)",
                "soft-secondary": "var(--soft-secondary)",

                gray: "var(--gray)",
                "gray-light": "var(--gray-light)",
                "gray-dark": "var(--gray-dark)",
                "gray-extra-dark": "var(--gray-extra-dark)",

                success: "var(--success)",
                "soft-success": "var(--soft-success)",

                warning: "var(--warning)",
                "soft-warning": "var(--soft-warning)",

                light: "var(--light)",
                "soft-light": "var(--soft-light)",
                "soft-white": "var(--soft-white)",

                dark: "var(--dark)",
                "soft-dark": "var(--soft-dark)",

                muted: "var(--muted)",
                "soft-peach": "var(--soft-peach)",
                "peach": "var(--peach)",
                "peach-light": "var(--peach-light)",
                "product-card": "var(--product-card)",

                "initial-avtar": "var(--initial-avtar)",
            },
            fontFamily: {
                sans: [
                    '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
                    '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif',
                    '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"',
                ],
                mono: [
                    'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas',
                    '"Liberation Mono"', '"Courier New"', 'monospace',
                ],
            },
            keyframes: {
                "shadow-blink": {
                    "0%": {
                        boxShadow: "0 0 0 0 rgba(103, 25, 69, 0.4)",
                    },
                    "100%": {
                        boxShadow: "0 0 0 16px rgba(103, 25, 69, 0.3)",
                    }
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                "shadow-blink": "shadow-blink 1.5s infinite ease-in-out",
                fadeIn: "fadeIn 0.2s ease-in",
            },
            fontSize: {
                "md": "18px"
            }
        },
    },
    plugins: [],
}