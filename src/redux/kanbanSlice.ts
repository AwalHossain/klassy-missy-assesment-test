import { getFromLocalStorage, setToLocalStorage } from '@/utils/localstorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanCard, KanbanState } from './types/kanbanTypes';

const loadState = (): KanbanState | undefined => {
  try {
    const serializedState = getFromLocalStorage('kanbanState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state: KanbanState) => {
  try {
    const serializedState = JSON.stringify(state);
    setToLocalStorage('kanbanState', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: KanbanState = {
  columns: {
    incoming: {
      title: 'Incoming Request',
      cards: [],
    },
    processing: {
      title: 'Processing',
      cards: [],
    },
    done: {
      title: 'Done | Updated',
      cards: [],
    },
  },
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: loadState() || initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ columnId: string; card: KanbanCard }>) => {
      const { columnId, card } = action.payload;
      state.columns[columnId].cards.unshift(card);
      console.log(state, 'state');
      saveState(state);
    },
    moveCard: (state, action: PayloadAction<{
      sourceColumnId: string;
      destinationColumnId: string;
      sourceIndex: number;
      destinationIndex: number;
    }>) => {
      const { sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.columns[sourceColumnId].cards.splice(sourceIndex, 1);
      state.columns[destinationColumnId].cards.splice(destinationIndex, 0, removed);
      saveState(state);
    },
  },
});

export const { addCard, moveCard } = kanbanSlice.actions;
export default kanbanSlice.reducer;