/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import logo from '../../assets/images/logo.png';
import { IoCloseOutline } from 'react-icons/io5';
import NavbarAccordion from './NavbarAccordion';
import { PiPackageDuotone } from 'react-icons/pi';
import { useSidebar } from '../../context/SidebarContext';
import statisticsIcon from '../../assets/images/statistics.svg';
import usersIcon from '../../assets/images/people.svg';
import truckIcon from '../../assets/images/truck.svg';
import clientsIcon from '../../assets/images/clients.svg';
import alertIcon from '../../assets/images/alert.svg';
import logOutIcon from '../../assets/images/log-out.svg';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

const iconsStyles = 'filter invert brightness-0';

const items = [
  {
    nav: '/dashboard',
    name: 'لوحة المعلومات',
    icon: (selectedItem: string) => (
      <img
        src={statisticsIcon}
        alt='statistics'
        className={`${selectedItem === 'dashboard' ? iconsStyles : ''}`}
      />
    ),
  },
  [
    {
      nav: '/shipments/all',
      name: 'كل الشحنات',
    },
    {
      nav: '/shipments/in-shipping',
      name: 'قيد الشحن',
    },
    {
      nav: '/shipments/delivered',
      name: 'تم التوصيل',
    },
    {
      nav: '/shipments/completed',
      name: 'مكتملة',
    },
    {
      nav: '/shipments/delayed',
      name: 'متأخرة',
    },
    {
      nav: '/shipments/Cancelled',
      name: 'ملغية',
    },
    {
      nav: '/shipments/returned',
      name: 'مرتجعة',
    },
  ],
  {
    nav: '/users',
    name: 'المناديب',
    icon: (selectedItem: string) => (
      <img
        src={usersIcon}
        alt='users'
        className={`${selectedItem === 'users' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/drivers',
    name: 'السائقين',
    icon: (selectedItem: string) => (
      <img
        src={truckIcon}
        alt='drivers'
        className={`${selectedItem === 'drivers' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/clients',
    name: 'العملاء',
    icon: (selectedItem: string) => (
      <img
        src={clientsIcon}
        alt='clients'
        className={`${selectedItem === 'clients' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/alert-messages',
    name: 'رسائل التنبيه',
    icon: (selectedItem: string) => (
      <img
        src={alertIcon}
        alt='alert-messages'
        className={`${selectedItem === 'alert-messages' ? iconsStyles : ''}`}
      />
    ),
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkView = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };

    const debouncedCheckView = debounce(checkView, 100);

    checkView();
    window.addEventListener('resize', debouncedCheckView);
    return () => window.removeEventListener('resize', debouncedCheckView);
  }, []);

  useEffect(() => {
    if (isMobileScreen && isSidebarOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    };
  }, [isMobileScreen, isSidebarOpen]);

  return (
    <div className='h-full'>
      {isMobileScreen && !isSidebarOpen ? (
        <button
          onClick={() => {
            setIsSidebarOpen(true);
          }}
          className={`fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md lg:hidden`}
        >
          <IoMdMenu size={24} />
        </button>
      ) : (
        <>
          {isSidebarOpen && <div className='fixed lg:hidden inset-0 bg-black bg-opacity-50 z-40' />}
          <aside
            className={`bg-[#E6E6E6] transition-all duration-300 flex flex-col justify-between p-8 ${
              isSidebarOpen ? 'w-[278px] items-end' : 'w-[104px] items-center'
            } fixed lg:static z-50 h-full overflow-y-auto`}
          >
            <div className={`w-full flex flex-col ${isSidebarOpen ? 'items-end' : 'items-center'}`}>
              {isSidebarOpen ? (
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                >
                  <IoCloseOutline size={24} />
                </button>
              ) : (
                <button onClick={() => setIsSidebarOpen(true)}>
                  <IoMdMenu size={24} />
                </button>
              )}

              {isSidebarOpen && (
                <img
                  src={logo}
                  alt='logo'
                  className='mt-10'
                />
              )}
              <div className='w-full mt-10'>
                {items.map((item, index) =>
                  Array.isArray(item) ? (
                    <NavbarAccordion
                      key={index}
                      icon={<PiPackageDuotone size={24} />}
                      title='الشحنات'
                      items={item}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  ) : (
                    <Link
                      to={item.nav}
                      key={item.name}
                      onClick={() => setSelectedItem(item.nav.substring(1))}
                      className={`flex items-center w-full gap-2 mb-4 ${
                        isSidebarOpen ? 'p-3' : 'p-2'
                      } transition-all duration-300 ${
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                      } ${
                        selectedItem === item.nav.substring(1)
                          ? 'bg-[#DD7E1F] rounded-lg text-[#FCFCFC]'
                          : ''
                      }`}
                    >
                      <span>{item.icon(selectedItem)}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  ),
                )}
              </div>
            </div>
            <Link
              to='/log-out'
              className={`flex items-center w-full gap-2 ${
                isSidebarOpen ? 'p-3' : 'p-2'
              } transition-all duration-300 mb-4 ${
                isSidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <span>
                <img
                  src={logOutIcon}
                  alt='log-out'
                />
              </span>
              {isSidebarOpen && <span>تسجيل الخروج</span>}
            </Link>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;
