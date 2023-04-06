import { CSSProperties } from 'react';
import { MoonLoader } from 'react-spinners';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red'
};

export const Spinner = () => {
	return <MoonLoader color="#3c5aa6" loading={true} cssOverride={override} aria-label="loading-spinner" />;
};
