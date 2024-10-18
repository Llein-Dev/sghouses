import Image from "next/image"
import Link from "next/link"




export default function VerticalCategory({ imageUrl, title, href }) {

    return (
        <Link href={href} className="flex w-full rounded-lg shadow  flex-col items-center group">
            <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden ">
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-sm font-medium text-center pb-3 group-hover:text-primary transition-colors">
                {title}
            </h3>
        </Link>
    )
}