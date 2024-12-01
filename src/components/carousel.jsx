"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners } from "@/utils/data";

export function CarouselComponent({ autoPlayInterval = 5000 }) {
  const [images, setImages] = useState(banners);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch the banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/banner"); // Replace with your API endpoint
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setImages(data); // Assuming the API returns an array of image URLs
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(intervalId);
  }, [nextSlide, autoPlayInterval]);

  if (images.length === 0) {
    return (
      <div className="md:relative md:w-full hidden mx-auto" style={{ aspectRatio: "10/3" }}>
        No images available
      </div>
    );
  }

  return (
    <div className="md:relative md:w-full md:block hidden">
      <div className="overflow-hidden relative" style={{ aspectRatio: "10 / 2" }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`https://sghouses.vercel.app${image}`} // Assuming images are relative URLs
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-full px-4">
        <h1 className="uppercase leading-snug text-white font-bold text-4xl">
          TÌM NHANH, KIẾM DỄ
          <br />
          TẠI <span className="text-[#FF5C00]">TP. HỒ CHÍ MINH</span>
        </h1>
        <p className="text-gray-200 mt-4">
          Hiện đang có hơn 40 địa điểm và 2000 phòng cho bạn lựa chọn
        </p>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
