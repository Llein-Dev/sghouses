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
import { locations } from "@/utils/data";

export function SearchFilterComponent({ onResultsUpdate, setLoading }) {
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState({ min: 0, max: 20000000 });
  const [size, setSize] = useState({ min: 0, max: 100 });
  const [error, setError] = useState("");

  // Function to perform the search
  const handleSearch = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission if e is provided

    setLoading(true);
    setError(""); // Reset the error

    // Prepare the query parameters
    const queryParams = new URLSearchParams({
      keyword,
      area,
      price: `${price.min}to${price.max}`,
      size: `${size.min}to${size.max}`,
    }).toString();

    try {
      // Make the GET API request, appending the query parameters to the URL
      const response = await fetch(`http://localhost:8000/api/filter-room?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Check if data has list_room and send the results to the parent component
      if (data.list_room) {
        onResultsUpdate(data.list_room); // Call the parent function to update the results
      } else {
        onResultsUpdate([]); // Clear results if no list_room is found
      }
    } catch (err) {
      setError(err.message); // Set any error message
    } finally {
      setLoading(false);
    }
  };

  // Handle range value updates
  const handleRangeValue = (value) => {
    setPrice({ ...price, min: value[0], max: value[1] });
  };

  const handleRangedientich = (value) => {
    setSize({ ...size, min: value[0], max: value[1] });
  };

  // Automatically trigger search when component mounts
  useEffect(() => {
    handleSearch(); // Trigger search on initial load
  }, []); // Empty dependency array ensures this runs only once, on mount

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <MapIcon /> {area || "Chọn khu vực"} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {locations.map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setArea(item)}>
                {item}
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
