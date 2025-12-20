/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',      /* Electric Blue */
                secondary: '#8B5CF6',    /* Cyber Purple */
                accent: '#14B8A6',       /* Neon Teal */
                danger: '#FF6B6B',       /* Coral */
                dark: '#0F172A',         /* Deep Navy */
                glass: 'rgba(255,255,255,0.1)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
                }
            }
        },
    },
    plugins: [],
}
