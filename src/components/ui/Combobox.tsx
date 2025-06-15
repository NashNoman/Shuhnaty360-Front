import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";

type Option = {
  value: string | number;
  label: string | ReactNode;
};

export type ComboboxProps = {
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string;
  popoverClassName?: string;
  disabled?: boolean;
};

export function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "",
  searchPlaceholder = "",
  notFoundText = "لا توجد خيارات متاحة.",
  className = "w-[200px]",
  popoverClassName = "w-[200px] p-0",
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedOption = options.find(
    (option) => String(option.value) === String(value),
  );
  const filteredOptions = options.filter((option) =>
    option.label?.toString().toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSelect = (currentValue: string) => {
    const selectedOption = options.find(
      (opt) => String(opt.value) === currentValue,
    );
    if (!selectedOption) return;

    const newValue = currentValue === String(value) ? "" : selectedOption.value;
    onChange?.(String(newValue));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between flex-row-reverse", className)}
          disabled={disabled}
        >
          <span className="truncate text-right">
            {selectedOption?.label || placeholder}
          </span>
          <ChevronsUpDownIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={popoverClassName} align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value.toString()}
                  onSelect={handleSelect}
                  className="cursor-pointer"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
