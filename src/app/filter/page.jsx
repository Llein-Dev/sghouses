"use client"

import { ProductCardRowComponent } from "@/components/product-card-row";
import { ProductFilter } from "@/components/product-filter";
import {
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"; // Ensure you import DropdownMenuContent
import { products } from "@/utils/api/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react"; // Import useState for state management
import Button from "@/components/ui/button"; // Import the Button component if necessary

import Breadcrumb from "@/components/breadcum";

export default function ProductPage() {
    const [sortOption, setSortOption] = useState(""); // State to manage the sorting option
    const productCount = products.length;

    return (
        <>
            <Breadcrumb />
            <div className="container mx-auto py-8">
                <div className="flex flex-col-reverse md:flex-row gap-8">
                    <div className="md:w-3/4 space-y-4 bg-white rounded-lg p-4 shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-start py-4 font-bold text-2xl text-[#00008B]">
                                Có <span className="text-[#FF5C00]">{productCount}</span> kết quả phù hợp
                            </h2>
                            <div>
                                <h3 className="text-md">Sắp xếp theo:</h3>
                            </div>
                        </div>
                        {products.map((product, index) => (
                            <ProductCardRowComponent key={index} {...product} />
                        ))}
                    </div>
                    <div className="md:w-1/4">
                        <ProductFilter />
                    </div>
                </div>
            </div>
        </>
    );
}
