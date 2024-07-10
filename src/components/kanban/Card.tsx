import { KanbanCard } from '@/redux/types/kanbanTypes';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Dialog, DialogTrigger } from '../ui/dialog';
import CardDetails from './CardDetails';

interface CardProps {
    card: KanbanCard;
    index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">{card.regimen}</h3>
                        <span className="text-xs sm:text-sm text-gray-500">{new Date(card.datetime).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{card.name}</p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs sm:text-sm text-gray-500">{new Date(card.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <button
                            className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors duration-200"
                        >
                            <Dialog>
                                <DialogTrigger>
                                    Details
                                </DialogTrigger>
                                <CardDetails id={card?.id} />
                            </Dialog>
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;