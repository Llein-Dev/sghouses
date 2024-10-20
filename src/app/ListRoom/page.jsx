import Breadcrumb from "@/components/Breadcrumb";
import { ProductCardColComponent } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function NhaPho(){
    const products = [
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Căn hộ cao cấp tại trung tâm",
          address: "Quận 1, TP.HCM",
          price: "5 tỷ",
          size: "100m²",
          mapLink: "/map/1",
        },
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Nhà phố hiện đại", 
          address: "Quận 2, TP.HCM",
          price: "8 tỷ",
          size: "200m²",
          mapLink: "/map/2",
        },
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Biệt thự ven sông",
          address: "Quận 7, TP.HCM",
          price: "15 tỷ",
          size: "500m²",
          mapLink: "/map/3",
        },
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Căn hộ cao cấp tại trung tâm",
          address: "Quận 1, TP.HCM",
          price: "5 tỷ",
          size: "100m²",
          mapLink: "/map/1",
        },
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Nhà phố hiện đại",
          address: "Quận 2, TP.HCM",
          price: "8 tỷ",
          size: "200m²",
          mapLink: "/map/2",
        },
        {
          image: "/dark-blue-house-exterior-2.png?text=detail",
          title: "Biệt thự ven sông",
          address: "Quận 7, TP.HCM",
          price: "15 tỷ",
          size: "500m²",
          mapLink: "/map/3",
        },
      ]
    return(
        <div>
           <div className="container-full p-2">
            <Breadcrumb></Breadcrumb>
           </div>
           <div className=" w-full" >
           <div className="space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCardColComponent key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem Thêm <ArrowUpDown /></Button>
        </div>
           </div>

           <div className=" w-full " >
           <div className="space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCardColComponent key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem Thêm<ArrowUpDown /></Button>
        </div>
         
           </div>
        </div>
    )
}