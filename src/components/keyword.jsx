import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function KeywordComponents({ keyword }) {
    return (
        <Link
            href={`/search?q=${encodeURIComponent(keyword)}`}
            className="border border-white flex items-center text-white px-3 py-1 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-white hover:text-[#00008B] "
        >
            <Search className='mr-2 h-4 w-4' /> {keyword}
        </Link>
    );
}
