import { useLayoutEffect, useState } from 'react';

const getWidth = () =>
	window.innerWidth && document.documentElement.clientWidth
		? Math.min(window.innerWidth, document.documentElement.clientWidth)
		: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const useSiblingCount = (initWidth: number) => {
	const [siblingCount, setSiblingCount] = useState(initWidth);
	const handlerFunc = () => {
		const currentWidth = getWidth();
		if (currentWidth <= 1280) {
			setSiblingCount(initWidth - 3);
		} else if (currentWidth > 1280 && currentWidth <= 1480) {
			setSiblingCount(initWidth - 2);
		} else if (currentWidth > 1480 && currentWidth <= 1720) {
			setSiblingCount(initWidth - 1);
		}
	};
	useLayoutEffect(() => {
		window.addEventListener('resize', handlerFunc);
		return () => {
			window.removeEventListener('resize', handlerFunc);
		};
	}, []);
	return siblingCount;
};
