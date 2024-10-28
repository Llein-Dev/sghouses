"use client"

import Link from "next/link";

export default function VerticalCategory({ categories }) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-6 container mx-auto justify-center gap-6 mb-12 ">
                {categories.map((category, index) => (
                    <Link key={index} href={`/filter?area=${category.slug}`} className="flex w-full overflow-hidden rounded-lg shadow flex-col items-center group">
                        <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden">
                            <img
                                src={`http://localhost:8000/storage/${category?.image}`}
                                alt={category.name}
                                fill
                                style={{ objectFit: 'cover' }} // Sử dụng style thay cho objectFit
                                className="transition-transform duration-300 h-full group-hover:scale-110"
                            />
                        </div>
                        <p className="pb-2 pt-1">{category.name}</p>
                    </Link>
                ))}
            </div>

        </>
    );
}
