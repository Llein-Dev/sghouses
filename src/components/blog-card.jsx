'use client';

import { Clock, Eye } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function Blog_card({
    image,
    title,
    date,
    view
}) {
    return (
        (<Card className="overflow-hidden">
            <div className="relative w-full aspect-video mb-2 overflow-hidden ">
                <img src={image} alt="" />
            </div>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> {date}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Eye className="w-4 h-4 mr-1" /> {view}
                    </p>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0">
            </CardFooter>
        </Card>)
    );
}