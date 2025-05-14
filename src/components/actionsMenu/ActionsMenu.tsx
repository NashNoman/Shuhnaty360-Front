/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiDotsVertical } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionsMenu = ({ options, position }: any) => {
  const navigate = useNavigate();
  const [isShipmentActionsMenuOpen, setIsShipmentActionsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsShipmentActionsMenuOpen(false);
      }
    };

    if (isShipmentActionsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShipmentActionsMenuOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsShipmentActionsMenuOpen(!isShipmentActionsMenuOpen)}
        className='relative'
      >
        <HiDotsVertical size={24} />
      </button>
      {isShipmentActionsMenuOpen && (
        <div
          ref={menuRef}
          className={`absolute flex flex-col justify-center gap-4 rounded-lg ps-2 pe-6 py-3 bg-[#FCFCFC] border border-[#CCCCCC] shadow-lg font-Rubik top-16 left-4 z-10 ${position}`}
        >
          {options.map((item: any, index: any) => (
            <button
              key={index}
              className='flex items-center gap-2'
              onClick={() => {
                navigate(item.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
              />
              <span className='text-nowrap'>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ActionsMenu;
