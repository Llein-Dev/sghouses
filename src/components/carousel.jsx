"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CarouselComponent({ images = [], autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(intervalId);
  }, [nextSlide, autoPlayInterval]);

  if (images.length === 0) {
    return (
      <div
        className="md:relative md:w-full hidden mx-auto"
        style={{ aspectRatio: "10/3" }}
      >
        No images available
      </div>
    );
  }

  return (
    <div className="md:relative md:w-full md:block hidden">
      <div
        className="overflow-hidden relative"
        style={{ aspectRatio: "10 / 2" }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay div */}
        <div className="absolute inset-0 bg-black opacity-30" />{" "}
        {/* Light black overlay */}
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-auto">
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
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
