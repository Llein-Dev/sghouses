"use client"

import { ProductCardRowComponent } from "@/components/product-card-row";
import { ProductFilter } from "@/components/product-filter";

import Breadcrumb from "@/components/breadcum";
import { products } from "@/utils/data";

export default function ProductPage() {

    const productCount = products.length;

    return (
        <>
            <div className="container mx-auto p-4 pt-8"><Breadcrumb /></div>
            <div className="container mx-auto">
                <div className="flex flex-col-reverse md:flex-row gap-8 px-4">
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
