
import Image from "next/image";



const CharacterImage = () => (
    <div className="flex justify-center mb-[15px]">
        <div className="relative">
            <Image src="/new.png" width="111" height={111} alt="Character" className="rounded-full" />
        </div>
    </div>
);


export default CharacterImage;