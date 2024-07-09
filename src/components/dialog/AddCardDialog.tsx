import { Card } from '@/lib/types';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../forms/FormInput';
import FormSelectedField from '../forms/FormSelectedField';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader } from '../ui/dialog';

interface CardProps {
    columnId: string;
    setColumns: (columns: any) => void;
    setIsDialogCardOpen: (isOpen: boolean) => void;
    open?: boolean;

}

export default function AddCardDialog({ columnId, setColumns, setIsDialogCardOpen }: CardProps) {

    const methods = useForm();
    const { handleSubmit } = methods;
    const processForm = (data: any) => {
        console.log('Form submitted', data);
        const newCard: Card = {
            id: Date.now().toString(),
            regimen: data.regimen,
            timestamp: new Date().toLocaleString(),
            name: data.name,
        };
        setColumns((prevColumns: any) =>
            prevColumns.map((col: any) =>
                col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
            )
        );

        setIsDialogCardOpen(false);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(processForm)}>
                        <FormInput name="name" label="Your Name" />
                        <FormSelectedField name='regimen' label='Regimen' options={[
                            { label: "glow skin", value: "glow skin" },
                            { label: "hair care", value: "hair care" },
                            { label: "weight loss", value: "weight loss" },
                            { label: "others", value: "others" },
                        ]} />
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                    </form>
                </FormProvider>
                {/* <DialogTitle>Are you absolutely sure?</DialogTitle>

                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription> */}
            </DialogHeader>
        </DialogContent>
    )
}
