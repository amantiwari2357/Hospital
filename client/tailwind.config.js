/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
        "src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#6366F1',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
                info: '#06B6D4',
            }
        },
    },
    plugins: [],
}
