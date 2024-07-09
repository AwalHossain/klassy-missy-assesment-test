import { Column } from '@/lib/types';
import { Button } from '../ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
interface DeleteCardDialogProps {
    columnId: string;
    cardId: string;
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    setIsDeleteDialogCardOpen: (open: boolean) => void;
}

export default function DeleteCardDialog({ columnId, cardId, setIsDeleteDialogCardOpen, setColumns }: DeleteCardDialogProps) {
    const handleDelete = () => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) } : col
            )
        );
        setIsDeleteDialogCardOpen(false);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={() => setIsDeleteDialogCardOpen(false)}>No</Button>
            </DialogFooter>
        </DialogContent>
    );
}