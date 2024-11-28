"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, MapIcon, Filter, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RangeBox } from "./range-box"


export function SearchBarComponent() {
  const [keyword, setKeyword] = useState("")
  const [area, setArea] = useState("khu vực")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000, [0]: 0, [1]: 20000000 });
  const [sizeRange, setSizeRange] = useState({ min: 0, max: 100, [0]: 0, [1]: 100 });
  const router = useRouter()
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/khu_vuc/option');
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ API");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError("Không thể lấy dữ liệu từ API");
      }
    };

    fetchLocations();
  }, []);
  const handleSearch = () => {

    // Lưu dữ liệu vào localStorage
    const params = {
      keyword,
      area: area ? area.slug : "",
      price: `${priceRange[0]}to${priceRange[1]}`,
      size: `${sizeRange[0]}to${sizeRange[1]}`,
    };
  
    localStorage.setItem('searchParams', JSON.stringify(params)); // Lưu vào localStorage
  
    // Chuyển đến trang filter
    router.push('/filter-room');
  };
  
  const handleSizeChange = (newRange) => {
    setSizeRange(newRange);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  return (
    <div className="md:absolute relative md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-6xl bg-[#00008B] rounded-none md:rounded-xl shadow-lg p-4 z-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Label htmlFor="keyword" className="sr-only">
            Từ khóa
          </Label>
          <Input
            size="lg"
            id="keyword"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full" />
        </div>

    {/* Area Dropdown */}
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-12 w-full md:w-auto">
              <MapIcon /> {area?.name || "Chọn khu vực"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {locations.map((item) => (
              <DropdownMenuItem key={item.id} onSelect={() => setArea(item)}>
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12 w-full md:w-auto">
              <Filter /> Mức giá <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <RangeBox
              min={0}
              max={20000000}
              step={10}
              label="Mức giá"
              onRangeChange={handlePriceChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12 w-full md:w-auto">
              <Box /> Diện tích <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <RangeBox
              min={0}
              max={100}
              step={10}
              label="Diện tích"
              onRangeChange={handleSizeChange}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleSearch} variant="orange" className="w-full h-12 md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
