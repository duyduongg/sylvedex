export interface BaseSliceState {
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export const baseSliceInitialState: BaseSliceState = {
	isLoading: false,
	isError: false,
	errorMessage: ''
};
