import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";
import notification from "../../assets/images/notification.svg";

const PAGE_TITLES = [
  { path: "/dashboard", title: "لوحة المعلومات", exact: true },
  { path: "/shipments/all", title: "الشحنات", exact: true },
  { path: "/shipments/shipment-details", title: "بيانات الشحنة" },
  { path: "/shipments/add-shipment", title: "إضافة شحنة", exact: true },
  { path: "/shipments/edit-shipment", title: "بيانات الشحنة" },
  { path: "/shipments/delete-shipment", title: "حذف الشحنة", exact: true },
  { path: "/users", title: "المناديب", exact: true },
  { path: "/users/add-user", title: "إضافة مندوب", exact: true },
  { path: "/users/user-details", title: "بيانات المندوب" },
  { path: "/users/edit-user", title: "تحديث بيانات المندوب" },
  { path: "/users/delete-user", title: "حذف المندوب", exact: true },
  { path: "/drivers", title: "السائقين", exact: true },
  { path: "/drivers/add-driver", title: "إضافة سائق", exact: true },
  { path: "/drivers/edit-driver", title: "تحديث بيانات السائق" },
  { path: "/drivers/delete-driver", title: "حذف السائق", exact: true },
  { path: "/drivers/driver-details", title: "بيانات السائق" },
  { path: "/clients", title: "العملاء", exact: true },
  { path: "/clients/add-client", title: "إضافة عميل", exact: true },
  { path: "/clients/client-details", title: "بيانات العميل" },
  { path: "/clients/edit-client", title: "تحديث بيانات العميل" },
  { path: "/clients/delete-client", title: "حذف العميل", exact: true },
  { path: "/recipients", title: "المستلمين", exact: true },
  { path: "/recipients/create", title: "إضافة المستلم", exact: true },
  { path: "/alert-messages", title: "رسائل النظام", exact: true },
  {
    path: "/alert-messages/select-recipients",
    title: "تحديد مستلمين",
    exact: true,
  },
];

const BACK_BUTTON_PATHS = [
  "/shipments/shipment-details",
  "/shipments/add-shipment",
  "/shipments/edit-shipment",
  "/shipments/delete-shipment",
  "/users/add",
  "/users/user-details",
  "/users/edit-user",
  "/users/delete-user",
  "/drivers/add-driver",
  "/drivers/edit-driver",
  "/drivers/delete-driver",
  "/drivers/driver-details",
  "/clients/add-client",
  "/clients/client-details",
  "/clients/edit-client",
  "/clients/delete-client",
  "/alert-messages/select-recipients",
];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getPageTitle = () => {
    // First try exact matches
    const exactMatch = PAGE_TITLES.find(
      (item) => item.exact && pathname === item.path,
    );
    if (exactMatch) return exactMatch.title;

    const partialMatch = PAGE_TITLES.find(
      (item) => !item.exact && pathname.startsWith(item.path),
    );

    return partialMatch?.title || "الشحنات";
  };

  const title = getPageTitle();
  const showBackButton = BACK_BUTTON_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  const handleBackClick = () => {
    navigate(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="flex justify-between items-center mt-16 lg:mt-12 mb-10 px-8 gap-4">
      <h1 className="font-bold xs:text-base text-lg sm:text-3xl ml-4 text-nowrap">
        {title}
      </h1>

      {showBackButton ? (
        <button
          onClick={handleBackClick}
          className="text-[#DD7E1F] flex items-center gap-2 font-Rubik text-lg"
          aria-label={
            pathname.includes("/shipments/delete-shipment") ? "إلغاء" : "عودة"
          }
        >
          {pathname.includes("/shipments/delete-shipment") ? (
            "إلغاء"
          ) : (
            <>
              <span className="-mt-1 xs:text-base">عودة</span>
              <FaArrowLeft color="#DD7E1F" />
            </>
          )}
        </button>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            className="xs:hidden p-2 rounded-full bg-[#E6E6E6]"
            aria-label="الإشعارات"
          >
            <img src={notification} alt="" className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src={avatar}
              alt="صالح حسين"
              className="w-8 h-8 rounded-full object-cover"
            />
            <h4 className="text-[#333333] text-sm">صالح حسين</h4>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
