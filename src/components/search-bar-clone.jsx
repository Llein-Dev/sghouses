"use client"

import { useState } from "react"
import { Search, ChevronDown, Building, MapIcon, Filter, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function SearchBarComponentClone() {
  const [keyword, setKeyword] = useState("")
  const [area, setArea] = useState("khu vực")
  const [building, setBuilding] = useState("tòa nhà")
  const [price, setPrice] = useState("mức giá")
  const [size, setSize] = useState("diện tích")
  const router = useRouter()

  const handleSearch = () => {
    console.log("Searching with:", { keyword, area, building, price, size })
    router.push("/filter")
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
    <div className="md:transform w-full max-w-10xl bg-[#00008B] rounded-none md:rounded-xl shadow-lg p-4 ">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Label htmlFor="keyword" className="sr-only">
            Từ khóa
          </Label>
          <Input
            id="keyword"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full"
          />
        </div>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <MapIcon /> {area} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[" khu vực", "Khu vực A", "Khu vực B", "Khu vực C"].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setArea(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Building /> {building} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[" tòa nhà", "Tòa nhà X", "Tòa nhà Y", "Tòa nhà Z"].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setBuilding(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter /> {price} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[" mức giá", "Dưới 1 tỷ", "1-2 tỷ", "2-3 tỷ", "Trên 3 tỷ"].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setPrice(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Box /> {size} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[" diện tích", "Dưới 50m²", "50-100m²", "100-150m²", "Trên 150m²"].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setSize(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
  
        <Button onClick={handleSearch} variant="orange" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Tìm kiếm
        </Button>
      </div>
    </div>
  </div>
  
  );
}