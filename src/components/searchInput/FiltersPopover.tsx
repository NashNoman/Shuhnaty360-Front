import filterIcon from "../../assets/images/filter.svg";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import * as React from "react";

interface FiltersPopoverProps {
  children: React.ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  triggerClassName?: string;
  contentClassName?: string;
}

export default function FiltersPopover({
  children,
  onApply,
  onClear,
  // triggerClassName,
  contentClassName,
}: FiltersPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const handleApply = () => {
    onApply?.();
    setOpen(false);
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <img src={filterIcon} />
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-80 p-0", contentClassName)}
        align="end"
        sideOffset={8}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-right">تصفية النتائج</h3>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </Button>
          </div>

          <div className="space-y-4">{children}</div>

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-300"
              onClick={handleClear}
            >
              مسح الكل
            </Button>
            <Button size="sm" onClick={handleApply}>
              تطبيق
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
