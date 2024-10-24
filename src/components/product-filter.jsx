"use client";
import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const filterCategories = [
  {
    name: "Diện tích",
    options: [
      { id: "1", label: "Dưới 20m²" },
      { id: "2", label: "20m² - 30m²" },
      { id: "3", label: "30m² - 50m²" },
      { id: "4", label: "Trên 50m²" },
    ],
  },
  {
    name: "Tiện ích",
    options: [
      { id: "amenity-pool", label: "Hồ bơi" },
      { id: "amenity-gym", label: "Phòng gym" },
      { id: "amenity-parking", label: "Bãi đậu xe" },
      { id: "amenity-security", label: "An ninh 24/7" },
    ],
  },
  {
    name: "Khu vực",
    options: [
      { id: "area-district-1", label: "Quận 1" },
      { id: "area-district-2", label: "Quận 2" },
      { id: "area-district-3", label: "Quận 3" },
      { id: "area-district-4", label: "Quận 4" },
    ],
  },
]

export function ProductFilter() {
  const [openCategories, setOpenCategories] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName])
  }

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId])
  }

  return (
    (<Card className="w-full max-w-sm border-none shadow-md py-5">
      <CardHeader>
        <CardTitle><div className=" justify-center text-[#00008B]  flex "><Filter className="mr-4" />Lọc kết quả nhanh</div></CardTitle>
      </CardHeader>
      <CardContent>
        {filterCategories.map((category) => (
          <div key={category.name} className="mb-4">
            <Button
              variant="ghost"
              size-
              className="w-full justify-between text-lg"
              onClick={() => toggleCategory(category.name)}>
              {category.name}
              {openCategories.includes(category.name) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            {openCategories.includes(category.name) && (
              <div className="mt-4 ml-4 space-y-4">
                {category.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedFilters.includes(option.id)}
                      onCheckedChange={() => toggleFilter(option.id)} />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>)
  );
}