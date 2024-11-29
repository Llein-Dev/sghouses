"use client";

import { useEffect, useState } from "react";
import { ProductCardRowComponent } from "@/components/product-card-row";
import Breadcrumb from "@/components/breadcum";
import { Spinner } from "@/components/ui/loading";

import { useFetchCategories } from "@/utils/api/GET/api";
import { SearchFilterComponent } from "@/components/search-bar-filter copy";
import Link from "next/link";
import { RoomCardRowComponent } from "@/components/room-card-row";

export default function FilterPage() {
    const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories(); // Sử dụng custom hook
    const [roomResults, setRoomResults] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const handleResultsUpdate = (data) => {
        setRoomResults(data); // Cập nhật kết quả nhận từ SearchFilterComponent
        setProductCount(data.length); // Cập nhật số lượng kết quả
    };
    const [loadingsearch, setLoadingsearch] = useState(false);

    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
            <SearchFilterComponent onResultsUpdate={handleResultsUpdate} setLoading={setLoadingsearch} />
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
                    {loadingsearch ? (
                        <div className="py-8"><Spinner /></div>
                    ) : (
                        roomResults.length > 0 ? (
                            roomResults.map((product, index) => (
                                <RoomCardRowComponent key={index} product={product} />
                            ))
                        ) : (
                            <div className="py-8 text-center text-gray-500">Không có sản phẩm nào phù hợp.</div>
                        )
                    )}
                </div>
                <div className="md:w-1/4 space-y-6">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/filter-room?area=${category.slug}`} className="flex w-full overflow-hidden rounded-lg shadow flex-col items-center group">
                            <div className="relative w-full aspect-[16/9] mb-2 overflow-hidden">
                                <img
                                    src={`http://localhost:8000/storage/${category?.image}`}
                                    alt={category.name}
                                    fill
    
                                    className="transition-transform duration-300 w-full object-cover h-full group-hover:scale-110"
                                />
                            </div>
                            <p className="pb-2 pt-1">{category.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}