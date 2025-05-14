/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ShipmentsFilterDialog() {
  const [open, setOpen] = React.useState(false);
  type Branch = 'تبوك' | 'جدة' | 'جيزان' | 'الدمام' | 'الرياض';
  const branches: Branch[] = ['تبوك', 'جدة', 'جيزان', 'الدمام', 'الرياض'];
  const [selectedBranches, setSelectedBranches] = React.useState<Branch[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBranchToggle = (branch: any) => {
    setSelectedBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch],
    );
  };

  return (
    <>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id='customized-dialog-title'
          className='text-[#333333] text-center !font-Almarai !text-2xl'
        >
          تصفية النتائج
        </DialogTitle>
        <DialogContent
          dir='rtl'
          dividers
        >
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='flex flex-col '>
              <label htmlFor='source'>المصدر</label>
              <input
                type='text'
                className='p-2 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F]'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='source'>الوجهة</label>
              <input
                type='text'
                className='p-2 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F]'
              />{' '}
            </div>
          </div>
          <label
            htmlFor='branches'
            className='text-[#333333] mb-3 inline-block'
          >
            الفروع
          </label>
          <div className='flex items-center gap-4 font-Rubik'>
            {branches.map((branch, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg ${
                  selectedBranches.includes(branch)
                    ? 'bg-[#DD7E1F] text-[#F2F2F2]'
                    : 'bg-[#F2F2F2] text-[#666666]'
                }`}
                onClick={() => handleBranchToggle(branch)}
              >
                {branch}
              </button>
            ))}
          </div>{' '}
        </DialogContent>
        <DialogActions className='w-full flex justify-end items-center'>
          {['حذف', 'تطبيق'].map((item, index) => {
            return (
              <div key={index}>
                <button
                  className={`py-1.5 px-8 rounded-lg border border-[#DD7E1F]  ${
                    index === 0 ? 'bg-[#F2F2F2] text-[#DD7E1F]' : 'bg-[#DD7E1F] text-[#F2F2F2]'
                  }`}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
