import React, { useEffect, useRef, useState } from "react";

export type AutocompleteSelectFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string | string[];
  name?: string;
  error?: string;
  options: { value: string; label: string }[];
};

const AutocompleteSelectField = ({
  value,
  onChange,
  placeholder = "",
  label,
  description,
  name,
  error,
  options,
}: AutocompleteSelectFieldProps) => {
  const [inputValue, setInputValue] = useState(
    options.find((o) => o.value === value)?.label || ""
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const selected = options.find((o) => o.value === value);
    if (selected && selected.label !== inputValue) {
      setInputValue(selected.label);
    }
    if (!value) setInputValue("");
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option: { value: string; label: string }) => {
    setInputValue(option.label);
    setShowDropdown(false);
    if (onChange) onChange(option.value);
  };

  return (
    <div className="col-span-1 flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label className="text-xl mb-2 text-[#1A1A1A]" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className={`p-2 text-lg border ${
            error ? "border-red-500" : "border-[#CCCCCC]"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] w-full bg-white`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
        />
        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-[#CCCCCC] rounded-lg shadow-lg max-h-56 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-lg"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="text-red-500 mt-1 text-sm">{error}</span>}
      {description && (
        <div className="text-[#999] font-Rubik text-sm">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li key={index} className="text-[#666666]">
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSelectField;
