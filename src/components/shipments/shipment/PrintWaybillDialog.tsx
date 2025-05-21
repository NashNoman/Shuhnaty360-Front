import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Waybill } from "./Waybill";

export default function PrintWaybillDialog({
  shipment,
  driver,
  client,
  recipient,
  open,
  setOpen,
  truckType,
}: any) {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        scroll={"paper"}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "0px",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: "0",
          }}
        >
          <Waybill
            shipment={shipment}
            driver={driver}
            client={client}
            recipient={recipient}
            truckType={truckType}
          />
        </DialogContent>
        <DialogActions sx={{ margin: "10px 0 0" }}>
          <div className="grid grid-cols-2 gap-4 w-full mb-2">
            {["إلغاء", "طباعة"].map((item: string, index: number) => (
              <button
                onClick={
                  index === 0
                    ? () => setOpen(false)
                    : () => {
                        window.print();
                        setTimeout(() => setOpen(false), 400);
                      }
                }
                key={index}
                className={`col-span-1 ${
                  index === 0
                    ? "bg-[#FCFCFC] text-[#DD7E1F]"
                    : "bg-[#DD7E1F] text-[#FCFCFC]"
                } border border-[#DD7E1F] py-3 rounded-lg`}
              >
                {item}
              </button>
            ))}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
