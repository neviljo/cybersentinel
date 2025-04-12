import { BatteryFull, Wifi, Signal } from "lucide-react";

export default function MobileFrameWrapper({ children }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-[390px] h-[844px] bg-neutral-900 rounded-[2.8rem] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] p-[6px] border-[8px] border-neutral-700 relative flex flex-col">

        {/* Inner screen */}
        <div className="flex-1 bg-white rounded-[2rem] overflow-hidden relative flex flex-col">
          
          {/* Status Bar */}
          <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[13px] text-black font-medium bg-white z-10 relative">
            <span>9:41</span>
            <div className="flex items-center gap-1 text-black">
              <Signal size={18} strokeWidth={2} />
              <Wifi size={18} strokeWidth={2} />
              <BatteryFull size={20} strokeWidth={2} />
            </div>
          </div>

          {/* Notch: move after status bar and boost z-index */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[0px] w-40 h-6 bg-black rounded-b-2xl z-30 shadow-md" />

          {/* App Content */}
          <div className="flex-1 overflow-y-auto pt-2 no-scrollbar z-10 relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}