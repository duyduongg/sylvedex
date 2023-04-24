import { useEffect, useState } from 'react';

export const useOnMountTransition = (isMounted: boolean, unMountDelay: number) => {
	const [hasTransitionIn, setHasTransitionIn] = useState(false);
	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		if (isMounted && !hasTransitionIn) {
			setHasTransitionIn(true);
		} else if (!isMounted && hasTransitionIn) {
			timeoutId = setTimeout(() => setHasTransitionIn(false), unMountDelay);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [unMountDelay, isMounted, hasTransitionIn]);
	return hasTransitionIn;
};
