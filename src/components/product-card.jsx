'use client';
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductCardColComponent({
  image,
  title,
  address,
  price,
  size,
  mapLink
}) {
  return (
    (<Card className="overflow-hidden">
      <div className="relative w-full aspect-video mb-2 overflow-hidden ">
        <img src={image} alt="" />
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> {address}
        </p>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center"> <p className="mr-2 text-primary mb-2">Giá từ</p> <p className="text-lg text-red-500  text-primary mb-2">{price}</p></div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{address}</Badge>
            <Badge variant="secondary">{size}</Badge>
          </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={mapLink}
          className="text-sm text-primary hover:underline flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> Xem bản đồ
        </Link>
      </CardFooter>
    </Card>)
  );
}