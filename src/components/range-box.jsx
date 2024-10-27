"use client";
import { useState, useEffect } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RangeBox({
  min = 0,
  max = 1000,
  step = 1,
  label = "Range",
  unit = "",
  onRangeChange, // Add callback prop for parent component
}) {
  const [range, setRange] = useState([min, max]);

  useEffect(() => {
    setRange([min, max]);
  }, [min, max]);

  // Call onRangeChange whenever range updates
  useEffect(() => {
    if (onRangeChange) {
      onRangeChange(range); // Send updated range to parent
    }
  }, [range, onRangeChange]);

  const handleSliderChange = (newValues) => {
    setRange(newValues);
  };

  const handleInputChange = (index, value) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(numericValue)) {
      const newRange = [...range];
      if (index === 0) {
        newRange[index] = Math.max(min, Math.min(range[1], numericValue));
      } else {
        newRange[index] = Math.max(range[0], Math.min(max, numericValue));
      }
      setRange(newRange);
    }
  };

  const formatCurrency = (number) =>
    new Intl.NumberFormat("vi-VN").format(number);

  return (
    <div className="w-full max-w-sm p-4">
      <Label htmlFor="range-slider" className="text-lg font-semibold mb-2 block">
        {label}
      </Label>
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5 mb-4"
        min={min}
        max={max}
        step={step}
        value={range}
        onValueChange={handleSliderChange}
        aria-label={label}
      >
        <SliderPrimitive.Track className="bg-slate-100 relative grow rounded-full h-2">
          <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-5 h-5 bg-primary rounded-full shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Minimum value"
        />
        <SliderPrimitive.Thumb
          className="block w-5 h-5 bg-primary rounded-full shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Maximum value"
        />
      </SliderPrimitive.Root>
      <div className="flex justify-between items-center">
        <div className="w-2/5">
          <Label htmlFor="min-value" className="text-sm font-medium">Thấp nhất</Label>
          <Input
            id="min-value"
            type="text"
            value={formatCurrency(range[0])} // Format for display
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="w-2/5">
          <Label htmlFor="max-value" className="text-sm font-medium">Cao nhất</Label>
          <Input
            id="max-value"
            type="text"
            value={formatCurrency(range[1])} // Format for display
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      {unit && (
        <p className="text-sm text-gray-500 mt-2 text-right">
          Values in {unit}
        </p>
      )}
    </div>
  );
}
