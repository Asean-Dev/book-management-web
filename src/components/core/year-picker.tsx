"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export function YearPicker({ label, name }: { label: string; name: string }) {
  const { setValue, getValues } = useFormContext();
  const [selectedYear, setSelectedYear] = useState<Date | null>(new Date());

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="year-picker">{label}</Label>
      <DatePicker
        id="year-picker"
        selected={selectedYear}
        value={getValues(name)}
        onChange={(date) => {
          setSelectedYear(date);
          setValue(name, Number(date?.getFullYear() || getValues(name)));
        }}
        showYearPicker
        dateFormat="yyyy"
        className={cn(
          "h-[40px] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
      />
    </div>
  );
}
