'use client'

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RoomComponents from "@/components/roomCard";
import CommentComponent from "@/components/Comment";
import { products } from "@/utils/data";
import { ProductCardColComponent } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/breadcum";

export default function BuildingDetailComponent() {
  return (
    (<div className="container mx-auto px-4 space-y-4 py-4">
      <Breadcrumb />
      <Card className="">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-bold mb-2">Sunshine Apartment Complex</h1>
            <Badge variant="secondary">Luxury Living</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4 h-full flex flex-col">
              <Image
                src="/background-phong-khach-dep-3.jpg?height=300&width=600"
                alt="Building front view"
                width={600}
                height={300}
                className="w-full rounded-lg flex-1 object-cover" />
              <Image
                src="/background-phong-khach-dep-3.jpg?height=300&width=600"
                alt="Building side view"
                width={600}
                height={300}
                className="w-full rounded-lg flex-1 object-cover" />
            </div>
            <div className="space-y-4 h-full flex flex-col">
              <Image
                src="/background-phong-khach-dep-3.jpg?height=200&width=300"
                alt="Interior view 1"
                width={300}
                height={200}
                className="w-full rounded-lg flex-1 object-cover" />
              <Image
                src="/background-phong-khach-dep-3.jpg?height=200&width=300"
                alt="Interior view 2"
                width={300}
                height={200}
                className="w-full rounded-lg flex-1 object-cover" />
              <Image
                src="/background-phong-khach-dep-3.jpg?height=200&width=300"
                alt="Interior view 3"
                width={300}
                height={200}
                className="w-full rounded-lg flex-1 object-cover" />
            </div>
          </div>
        </CardContent>

      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          Sunshine Apartment Complex offers luxurious living in the heart of the city. With modern amenities and stunning views, it's the perfect place to call home. Our apartments feature spacious layouts, high-end finishes, and energy-efficient appliances.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Common Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>24/7 Security</li>
              <li>Fitness Center</li>
              <li>Swimming Pool</li>
              <li>Rooftop Garden</li>
              <li>Parking Garage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>123 Sunshine Boulevard, Cityville</li>
              <li>Adjacent to Central Park</li>
              <li>5 minutes from Downtown Shopping District</li>
              <li>Near Public Transportation Hub</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RoomComponents />
            <RoomComponents />
          </div>
        </CardContent>

      </Card>
      <CommentComponent />
      <div className="px-4 space-y-8 py-12 flex flex-col justify-center items-center container mx-auto">
        <h2 className="text-center w-full font-bold text-2xl text-[#00008B]">Phòng trọ <span className="text-[#FF5C00]">nổi bật</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 mb-12">
          {products.map((product, index) => (
            <ProductCardColComponent key={index} {...product} />
          ))}
        </div>
        <Button className="w-36" variant="blue">Xem chi tiết <ArrowRight /></Button>
      </div>



    </div>)
  );
}