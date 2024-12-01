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
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 20000000,
    [0]: 0,
    [1]: 20000000,
  });
  const [sizeRange, setSizeRange] = useState({
    min: 0,
    max: 100,
    [0]: 0,
    [1]: 100,
  });
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
        const response = await fetch(
          "http://localhost:8000/api/khu_vuc/option"
        );
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

  useEffect(() => {
    const searchParams = JSON.parse(localStorage.getItem("searchParams"));
    if (searchParams) {
      const { keyword, area, price, size } = searchParams;
      console.log(searchParams);

      // Set state based on localStorage values
      setKeyword(keyword || "");
      setArea(area || "");

      if (price) {
        const [minPrice, maxPrice] = price.split("to").map(Number);
        setPriceRange({
          min: minPrice || 0,
          max: maxPrice || 20000000,
          [0]: minPrice || 0,
          [1]: maxPrice || 20000000,
        });
      }

      if (size) {
        const [minSize, maxSize] = size.split("to").map(Number);
        setSizeRange({
          min: minSize || 0,
          max: maxSize || 100,
          [0]: minSize || 0,
          [1]: maxSize || 100,
        });
      }
    }
  }, []);

  const fetchRooms = async (keyword, areaParam, priceRange, sizeRange) => {
    const queryParams = new URLSearchParams({
      keyword: keyword || "",
      area: areaParam || "",
      price: `${priceRange[0]}to${priceRange[1]}`,
      size: `${sizeRange[0]}to${sizeRange[1]}`,
    }).toString();
    const response = await fetch(`http://localhost:8000/api/filter-room?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const data = await response.json();
    return data.list_room || [];
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    const areaParam = typeof area === "object" && area !== null ? area.slug : area || "";

    try {
      const rooms = await fetchRooms(keyword, areaParam, priceRange, sizeRange);
      onResultsUpdate(rooms);
    } catch (err) {
      console.error("Error fetching data:", err);
      onResultsUpdate([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-none md:rounded-xl shadow p-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
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

        {/* Area Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <MapIcon /> {area?.name || "Chọn khu vực"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
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
