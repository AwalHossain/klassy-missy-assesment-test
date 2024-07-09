import { useFormContext } from 'react-hook-form';
import { concernNameOptions, eyeConcernOptions } from '../data/FormData';
import FormMultipleSelectionField from "../forms/FormMultipleSelectionField";
import FormSelectedField from "../forms/FormSelectedField";
import FormTextArea from "../forms/FormTextArea";
import CharacterImage from "../ui/characterImage";

const FormStepTwo = () => {
    const { watch } = useFormContext();

    return (
        <div className="space-y-[18px]">
            <CharacterImage ImageUrl="/images/confused.svg" />
            <div>
                <FormMultipleSelectionField
                    label="What's your concern? *"
                    name="concernName"
                    placeholder="Select your concern or search by keyword"
                    options={concernNameOptions}
                />
            </div>
            <div className="flex justify-between items-center">
                <FormSelectedField
                    label={`Do you have any eye area concern, ${watch('name')}?`}
                    name="eyeConcern"
                    options={eyeConcernOptions}
                    className="max-w-md"
                    placeholder='Select eye area concern'
                    imageSrc="/images/light.png"
                />
            </div>
            <div className="mb-4">
                <FormTextArea
                    label="What's your concern? *"
                    name="writtenConcern"
                    placeholder="Please write details about your skin concerns and mention A to Z skin problem's"
                    className="text-[13px]"
                />
            </div>
        </div>
    );
};

export default FormStepTwo;