/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
			colors : {
				red : "#00ff00",
				hierarchy : {
					s : 'var(--hierarchy-s)',
					0 : 'var(--hierarchy-0)',
					1 : 'var(--hierarchy-1)',
					2 : 'var(--hierarchy-2)',
					3 : 'var(--hierarchy-3)',
				},
				panel : 'var(--panel-color)',
			},
		},
  },
  plugins: [],
}