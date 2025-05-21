import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import boxSearch from "../assets/images/box-search.svg";
import boxTime from "../assets/images/box-time.svg";
import message from "../assets/images/message.svg";
import HorizontalChart from "../components/charts/HorizontalChart";
import LineChartComponent from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { useSidebar } from "../context/SidebarContext";
import { RootState } from "../redux/store";

function parseShipmentDate(dateStr: string): Date {
  return new Date(dateStr?.replace(" ", "T"));
}

function getDeliveredShipmentsChartData(
  deliveredShipments: any[],
  range: string,
) {
  const { start, end } = getRangeDates(range);
  let labels: string[] = [];
  let data: number[] = [];

  if (range === "أسبوعي") {
    labels = [
      "السبت",
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
    ];
    data = Array(7).fill(0);

    deliveredShipments.forEach((shipment: any) => {
      const date = parseShipmentDate(
        shipment.expected_arrival_date || shipment.actual_delivery_date,
      );
      if (date >= start && date <= end) {
        let dayIdx = date.getDay();
        dayIdx = dayIdx === 6 ? 0 : dayIdx + 1;
        data[dayIdx]++;
      }
    });
  }

  if (range === "شهري") {
    labels = ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4", "الأسبوع 5"];
    data = Array(5).fill(0);

    deliveredShipments.forEach((shipment: any) => {
      const date = parseShipmentDate(
        shipment.expected_arrival_date || shipment.actual_delivery_date,
      );
      if (date >= start && date <= end) {
        const day = date.getDate();
        const weekOfMonth = Math.floor((day - 1) / 7);
        data[weekOfMonth]++;
      }
    });
    if (data[4] === 0) {
      labels = labels.slice(0, 4);
      data = data.slice(0, 4);
    }
  }

  if (range === "سنوي") {
    labels = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    data = Array(12).fill(0);

    deliveredShipments.forEach((shipment: any) => {
      const date = parseShipmentDate(
        shipment.expected_arrival_date || shipment.actual_delivery_date,
      );
      if (date >= start && date <= end) {
        const month = date.getMonth();
        data[month]++;
      }
    });
  }

  return {
    labels,
    datasets: [
      {
        label: "تم التوصيل",
        data,
        fill: {
          target: "origin",
          above: "rgba(221, 126, 31, 0.1)",
        },
        borderColor: "#DD7E1F",
        backgroundColor: "rgba(221, 126, 31, 0.3)",
      },
    ],
  };
}

