"use client";

import { useEffect, useState } from "react";
import { ProductCardRowComponent } from "@/components/product-card-row";
import { ProductFilter } from "@/components/product-filter";
import Breadcrumb from "@/components/breadcum";
import { Spinner } from "@/components/ui/loading";

export default function FilterPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const productCount = filteredProducts?.length || 0;

    const fetchFilteredProducts = async () => {
        setLoading(true);
        try {
            // Get the current search parameters from the window location
            const params = new URLSearchParams(window.location.search);
            const response = await fetch(`http://localhost:8000/api/filter?${params.toString()}`);
            
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setFilteredProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, []); // Empty dependency array ensures it runs only on mount

    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
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
                    {loading ? (
                        <div className="py-8"><Spinner /></div>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <ProductCardRowComponent key={index} product={product} />
                        ))
                    )}
                </div>
                <div className="md:w-1/4">
                    <ProductFilter />
                </div>
            </div>
        </div>
    );
}
