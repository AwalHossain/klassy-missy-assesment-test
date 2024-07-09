import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column as ColumnType } from '../../lib/types';
import AddCardDialog from "../dialog/AddCardDialog";
import Card from './Card';

interface ColumnProps {
    column: ColumnType;
    setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const Column: React.FC<ColumnProps> = ({ column, setColumns }) => {
    const [addDialogInfo, setAddDialogInfo] = useState<{ isOpen: boolean; columnId: string } | null>(null);

    return (
        <div className="flex-shrink-0 w-96 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 flex justify-between items-center">
                {column.title}
                <Dialog open={addDialogInfo?.isOpen} onOpenChange={(isOpen) => setAddDialogInfo(isOpen ? { isOpen, columnId: column.id } : null)}>
                    <DialogTrigger>
                        <PlusCircle className="w-6 h-6 text-green-500 hover:text-green-700" />
                    </DialogTrigger>
                    {addDialogInfo && (
                        <AddCardDialog
                            columnId={addDialogInfo.columnId}
                            setColumns={setColumns}
                            setIsDialogCardOpen={(isOpen) => setAddDialogInfo(isOpen ? addDialogInfo : null)}
                        />
                    )}
                </Dialog>
            </h2>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`min-h-[500px] transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''
                            }`}
                    >
                        {column.cards.map((card, index) => (
                            <Card key={card.id} card={card} index={index} columnId={column.id} setColumns={setColumns} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;