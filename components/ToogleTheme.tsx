// components/ThemeToggle.tsx
import { GearIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			setTheme('dark');
		} else {
			document.documentElement.classList.remove('dark');
			setTheme('light');
		}
	}, []);

	const toggleTheme = () => {
		if (theme === 'dark') {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
			setTheme('light');
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			setTheme('dark');
		}
	};

	return (
		<button onClick={toggleTheme}>
			<GearIcon />
		</button>
	);
};

export default ThemeToggle;
