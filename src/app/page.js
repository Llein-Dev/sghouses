import { CarouselComponent } from "@/components/carousel";
import VerticalCategory from "@/components/category-card";
import { ProductCardComponent } from "@/components/product-card";
import { SearchBarComponent } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";


export default function Home() {
  const images = [
    "/placeholder.svg?height=400&width=800&text=Slide+1",
    "/placeholder.svg?height=400&width=800&text=Slide+2",
    "/placeholder.svg?height=400&width=800&text=Slide+3",
    "/placeholder.svg?height=400&width=800&text=Slide+4",
  ]
  const categories = [
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Nhà+phố", title: "Nhà phố", href: "/nha-pho" },
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Chung+cư", title: "Chung cư", href: "/chung-cu" },
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Biệt+thự", title: "Biệt thự", href: "/biet-thu" },
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Đất+nền", title: "Đất nền", href: "/dat-nen" },
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Biệt+thự", title: "Biệt thự", href: "/biet-thu" },
    { imageUrl: "/placeholder.svg?height=100&width=100&text=Đất+nền", title: "Đất nền", href: "/dat-nen" },
  ]
  const products = [
    {
      title: "Căn hộ cao cấp tại trung tâm",
      address: "Quận 1, TP.HCM",
      price: "5 tỷ",
      size: "100m²",
      mapLink: "/map/1",
    },
    {
      title: "Nhà phố hiện đại",
      address: "Quận 2, TP.HCM",
      price: "8 tỷ",
      size: "200m²",
      mapLink: "/map/2",
    },
    {
      title: "Biệt thự ven sông",
      address: "Quận 7, TP.HCM",
      price: "15 tỷ",
      size: "500m²",
      mapLink: "/map/3",
    },
  ]
  return (
    <>
      <div className="space-y-24">
        <div className="relative">
          <CarouselComponent images={images} autoPlayInterval={5000} />
          <SearchBarComponent />
        </div>

        {/* Categories */}
        <div className="space-y-16">
          <h2 className="text-center font-bold text-2xl uppercase text-[#00008B]">Khu vực <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-6 container mx-auto justify-center gap-8 mb-12">
            {categories.map((category, index) => (
              <VerticalCategory key={index} {...category} />
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-16 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 container mx-auto justify-center gap-8 mb-12">
            {products.map((product, index) => (
              <ProductCardComponent key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
        </div>
      </div>

    </>
  );
}
