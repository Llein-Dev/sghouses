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
    console.log(keyword, area, priceRange, sizeRange);

    // Extract the area slug if area is an object
    const areaParam = typeof area === "object" && area !== null ? area.slug : area || "";

    // Handle priceRange
    let priceParam;
    if (typeof priceRange === "string") {
      priceParam = priceRange; // Use the string directly
    } else if (Array.isArray(priceRange) && priceRange.length === 2) {
      const minPrice = priceRange[0] || 0;
      const maxPrice = priceRange[1] || 20000000;
      priceParam = `${minPrice}to${maxPrice}`; // Construct from array
    } else {
      priceParam = `0to20000000`; // Default if neither
    }

    // Handle sizeRange
    let sizeParam;
    if (typeof sizeRange === "string") {
      sizeParam = sizeRange; // Use the string directly
    } else if (Array.isArray(sizeRange) && sizeRange.length === 2) {
      const minSize = sizeRange[0] || 0;
      const maxSize = sizeRange[1] || 100;
      sizeParam = `${minSize}to${maxSize}`; // Construct from array
    } else {
      sizeParam = `0to100`; // Default if neither
    }

    // Create query parameters
    const queryParams = new URLSearchParams({
      keyword: keyword || "",
      area: areaParam || "",
      price: priceParam,
      size: sizeParam,
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

    // Fetch search params từ localStorage
    const searchParams = JSON.parse(localStorage.getItem("searchParams")) || {};

    // Lấy dữ liệu từ localStorage hoặc state ban đầu
    const { keyword: savedKeyword, area: savedArea, price: savedPrice, size: savedSize } = searchParams;
    console.log(searchParams);

    setKeyword(savedKeyword || keyword);
    setArea(savedArea || area);

    await fetchRooms(
      savedKeyword || keyword,
      savedArea || area,
      savedPrice || `${priceRange[0]}to${priceRange[1]}`,
      savedSize || `${sizeRange[0]}to${sizeRange[1]}`
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
