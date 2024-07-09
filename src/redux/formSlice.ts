import { FormDataSchema } from '@/lib/formSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export type FormStateslice = z.infer<typeof FormDataSchema>;

const initialState: FormStateslice = {
  name: '',
  gender: '',
  concern: '',
  DOB: '',
  concernName: [], // Initialize as an empty array
  eyeConcern: '',
  writtenConcern: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormStateslice; value: any }>) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
    },
    setFormData: (state, action: PayloadAction<Partial<FormStateslice>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});


export const { updateField, setFormData, resetForm } = formSlice.actions;

export default formSlice.reducer;
// a function to save the form state to localStorage
export const saveFormState = (state: FormStateslice) => {
  localStorage.setItem('formData', JSON.stringify(state));
};

//  a function to load the form state from localStorage
export const loadFormState = (): FormStateslice | null => {
  const state = localStorage.getItem('formData');
  return state ? JSON.parse(state) as FormStateslice : null;
};