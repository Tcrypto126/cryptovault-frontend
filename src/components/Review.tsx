
import Image from "next/image";

const Review = () => {
    return (
        <>
            <div className="w-full h-full p-6 rounded-[12px] border-border border-[1px] bg-[#FAFAFA08] space-y-2">
                <div className="flex gap-3 items-center">
                    <Image
                        src="/assets/home/Avatar.png"
                        width={48}
                        height={48}
                        alt="avatar"
                    />
                    <div className="flex flex-col">
                        <h5 className="font-bold">
                            Fabrizio Fernandez
                        </h5>
                        <h6 className="text-text">
                            @fab3304
                        </h6>
                    </div>
                </div>
                <div>
                    <p className="text-text text-[16px]">
                        Testing out <span className="text-[#A78BFA]">@launchui</span>&apos; responsive design. That’s the template we’ve all been waiting for. My mobile-first heart is doing a happy dance.
                    </p>
                </div>
            </div>

        </>
    )
}

export default Review;