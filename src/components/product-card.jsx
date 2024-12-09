'use client';
import Link from "next/link";
import { HouseIcon, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardColComponent({ productsHouseFeatured }) {
  // Kiểm tra nếu products không tồn tại hoặc không phải là mảng
  if (!Array.isArray(productsHouseFeatured)) {
    return <p>No products available.</p>; // Hoặc hiển thị thông báo khác nếu không có sản phẩm
  }

  // Hàm format tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <>
      {productsHouseFeatured.slice(0, 4).map((houseFeatured, index) => (
        <Card key={index} className="overflow-hidden ">
          <div className="relative w-full aspect-video mb-2 overflow-hidden ">
            <img src={`${process.env.NEXT_PUBLIC_PATH_FILE}${houseFeatured?.image}`} />
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <HouseIcon className="w-4 h-4 mr-1" />Phòng trống: {houseFeatured.count_rooms}
            </p>
            <Link href={`/building/${houseFeatured.slug}`}>
              <h3 className="text-lg font-semibold mb-2">{houseFeatured.name}</h3>
            </Link>
            <div className="flex items-center">
              <p className="mr-2 text-primary mb-2">Giá từ</p>
              <p className="text-lg text-red-500 text-primary mb-2">
                {formatCurrency(houseFeatured.gia_thue)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{houseFeatured.name_area}</Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link
              href={""}
              className="text-sm text-primary hover:underline flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> Xem bản đồ
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
