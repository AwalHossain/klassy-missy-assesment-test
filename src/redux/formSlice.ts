import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormStateslice {
  name: string;
  gender: string;
  concern: string;
  dateOfBirth: string;
}

const initialState: FormStateslice = {
  name: '',
  gender: '',
  concern: '',
  dateOfBirth: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormStateslice; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    loadFormData: (state, action: PayloadAction<FormStateslice>) => {
      return action.payload;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { updateField, loadFormData, resetForm } = formSlice.actions;

export default formSlice.reducer;

// Add a function to save the form state to localStorage
export const saveFormState = (state: FormStateslice) => {
  localStorage.setItem('formData', JSON.stringify(state));
};

// Add a function to load the form state from localStorage
export const loadFormState = () => {
  const state = localStorage.getItem('formData');
  return state ? JSON.parse(state) as FormStateslice : null;
};