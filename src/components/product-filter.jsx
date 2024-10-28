"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const filterCategories = [
  {
    name: "Tiện nghi",
    options: [
      { id: "thang mai", label: "Thang máy" },
      { id: "thang bo", label: "Thang bộ" },
      { id: "bao ve an ninh 24 7", label: "Bảo vệ an ninh 24/7" },
      { id: "khu giat giu tren san thuong", label: "Khu giặt giũ trên sân thượng" },
      { id: "camera an ninh", label: "Camera an ninh" },
      { id: "cong toa nha mo khoa bang van tay", label: "Cổng tòa nhà mở khóa bằng vân tay" },
      { id: "gio giac tu do", label: "Giờ giấc tự do" },
      { id: "cho nuoi thu cung", label: "Cho nuôi thú cưng" },
    ],
  },
  {
    name: "Tiện ích",
    options: [
      { id: "bach hoa xanh", label: "Bách Hóa Xanh" },
      { id: "tram xa", label: "Trạm xá" },
      { id: "truong hoc", label: "Trường học" },
      { id: "sieu thi", label: "Siêu thị" },
      { id: "ben xe", label: "Bến xe" },
    ],
  },
  {
    name: "Tình trạng",
    options: [
      { id: "co", label: "Có phòng trống" },
    ],
  },
];

// Nhận một hàm callback để xử lý các bộ lọc đã chọn
export function ProductFilter({ onFilterChange }) {
  const [openCategories, setOpenCategories] = useState(
    filterCategories.map((category) => category.name)
  );
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];
      // Gọi hàm callback để thông báo về các bộ lọc đã thay đổi
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <Card className="w-full max-w-sm border-none shadow-md py-5">
      <CardHeader>
        <CardTitle>
          <div className="justify-center text-[#00008B] flex">
            <Filter className="mr-4" />
            Lọc kết quả nhanh
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filterCategories.map((category) => (
          <div key={category.name} className="mb-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-lg"
              onClick={() => toggleCategory(category.name)}
            >
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
                      onCheckedChange={() => toggleFilter(option.id)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
