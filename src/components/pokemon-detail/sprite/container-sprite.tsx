import { useState } from 'react';
import { PresentationalSprite } from './presentational-sprite';

export interface ContainerSpriteProps {
	label: string;
	url?: string;
}
export const ContainerSprite = ({ label, url }: ContainerSpriteProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const onImageLoaded = () => {
		setIsLoaded(true);
	};
	return <PresentationalSprite url={url} label={label} isLoaded={isLoaded} onImageLoadedHandler={onImageLoaded} />;
};
