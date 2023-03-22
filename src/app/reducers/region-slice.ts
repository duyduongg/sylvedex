import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NamedApiResource } from '../../models/named-api-resource';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';

interface RegionState extends BaseSliceState {
	results: NamedApiResource[];
}

const regionSlice = createSlice({
	name: 'region',
	initialState: {
		...baseSliceInitialState,
		results: []
	} as RegionState,
	reducers: {
		requestGettingRegions(state) {
			state.isLoading = true;
		},
		completeGettingRegions(state, action: PayloadAction<NamedApiResource[]>) {
			state.isLoading = false;
			state.isError = false;
			state.results = action.payload;
		},
		errorGettingRegions(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		}
	}
});

export const { requestGettingRegions, completeGettingRegions, errorGettingRegions } = regionSlice.actions;
export const regionAction = regionSlice.actions;
export const regionState = regionSlice.reducer;
