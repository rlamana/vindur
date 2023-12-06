import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ConditionsConfiguration } from '../model/conditions';

interface ConditionsState {
  configuration: ConditionsConfiguration;
}

const initialState: ConditionsState = {
  configuration: {
    maxSpeed: 25,
    precipitationLimit: 1,
  },
};

const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    setConfiguration: (
      state,
      action: PayloadAction<ConditionsConfiguration>
    ) => {
      state.configuration = action.payload;
    },
  },
});

export const { setConfiguration } = conditionsSlice.actions;
export const selectConfiguration = (state: { conditions: ConditionsState }) =>
  state.conditions.configuration;

export default conditionsSlice.reducer;
