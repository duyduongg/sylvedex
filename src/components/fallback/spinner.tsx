import { PuffLoader } from 'react-spinners';
import React from 'react';

export const Spinner = () => {
	return <PuffLoader color="#3c5aa6" loading={true} aria-label="loading-spinner" />;
};