function getRangeDates(range: string): { start: Date; end: Date } {
  const now = new Date();
  let start: Date;
  let end: Date;

  if (range === "أسبوعي") {
    const day = now.getDay();
    const diff = day === 6 ? 0 : (day + 1) % 7;
    start = new Date(now);
    start.setDate(now.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (range === "شهري") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    // End is last day of month
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (range === "سنوي") {
    start = new Date(now.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    end = new Date(now.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
  } else {
    start = new Date(now);
    end = new Date(now);
  }

  return { start, end };
}

function getFilteredDeliveredShipments(
  deliveredShipments: any[],
  range: string,
) {
  const { start, end } = getRangeDates(range);
  return deliveredShipments.filter((shipment: any) => {
    const date = parseShipmentDate(
      shipment.expected_arrival_date || shipment.actual_delivery_date,
    );
    return date >= start && date <= end;
  });
}

function formatDate(date: Date) {
  if (!date) return "";
  return date.toLocaleDateString("ar-EG");
}

const Dashboard = React.memo(() => {
  const { isSidebarOpen } = useSidebar();
  const [selectedRange, setSelectedRange] = useState("أسبوعي");
  const shipments = useSelector(
    (state: RootState) => state.shipments.shipments,
  );
  const returnedShipments = shipments.filter(
    (shipment: any) => shipment.status === "مرتجعة",
  );
  const { start, end } = useMemo(
    () => getRangeDates(selectedRange),
    [selectedRange],
  );

  const filteredShipments = useMemo(
    () =>
      shipments.filter((shipment: any) => {
        const date = parseShipmentDate(shipment.loading_at);
        return date >= start && date <= end;
      }),
    [shipments, start, end],
  );
  const delayedShipments = shipments.filter(
    (shipment: any) => shipment.status === "متأخرة",
  );
  const deliveredShipments = filteredShipments.filter(
    (shipment: any) => shipment.status === "تم التوصيل",
  );

  // useEffect(() => {
  //   dispatch(getShipments());
  // }, [dispatch]);

  const chartData = useMemo(
    () => getDeliveredShipmentsChartData(deliveredShipments, selectedRange),
    [deliveredShipments, selectedRange],
  );

  const filteredDelivered = useMemo(
    () => getFilteredDeliveredShipments(deliveredShipments, selectedRange),
    [deliveredShipments, selectedRange],
  );

  const handleButtonClick = useCallback((item: string) => {
    setSelectedRange(item);
  }, []);

  const percentage =
    shipments.length === 0
      ? 0
      : ((filteredDelivered.length / shipments.length) * 100).toFixed(1);

  const shipmentsStatus = [
    {
      status: "مرتجعة",
      count: returnedShipments.length,
      icon: (
        <div className="p-2 rounded-full bg-[#999999] group-hover:bg-[#4D4D4D]">
          <img
            src={boxSearch}
            alt="box Search icon"
            className="w-12 h-12 filter invert brightness-0"
          />
        </div>
      ),
      styles: "hover:bg-[#666666] text-[#333333] hover:text-[#FCFCFC]",
    },
    {
      status: "شحنات متأخرة",
      count: delayedShipments.length,
      icon: (
        <div className="p-2 rounded-full bg-[#CA8B02] group-hover:bg-[#986801]">
          <img
            src={boxTime}
            alt="box time icon"
            className="w-12 h-12 filter invert brightness-0"
          />
        </div>
      ),
      styles:
        "hover:bg-[#CA8B02] text-[#CA8B02] font-bold hover:text-[#FCFCFC]",
    },
    {
      status: "تنبيهات السائقين",
      count: "48",
      icon: (
        <div className="p-2 rounded-full bg-[#DD7E1F] group-hover:bg-[#864D13]">
          <img
            src={message}
            alt="Message icon"
            className="w-12 h-12 text-[#F2F2F2]"
          />
        </div>
      ),
      styles: "hover:bg-[#DD7E1F] text-[#DD7E1F] hover:text-[#FCFCFC]",
    },
  ];

  const pieStatuses = [
    { status: "قيد الشحن", color: "#B3E5BD" },
    { status: "متأخرة", color: "#FEDE9A" },
    { status: "تم التوصيل", color: "#E6E6E6" },
    { status: "مكتملة", color: "#2E853F" },
    { status: "مرتجعة", color: "#F8D3D4" },
    { status: "ملغية", color: "#CD2026" },
  ];

  const pieLabels = pieStatuses.map((x) => x.status);
  const pieColors = pieStatuses.map((x) => x.color);

  const pieCounts = pieStatuses.map(
    (item) =>
      filteredShipments.filter(
        (shipment: any) => shipment.status === item.status,
      ).length,
  );

  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: "شحنة",
        data: pieCounts,
        backgroundColor: pieColors,
        hoverOffset: 4,
      },
    ],
  };

  const uniqueCities = useMemo(() => {
    const citySet = new Set();
    filteredShipments.forEach((s: any) => {
      if (s.origin_city) citySet.add(s.origin_city);
    });
    return Array.from(citySet);
  }, [filteredShipments]);

  const series = useMemo(() => {
    const branchStatuses = [
      { name: "قيد الشحن", color: "#B3E5BD" },
      { name: "تم التوصيل", color: "#E6E6E6" },
      { name: "مكتملة", color: "#2E853F" },
      { name: "متأخرة", color: "#FEDE9A" },
      { name: "ملغية", color: "#CD2026" },
      { name: "مرتجعة", color: "#F8D3D4" },
    ];
    return branchStatuses.map((status) => ({
      name: status.name,
      data: uniqueCities.map(
        (city) =>
          filteredShipments.filter(
            (s) => s.origin_city === city && s.status === status.name,
          ).length,
      ),
    }));
  }, [filteredShipments, uniqueCities]);

  const totalShipments = useMemo(() => {
    return series.length
      ? series[0].data
          .map((_, cityIdx) =>
            series.reduce((sum, s) => sum + s.data[cityIdx], 0),
          )
          .reduce((a, b) => a + b, 0)
      : 0;
  }, [series]);

  return (
    <div className="flex" dir="rtl">
      <div className=" px-4 min-h-screen w-full">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {shipmentsStatus.map((item, index) => (
            <div
              key={index}
              className={`col-span-1 p-6 rounded-2xl ${item?.styles} group transition-all duration-300 shadow-md rounded-3xl bg-[#FCFCFC]`}
            >
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="xs:text-lg text-xl sm:text-2xl font-bold mb-6">
                    {item?.status}
                  </h4>
                  <h5 className="xs:text-base text-lg font-medium font-Rubik">
                    {item?.count}{" "}
                    {item.status === "تنبيهات السائقين" ? "تنبيه نشط" : "شحنة"}
                  </h5>
                </div>
                <button className="p-2 rounded-full bg-transparent border-none outline-none">
                  {item.icon}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 ">
          <div className="p-4 col-span-1 lg:col-span-2 border border-gray-200 shadow-md rounded-3xl ">
            <div className="flex flex-col lg:flex-row justify-between mb-10">
              <div className="flex lg:justify-start items-center lg:items-end gap-16 lg:gap-6">
                <div className="flex flex-col xs:gap-1 gap-2">
                  <span className="text-[#666666] xs:text-sm text-lg sm:text-xl text-nowrap font-Rubik">
                    تم التوصيل
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#333333] xs:text-lg text-xl sm:text-3xl font-bold">
                      {filteredDelivered.length}
                    </span>
                    <span className="font-Rubik text-nowrap">من إجمالي</span>
                    <span className="text-[#333333] xs:text-lg text-xl sm:text-3xl font-bold">
                      {filteredShipments.length}
                    </span>
                  </div>
                </div>
                <div className="flex h-full items-center text-nowrap lg:items-end gap-1">
                  <span className="text-red-500 font-bold">{percentage}%</span>
                  <span className="text-[#666666] text-sm font-Rubik">
                    عن{" "}
                    <span>
                      {selectedRange === "أسبوعي"
                        ? "الأسبوع"
                        : selectedRange === "شهري"
                          ? "الشهر"
                          : "العام"}
                    </span>{" "}
                    الماضي
                  </span>
                </div>
              </div>
              <div
                className={`mt-12 lg:mt-6 flex items-center rounded-2xl border gap-6 md:gap-12 lg:gap-16 bg-[#F2F2F2] h-fit w-fit px-4 m-auto lg:m-0 max-w-full ${
                  selectedRange === "أسبوعي"
                    ? "ps-0"
                    : selectedRange === "سنوي"
                      ? "pe-0"
                      : ""
                }`}
              >
                {["أسبوعي", "شهري", "سنوي"].map((item, index) => (
                  <button
                    key={index}
                    className={`font-Rubik transition-all duration-300 ${
                      selectedRange === item &&
                      "bg-[#DD7E1F] text-[#FCFCFC] py-3 px-6 rounded-2xl"
                    }`}
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              {" "}
              <span>
                الفترة:{" "}
                {start && end
                  ? `${formatDate(start)} - ${formatDate(end)}`
                  : "كل الوقت"}
              </span>
            </div>
            <LineChartComponent data={chartData} />
          </div>
          <div className="col-span-1 shadow-md rounded-3xl">
            <div className="flex items-center justify-center gap-2 my-12">
              <h1 className="xs:text-lg text-xl font-bold text-[#333333]">
                تقرير الشحنات
              </h1>
              <span className="xs:text-xs text-sm text-[#666666] font-Rubik">
                {selectedRange}
              </span>
            </div>
            <PieChart data={pieChartData} />
          </div>
        </div>
        <div
          className={`mt-8 shadow-md rounded-3xl ${
            isSidebarOpen && "flex flex-col shrink"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#666666] xs:text-xs text-sm font-Rubik">
                {selectedRange}
              </span>
              <span className="xs:text-lg text-xl sm:text-2xl text-[#333333] font-bold">
                تقرير الفروع
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#666666] xs:text-xs text-sm font-Rubik">
                الإجمالي:
              </span>
              <span className="xs:text-lg text-xl sm:text-2xl text-[#333333] font-bold">
                {totalShipments} شحنة
              </span>
            </div>
          </div>
          <HorizontalChart series={series} categories={uniqueCities} />{" "}
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
