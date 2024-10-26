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
import { useFetchBlogHouse, useFetchCategories, useFetchCheapHouse, useFetchFeaturedHouse, useFetchViewHouse } from '../utils/api/GET/api'; // Import custom hook
import { ProductCardColCheapComponent } from "@/components/product-card-cheap";
import { Spinner } from "@/components/ui/loading";
import ErrorComponent from "@/components/ui/error";
import ContactNow from "@/components/templateSection/contactNow";
import WhyUs from "@/components/templateSection/whyUs";
import { ProductCardColViewComponent } from "@/components/product-card-view";
export default function Home() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories(); // Sử dụng custom hook
  const { featuredHouse, loading: featuredLoading, error: featuredError } = useFetchFeaturedHouse();
  const { CheapHouse, loading: CheapLoading, error: CheapError } = useFetchCheapHouse();
  const { ViewHouse, loading: ViewLoading, error: ViewError } = useFetchViewHouse();
  const { BlogHouse } = useFetchBlogHouse();
  return (
    <>
      <div className="space-y-24 pb-24">
        {/* Carousel and Search Bar */}
        <div className="relative">
          <CarouselComponent images={images} autoPlayInterval={5000} />
          <SearchBarComponent />
        </div>
        <WhyUs />
        {/* Categories */}
        <div className="px-4 space-y-8">
          <h2 className="text-center w-full font-bold text-2xl text-[#00008B]">Danh mục <span className="text-[#FF5C00]">nổi bật</span></h2>
          {categoriesLoading && <p className="text-center"> <Spinner /> </p>} {/* Hiển thị loading nếu đang fetch */}
          {categoriesError && <ErrorComponent message={categoriesError} />} {/* Hiển thị lỗi nếu có */}
          <VerticalCategory categories={categories} />
        </div>
        {/* Featured Products */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
          {featuredLoading && <p className="text-center"> <Spinner /> </p>} {/* Hiển thị loading */}
          {featuredError && <ErrorComponent message={featuredError} />} {/* Hiển thị lỗi */}
          {!featuredError && ( // Ẩn phần dữ liệu và nút nếu có lỗi
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
                <ProductCardColComponent productsHouseFeatured={featuredHouse} />
              </div>
              <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
            </>
          )}
        </div>
        {/* Cheap House Products */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">lượt xem nhiều nhất</span></h2>

          {CheapLoading && <p className="text-center"> <Spinner /> </p>} {/* Hiển thị loading */}
          {CheapError && <ErrorComponent message={CheapError} />} {/* Hiển thị lỗi */}

          {!CheapError && ( // Ẩn phần dữ liệu và nút nếu có lỗi
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
                <ProductCardColCheapComponent productsHouseCheap={CheapHouse} />
              </div>
              <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
            </>
          )}
        </div>
        {/*View House Products */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-start w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">giá rẻ nhất</span></h2>

          {ViewLoading && <p className="text-center"> <Spinner /> </p>} {/* Hiển thị loading */}
          {ViewError && <ErrorComponent message={ViewError} />} {/* Hiển thị lỗi */}

          {!ViewError && ( // Ẩn phần dữ liệu và nút nếu có lỗi
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
                <ProductCardColViewComponent productsViewHouse={ViewHouse} />
              </div>
              <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
            </>
          )}
        </div>

        {/* Background blue */}
        <div className="px-4 w-full bg-gradient-to-r from-[#00008B] to-[#4169E1]  container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-center text-xl md:text-2xl font-bold mb-8">Thủ tục dễ dàng <span className="text-[#FF5C00]">(4 bước)</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <UserGuidance key={index} index={index} step={step} />
              ))}
            </div>
          </div>
        </div>

        {/* Blogs */}
        <div className="px-4 space-y-8 flex flex-col justify-center items-center container mx-auto">
          <h2 className="text-center w-full font-bold text-2xl text-[#00008B] uppercase">Tin tức nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-6 mb-12">
            {BlogHouse.map((productBlog, index) => (
              <BlogCard key={index} {...productBlog} />
            ))}
          </div>
          <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
        </div>
      </div>
      <div className=" mx-auto">
        <ContactNow />
      </div>
    </>
  );
}

