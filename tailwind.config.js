/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    green: {
                        light: '#E7F5ED',
                        DEFAULT: '#194025', // Deep Green
                        dark: '#0D2B18',
                    },
                    dark: {
                        DEFAULT: '#0F172A',
                        soft: '#1e293b',
                    },
                    dustGold: {
                        light: '#FDFCFB',
                        DEFAULT: '#FAF7F2', // Light Dust
                        dark: '#A6864A',
                    },
                    light: '#F8FAFC',
                    teal: '#2ECC71', // Keeping a lighter green as teal for accents
                    slate: {
                        50: '#f8fafc',
                        100: '#f1f5f9',
                        200: '#e2e8f0',
                        300: '#cbd5e1',
                        400: '#94a3b8',
                        500: '#64748b',
                        600: '#475569',
                        700: '#334155',
                        800: '#1e293b',
                        900: '#0f172a',
                    },
                },
            },
            boxShadow: {
                'fintech': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
            },
            borderRadius: {
                'button': '0.625rem',
                'card': '1rem',
            }
        },
    },
    plugins: [],
}
