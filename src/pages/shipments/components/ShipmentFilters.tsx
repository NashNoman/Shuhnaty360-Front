import { ShipmentFiltersType } from "@/api/shipments.api";
import {
  CityCombobox,
  ClientBranchCombobox,
  ClientCombobox,
  DriverCombobox,
  RecipientCombobox,
  StatusCombobox,
} from "@/components/comboboxes";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShipmentFiltersProps {
  initialFilters?: ShipmentFiltersType;
  onApply: (filters: ShipmentFiltersType) => void;
  onClear: () => void;
}

export function ShipmentFilters({
  initialFilters = {},
  onApply,
  onClear,
}: ShipmentFiltersProps) {
  const [tempFilters, setTempFilters] =
    useState<ShipmentFiltersType>(initialFilters);

  const handleFilterChange = (
    key: keyof ShipmentFiltersType,
    value: string | number | undefined,
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleClear = () => {
    setTempFilters({});
    onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(tempFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          السائق
        </label>
        <DriverCombobox
          value={tempFilters.driver}
          onChange={(value) =>
            handleFilterChange("driver", value ? Number(value) : undefined)
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          العميل
        </label>
        <ClientCombobox
          value={tempFilters.client}
          onChange={(value) =>
            handleFilterChange("client", value ? Number(value) : undefined)
          }
          className="w-full"
        />
      </div>

      {tempFilters.client && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الفرع
          </label>
          <ClientBranchCombobox
            clientId={tempFilters.client}
            value={tempFilters.client_branch}
            onChange={(value) =>
              handleFilterChange(
                "client_branch",
                value ? Number(value) : undefined,
              )
            }
            className="w-full"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          المستلم
        </label>
        <RecipientCombobox
          value={tempFilters.recipient}
          onChange={(value) =>
            handleFilterChange("recipient", value ? Number(value) : undefined)
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          حالة الشحنة
        </label>
        <StatusCombobox
          value={tempFilters.status}
          onChange={(value) =>
            handleFilterChange("status", value ? Number(value) : undefined)
          }
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            من مدينة
          </label>
          <CityCombobox
            type="origin"
            value={tempFilters.origin_city}
            onChange={(value) =>
              handleFilterChange(
                "origin_city",
                value ? Number(value) : undefined,
              )
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            إلى مدينة
          </label>
          <CityCombobox
            type="destination"
            value={tempFilters.destination_city}
            onChange={(value) =>
              handleFilterChange(
                "destination_city",
                value ? Number(value) : undefined,
              )
            }
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-700 border-gray-300"
          onClick={handleClear}
        >
          مسح الكل
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          تطبيق
        </Button>
      </div>
    </form>
  );
}
