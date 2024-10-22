"use client"
import { BlogCard } from "@/components/blog-card";
import { CarouselComponent } from "@/components/carousel";
import VerticalCategory from "@/components/category-card";
import KeywordComponents from "@/components/keyword";
import { ProductCardColComponent } from "@/components/product-card";
import { SearchBarComponent } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import UserGuidance from "@/components/userguide";
import { blogs, images, keywords, products, steps } from "@/utils/data";
import { ArrowRight } from "lucide-react";
import { useFetchCategories } from '../utils/api/GET/api'; // Import custom hook
export default function Home() {
  const { categories, loading, error } = useFetchCategories(); // Sử dụng custom hook
  return (
    <>
      <div className="space-y-24 pb-24">
        <div className="relative">
          <CarouselComponent images={images} autoPlayInterval={5000} />
          <SearchBarComponent />
        </div>
        {/* Categories */}
        <div className="px-4 space-y-8">
          <h2 className="text-center font-bold text-2xl uppercase text-[#00008B]">Khu vực <span className="text-[#FF5C00]">nổi bật</span></h2>
          {loading && <p className="text-center">Loading categories...</p>} {/* Hiển thị loading nếu đang fetch */}
                {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi nếu có */}
          <VerticalCategory categories={categories} />
        </div>

        {/* Products */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCardColComponent key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
        </div>

        {/* background blue */}
        <div className="px-4 w-full bg-gradient-to-r from-[#00008B] to-[#4169E1]  container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-center text-xl md:text-2xl font-bold mb-8">Thủ tục dễ dàng <span className="text-[#FF5C00]">(4 bước)</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <UserGuidance index={index} step={step} />
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCardColComponent key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
        </div>

        {/* background blue */}
        <div className="px-4 w-full bg-gradient-to-r from-[#00008B] to-[#4169E1] container mx-auto  overflow-hidden">
          <div className="h-full flex flex-col items-center w-full justify-center md:justify-between py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-8">Từ khóa được tìm <span className="text-[#FF5C00]">nhiều nhất</span></h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-2">
              {keywords.map((keyword, index) => (
                <KeywordComponents key={index} keyword={keyword} />
              ))}
            </div>
          </div>
        </div>

        {/* blogs */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-center w-full font-bold text-2xl text-[#00008B] uppercase">Tin tức nổi bật </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-6 mb-12">
            {blogs.map((product, index) => (
              <BlogCard key={index} {...product} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
        </div>
      </div>

    </>
  );
}
