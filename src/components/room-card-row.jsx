"use client";

import Link from "next/link";
import { Eye, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export function RoomCardRowComponent({ product }) {


  // Split the image string and get the first image URL
  const images = product?.hinh_anh ? product.hinh_anh.split(";") : [];
  const firstImage = images[0]; // Take the first image

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden ">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-1/3 md:aspect-[4/3] aspect-video">
          <img
            src={`http://localhost:8000/storage/${firstImage}`}
            alt={product?.ten_phong}
            className="rounded-t-lg h-full w-full object-cover sm:rounded-l-lg sm:rounded-t-none "
          />
        </div>
        <div className="flex flex-col justify-between w-full sm:w-2/3">
          <CardContent className="p-4 space-y-2">
            <CardTitle className="flex justify-between">
              <div>
                <Link href={`/building/${product?.slug_toa_nha}`}>
                  <h3 className="text-lg font-semibold mb-2">
                    {product?.ten_phong}
                  </h3>
                </Link>
                <Link href={`/building/${product?.slug_toa_nha}`}>
                  <h6 className="text-sm font-normal mb-2">
                    <span className="underline">Tòa nhà:</span>{" "}
                    {product?.ten_toa_nha}
                  </h6>
                </Link>
              </div>
            </CardTitle>
            <div className="flex items-center ">
              <p className="mr-2 text-primary">Giá từ</p>
              <p className="text-lg font-bold text-red-500">
                {formatCurrency(product?.gia_thue)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Area (Khu vực) */}
              {product?.ten_khu_vuc && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  {product?.ten_khu_vuc}
                </Badge>
              )}

              {/* Room Size (Diện tích) */}
              {product?.dien_tich && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  {product?.dien_tich} m²
                </Badge>
              )}

              {/* Electricity Rate (Đơn giá điện) */}
              {product?.don_gia_dien && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Điện: {product?.don_gia_dien} VND/kWh
                </Badge>
              )}

              {/* Water Rate (Đơn giá nước) */}
              {product?.don_gia_nuoc && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Nước {product?.don_gia_nuoc} VND/m³
                </Badge>
              )}

              {/* Service Fee (Phí dịch vụ) */}
              {product?.phi_dich_vu && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Dịch vụ: {product?.phi_dich_vu} VND
                </Badge>
              )}

              {/* Furniture (Nội thất) */}
              {product?.noi_that && product?.noi_that !== "Không" && (
                <div className="flex flex-wrap gap-2">
                  {product.noi_that.split(";").map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-900 text-white"
                    >
                      {item.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Amenities (Tiện ích) */}
              {product?.tien_ich && product?.tien_ich !== "Không" && (
                <div className="flex flex-wrap gap-2">
                  {product.tien_ich.split(";").map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-900 text-white"
                    >
                      {item.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Parking Fee (Tiền xe máy) */}
              {product?.tien_xe_may && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Xe: {product?.tien_xe_may} VND
                </Badge>
              )}

              {/* Loft (Gác lửng) */}
              {product?.gac_lung && product?.gac_lung !== "Không" && (
                <Badge variant="outline" className="bg-blue-900 text-white">
                  Gác lửng: {product?.gac_lung}
                </Badge>
              )}
            </div>

            <p className="">{product?.mo_ta}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link
              href={product?.mapLink || "#"} // Use a placeholder or handle undefined
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
