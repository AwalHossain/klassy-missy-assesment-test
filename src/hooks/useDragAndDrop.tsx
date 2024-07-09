import { DropResult } from 'react-beautiful-dnd';
import { Column } from '../lib/types';

const useDragAndDrop = (initialColumns: Column[], setColumns: React.Dispatch<React.SetStateAction<Column[]>>) => {
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceColumn = initialColumns.find(col => col.id === source.droppableId);
        const destColumn = initialColumns.find(col => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) return;

        const sourceCards = Array.from(sourceColumn.cards);
        const [removedCard] = sourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceCards.splice(destination.index, 0, removedCard);
            const newColumns = initialColumns.map(col =>
                col.id === sourceColumn.id ? { ...col, cards: sourceCards } : col
            );
            setColumns(newColumns);
        } else {
            const destCards = Array.from(destColumn.cards);
            destCards.splice(destination.index, 0, removedCard);
            const newColumns = initialColumns.map(col => {
                if (col.id === sourceColumn.id) {
                    return { ...col, cards: sourceCards };
                }
                if (col.id === destColumn.id) {
                    return { ...col, cards: destCards };
                }
                return col;
            });
            setColumns(newColumns);
        }
    };

    return { onDragEnd };
};

export default useDragAndDrop;