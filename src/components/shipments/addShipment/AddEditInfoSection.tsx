import AddShipmentInput from "./addShipmentInputs/AddShipmentInput";
import trashIcon from "../../../assets/images/trash.svg";
import AddShipmentSelectMenu from "./addShipmentInputs/AddShipmentSelectMenu";
import { useEffect, useState } from "react";

const AddEditInfoSection = ({
  title,
  inputs,
  value,
  onChange,
  options,
  branchOptions,
  initiallySelectedClientBranchId,
  section,
  handleClientRecipientChange,
  clientRecipientSelectMenuValue,
  isEditClientPage = false,
  selectMenuSelectedDriver,
  selectedOriginCity,
  selectedDestinationCity,
  initiallySelectedTruckType,
  isDriver = false,
  truckTypeOptions,
  shipmentsStatusOptions,
  initiallySelectedShipmentStatus,
}: any) => {
  const sharedStyles = "w-full grid gap-10 my-10";
  const [originCity, setOriginCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedTruckType, setSelectedTruckType] = useState<any>(null);
  const [selectedShipmentStatus, setSelectedShipmentStatus] =
    useState<any>(null);

  useEffect(() => {
    if (selectedDriver && selectedDriver.truck_type) {
      const matchingType = truckTypeOptions.find(
        (truckType: any) => truckType.id === selectedDriver.truck_type,
      );
      if (matchingType) {
        setSelectedTruckType(matchingType);
        onChange({
          target: {
            name: "vehicleType",
            value: matchingType.id,
          },
        });
      }
    }
  }, [selectedDriver, truckTypeOptions, onChange]);

  const handleCityChange = (type: "origin" | "destination", selected: any) => {
    if (type === "origin") {
      setOriginCity(selected);
    } else {
      setDestinationCity(selected);
    }
    if (selected) {
      onChange({
        target: {
          name: "city",
          value: {
            pickupPointId: type === "origin" ? selected.id : undefined,
            dropOffPointId: type === "destination" ? selected.id : undefined,
          },
        },
      });
    }
  };

  const handleDriverChange = (selected: any) => {
    if (!selected) {
      setSelectedDriver(null);
      return;
    }

    const driverUpdates = {
      selectedDriver: selected,
      formUpdates: {
        driverId: selected.id,
        driverPhone: selected.phone_number || "",
        vehicleType: selected.truck_type || "",
        vehicleNumber: selected.vehicle_number || "",
      },
    };

    setSelectedDriver(driverUpdates.selectedDriver);
    onChange({
      target: {
        name: section,
        value: driverUpdates.formUpdates,
      },
    });
  };

  const handleClientBranchChange = (selected: any) => {
    if (!selected) {
      setSelectedBranchId(null);
      return;
    }

    setSelectedBranchId(selected.id);
    onChange({
      target: {
        name: "clientBranchId",
        value: selected.id,
      },
    });
  };

  const handleTruckTypeChange = (selected: any) => {
    if (!selected) {
      setSelectedTruckType(null);
      return;
    }
    setSelectedTruckType(selected);
    onChange({
      target: {
        name: "vehicleType",
        value: selected.id,
      },
    });
  };

  useEffect(() => {
    setSelectedDriver(selectMenuSelectedDriver);
    setOriginCity(selectedOriginCity);
    setDestinationCity(selectedDestinationCity);
    setSelectedBranchId(initiallySelectedClientBranchId);
  }, [
    selectMenuSelectedDriver,
    selectedOriginCity,
    selectedDestinationCity,
    initiallySelectedClientBranchId,
  ]);

  useEffect(() => {
    setSelectedTruckType(initiallySelectedTruckType);
  }, [initiallySelectedTruckType]);

  useEffect(() => {
    setSelectedShipmentStatus(
      initiallySelectedShipmentStatus ||
        shipmentsStatusOptions?.find((status: any) => status.id === 29),
    );
  }, [initiallySelectedShipmentStatus, shipmentsStatusOptions]);

  const handleShipmentStatusChange = (selected: any) => {
    if (!selected) {
      setSelectedShipmentStatus(null);
      return;
    }
    setSelectedShipmentStatus(selected);
    onChange({
      target: {
        name: "shipmentStatus",
        value: selected.id,
      },
    });
  };

  return (
    <>
      {isEditClientPage ? (
        <div className="w-full flex items-center justify-between ">
          <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
          <button className="flex items-center gap-2">
            <span className="font-Rubik text-[#DD7E1F] text-sm">حذف الفرع</span>
            <img src={trashIcon} alt="delete branch" />
          </button>
        </div>
      ) : (
        title && <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
      )}
      <div className={`${sharedStyles} grid-cols- md:grid-cols-2`}>
        {section !== "cost" ? (
          section === "shipment" ? (
            <>
              <AddShipmentSelectMenu
                options={options}
                label={inputs[0].label}
                title="المدينة"
                onChange={(selected) => handleCityChange("origin", selected)}
                value={originCity}
                section={section}
              />
              <AddShipmentSelectMenu
                options={options}
                label={inputs[1].label}
                title="المدينة"
                onChange={(selected) =>
                  handleCityChange("destination", selected)
                }
                value={destinationCity}
                section={section}
              />
            </>
          ) : (
            (section === "driver" ||
              section === "client" ||
              section === "recipient") && (
              <AddShipmentSelectMenu
                options={options}
                label={inputs[0].label}
                title={title}
                onChange={
                  section === "driver"
                    ? handleDriverChange
                    : handleClientRecipientChange
                }
                value={
                  section === "driver"
                    ? selectedDriver
                    : clientRecipientSelectMenuValue
                }
                section={section}
              />
            )
          )
        ) : null}
        {section === "client" && (
          <AddShipmentSelectMenu
            options={branchOptions}
            label="الفرع"
            title="فرع العميل"
            onChange={(selected) => handleClientBranchChange(selected)}
            value={
              branchOptions.find(
                (branch: { id: any }) => branch.id === selectedBranchId,
              ) || null
            }
          />
        )}
        {inputs
          .slice(
            section === "shipment" || section === "driver"
              ? 2
              : section === "client" || section === "recipient"
                ? 1
                : 0,
          )
          .map((input: any, index: any) => {
            const { name, label, isRequired, type, description } = input;
            return (
              <AddShipmentInput
                key={index}
                label={label}
                name={name}
                value={value?.[name] ?? ""}
                onChange={onChange}
                description={description}
                type={type}
                options={options}
                required={isRequired}
              />
            );
          })}
        {isDriver && (
          <AddShipmentSelectMenu
            options={truckTypeOptions}
            label={"نوع الشاحنة"}
            title={"الشاحنة"}
            onChange={(selected) => handleTruckTypeChange(selected)}
            value={
              truckTypeOptions.find(
                (option: any) => option.id === selectedTruckType?.id,
              ) || null
            }
            section={section}
            isDriver={isDriver}
          />
        )}
        {section === "shipment" && (
          <AddShipmentSelectMenu
            options={shipmentsStatusOptions}
            label={"حالة الشحنة"}
            title={"الحالة"}
            onChange={(selected) => handleShipmentStatusChange(selected)}
            value={
              shipmentsStatusOptions.find(
                (option: any) => option.id === selectedShipmentStatus?.id,
              ) || null
            }
            isShipmentStatus={true}
          />
        )}
      </div>
    </>
  );
};

export default AddEditInfoSection;
