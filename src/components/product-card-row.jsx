'use client';

import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"


export function ProductCardRowComponent({
    title,
    address,
    price,
    size,
    mapLink,
    image
}) {
    return (
        <Card className="overflow-hidden ">
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/3 md:aspect-[4/3]   aspect-video">
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg sm:rounded-l-lg sm:rounded-t-none "
                    />
                </div>
                <div className="flex flex-col justify-between w-full sm:w-2/3">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> {address}
                        </p>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <div className="flex items-center mb-2">
                            <p className="mr-2 text-primary">Giá từ</p>
                            <p className="text-lg font-bold text-red-500">{price}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{address}</Badge>
                            <Badge variant="secondary">{size}</Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Link
                            href={mapLink}
                            className="text-sm text-primary hover:underline flex items-center"
                        >
                            <MapPin className="w-4 h-4 mr-1" /> Xem bản đồ
                        </Link>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}