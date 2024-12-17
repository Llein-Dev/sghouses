"use client";

import { useEffect, useState } from "react";
import { ProductCardRowComponent } from "@/components/product-card-row";
import { ProductFilter } from "@/components/product-filter";
import Breadcrumb from "@/components/breadcum";
import { Spinner } from "@/components/ui/loading";
import { SearchFilterComponent } from "@/components/search-bar-filter";

export default function FilterPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
    const productCount = filteredProducts.length;

    const fetchFilteredProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/filter-room?${searchParams.toString()}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setFilteredProducts([]); // Set to empty array on 404
                } else {
                    throw new Error("Failed to fetch data");
                }
            } else {
                const data = await response.json();
                setFilteredProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setFilteredProducts([]); // Optionally set to empty on other errors too
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, [searchParams]); // Depend on searchParams instead of window.location.search

    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
            <SearchFilterComponent setSearchParams={setSearchParams} />
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
                        filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <ProductCardRowComponent key={index} product={product} />
                            ))
                        ) : (
                            <div className="py-8 text-center text-gray-500">Không có sản phẩm nào phù hợp.</div>
                        )
                    )}
                </div>
                <div className="md:w-1/4">
                    <ProductFilter />
                </div>
            </div>
        </div>
    );
}