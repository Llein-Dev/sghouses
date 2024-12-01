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
          throw new Error("Cannot fetch data from API");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Cannot fetch data from API");
      }
    };

    fetchLocations();
  }, []);

  // Function to fetch room data
  const fetchRooms = async (keyword, area, priceRange, sizeRange) => {
    const areaParam = typeof area === "object" && area !== null ? area.slug : area || "";
    const queryParams = new URLSearchParams({
      keyword: keyword || "",
      area: areaParam || "",
      price: `${priceRange.min || 0}to${priceRange.max || 20000000}`,
      size: `${sizeRange.min || 0}to${sizeRange.max || 100}`,
    }).toString();

    try {
      const response = await fetch(`http://localhost:8000/api/filter-room?${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        onResultsUpdate([]); // Return early if response not ok
        return;
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

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    // Fetch search params from localStorage
    const searchParams = JSON.parse(localStorage.getItem("searchParams")) || {};

    // Update state based on localStorage or initial props
    const { keyword: savedKeyword, area: savedArea, price: savedPrice, size: savedSize } = searchParams;
  
    setKeyword(savedKeyword || keyword);
    setArea(savedArea || area);

    if (savedPrice) {
      const [minPrice, maxPrice] = savedPrice.split("to").map(Number);
      setPriceRange({ min: minPrice || 0, max: maxPrice || 20000000 });
    }

    if (savedSize) {
      const [minSize, maxSize] = savedSize.split("to").map(Number);
      setSizeRange({ min: minSize || 0, max: maxSize || 100 });
    }

    // Call the fetchRooms function with parameters from localStorage or component state
    await fetchRooms(
      savedKeyword || keyword,
      savedArea || area,
      priceRange,
      sizeRange
      
    );
    localStorage.removeItem("searchParams");
  };

  useEffect(() => {
    handleSearch();

  }, []);

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
