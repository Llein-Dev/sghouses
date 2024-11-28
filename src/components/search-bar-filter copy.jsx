import { useState, useEffect } from "react";
import { Search, ChevronDown, MapIcon, Filter, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RangeBox } from "./range-box";

export function SearchFilterComponent({ onResultsUpdate, setLoading }) {
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000, [0]: 0, [1]: 20000000 });
  const [sizeRange, setSizeRange] = useState({ min: 0, max: 100, [0]: 0, [1]: 100 });
  const [error, setError] = useState("");
  const [locations, setLocations] = useState([]);
  const handleRangedientich = (newRange) => {
    setSizeRange(newRange);
  };

  const handleRangeValue = (newRange) => {
    setPriceRange(newRange);
  };
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

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    const queryParams = new URLSearchParams({
      keyword: keyword,
      area: area ? area.slug : "",
      price: `${priceRange[0]}to${priceRange[1]}`,
      size: `${sizeRange[0]}to${sizeRange[1]}`,
    }).toString();

    try {
      const response = await fetch(`http://localhost:8000/api/filter-room?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        onResultsUpdate([]);
      }

      const data = await response.json();
      onResultsUpdate(data.list_room || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      onResultsUpdate([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Gọi tìm kiếm khi giá trị thay đổi
  }, [keyword, area, priceRange, sizeRange]); // Gọi tìm kiếm khi những giá trị này thay đổi

  return (
    <div className="w-full bg-white rounded-none md:rounded-xl shadow p-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Label htmlFor="keyword" className="sr-only">Từ khóa</Label>
          <Input
            id="keyword"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Area Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
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
            <Button variant="outline" className="w-full md:w-auto">
              <Filter /> Mức giá <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <RangeBox
              min={0}
              max={20000000}
              step={10}
              label="Mức giá"
              onRangeChange={handleRangeValue}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Box /> Diện tích <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <RangeBox
              min={0}
              max={100}
              step={10}
              label="Diện tích"
              onRangeChange={handleRangedientich}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="submit" variant="orange" className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" /> Tìm kiếm
        </Button>
      </form>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
