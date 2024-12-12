'use client';

import Link from "next/link";
import Image from "next/image";
import { Eye, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export function ProductCardRowComponent({
    product
}) {

    

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <Card className="overflow-hidden ">
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/3 md:aspect-[4/3] aspect-video">
                    <img
                       src={`${process.env.NEXT_PUBLIC_PATH_FILE}${product?.image}`} 
                        alt={product?.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg h-full sm:rounded-l-lg sm:rounded-t-none "
                    />
                </div>
                <div className="flex flex-col justify-between w-full sm:w-2/3">
                    <CardContent className="p-4 space-y-2">
                        <CardTitle className="flex justify-between">
                            <Link href={`/building/${product?.slug}`}>
                                <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-2 flex items-center">
                                <Eye className="w-4 h-4 mr-1" /> {product?.luot_xem}
                            </p>
                        </CardTitle>
                        <div className="flex items-center ">
                            <p className="mr-2 text-primary">Giá từ</p>
                            <p className="text-lg font-bold text-red-500">
                                {formatCurrency(product?.gia_thue)}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{product?.name_area}</Badge>
                            <Badge variant="secondary">{product?.size} m²</Badge> {/* Adding the square meter unit */}
                        </div>
                        <p className="">
                            {product?.mo_ta}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Link
                            href={product?.mapLink || '#'} // Use a placeholder or handle undefined
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
