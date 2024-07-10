import { useAppDispatch } from '@/redux/hooks';
import { moveCard } from '@/redux/kanbanSlice';
import { DropResult } from 'react-beautiful-dnd';

const useDragAndDrop = () => {
    const dispatch = useAppDispatch();

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId !== destination.droppableId ||
            source.index !== destination.index
        ) {
            dispatch(moveCard({
                sourceColumnId: source.droppableId,
                destinationColumnId: destination.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index,
            }));
        }
    };

    return {
        onDragEnd,
    };
};

export default useDragAndDrop;
