
import Image from "next/image";



const CharacterImage = ({ ImageUrl }: { ImageUrl: string }) => (
    <div className="flex justify-center mb-[15px]">
        <div className="relative w-">
            <Image src={ImageUrl} width="150" height={150} alt="Character" className="rounded-full" />
        </div>
    </div>
);


export default CharacterImage;