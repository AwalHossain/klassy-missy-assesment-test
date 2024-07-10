import { FormDataSchema } from '@/lib/formSchema';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localstorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export type FormStateslice = z.infer<typeof FormDataSchema> & { currentStep: number };

const loadState = (): FormStateslice | undefined => {
  try {
    const serializedState = getFromLocalStorage('skinRegimenForm');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state: FormStateslice) => {
  try {
    const serializedState = JSON.stringify(state);
    setToLocalStorage('skinRegimenForm', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: FormStateslice = {
  name: '',
  gender: '',
  concern: '',
  DOB: new Date(),
  concernName: [],
  eyeConcern: '',
  writtenConcern: '',
  currentStep: 0,
};

const formSlice = createSlice({
  name: 'form',
  initialState: loadState() || initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormStateslice>>) => {
      const newState = { ...state, ...action.payload };
      saveState(newState);
      return newState;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      saveState(state);
    },
    resetForm: () => {
      localStorage.removeItem('skinRegimenForm');
      return initialState;
    },
  },
});

export const { setFormData, setCurrentStep, resetForm } = formSlice.actions;

export default formSlice.reducer;