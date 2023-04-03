import { CSSProperties } from 'react';
import { MoonLoader } from 'react-spinners';

export interface SpinnerProps {
	isDataLoading: boolean;
}

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red'
};

export const Spinner = ({ isDataLoading }: SpinnerProps) => {
	return <MoonLoader color="#3c5aa6" loading={isDataLoading} cssOverride={override} aria-label="loading-spinner" />;
};
