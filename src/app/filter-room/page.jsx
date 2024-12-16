"use client";

import { useEffect, useState } from "react";
import { ProductCardRowComponent } from "@/components/product-card-row";
import Breadcrumb from "@/components/breadcum";
import { Spinner } from "@/components/ui/loading";

import { useFetchCategories } from "@/utils/api/GET/api";
import { SearchFilterComponent } from "@/components/search-bar-filter copy";
import Link from "next/link";
import { RoomCardRowComponent } from "@/components/room-card-row";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function FilterPage() {
    const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories(); // Sử dụng custom hook
    const [roomResults, setRoomResults] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [sortOrder, setSortOrder] = useState(""); // Thêm state cho sắp xếp
    const [loadingsearch, setLoadingsearch] = useState(false);

    const handleResultsUpdate = (data) => {
        setRoomResults(data); // Cập nhật kết quả nhận từ SearchFilterComponent
        setProductCount(data.length); // Cập nhật số lượng kết quả
    };

    // Hàm xử lý sắp xếp
    const handleSort = (order) => {
        setSortOrder(order); // Cập nhật thứ tự sắp xếp
        const sortedResults = [...roomResults].sort((a, b) => {
            switch (order) {
                case "price-asc":
                    return a.gia_thue - b.gia_thue;
                case "price-desc":
                    return b.gia_thue - a.gia_thue;
                case "name-asc":
                    return a.ten_phong.localeCompare(b.ten_phong);
                case "name-desc":
                    return b.ten_phong.localeCompare(a.ten_phong);
                default:
                    return 0;
            }
        });
        setRoomResults(sortedResults);
    };

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
                        {/* Dropdown sắp xếp */}
                        <div>
                            <label htmlFor="sort-order" className="text-md mr-2">Sắp xếp theo:</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full md:w-auto">
                                        Sắp xếp theo <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuItem onClick={() => handleSort("")}>Mặc định</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSort("price-asc")}>Giá tăng dần</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSort("price-desc")}>Giá giảm dần</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSort("name-asc")}>Tên A-Z</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSort("name-desc")}>Tên Z-A</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${category?.image}`}
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
