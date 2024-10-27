'use client';

import { Clock, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function BlogCard({
    id,
    image,
    title,
    name_cate,
    body,
    slug
}) {
    return (
        <Card className="overflow-hidden bg-white">
            <div className="relative w-full aspect-video mb-2 overflow-hidden">
                <img src={image} alt={title} />
            </div>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> {name_cate}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Eye className="w-4 h-4 mr-1" /> {id}
                    </p>
                </div>
                {/* Wrap title in a Link */}
                <Link href={`/blog/${slug}`}>
                    <h3 className="text-lg font-semibold mb-2 cursor-pointer">{title}</h3>
                </Link>
            </CardContent>
        </Card>
    );
}
