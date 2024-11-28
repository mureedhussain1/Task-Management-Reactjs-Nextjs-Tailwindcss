import { useToast } from "@/context/ToastProvider";
import { IconType } from "react-icons";
import {
  PiCheckCircle,
  PiInfo,
  PiLightning,
  PiWarningCircle,
} from "react-icons/pi";

export default class Toasts {
  toast = useToast();

  showError = (title: string, message: string) => {
    this.toast.open(
      <div className="left-1 left-4 flex justify-center gap-2 rounded-lg bg-red-300 p-4 text-red-800 shadow-2xl">
        <PiWarningCircle size={40} />
        <div>
          {title && <h3 className="font-bold">{title}</h3>}
          {message && <p className="text-sm">{message}</p>}
        </div>
      </div>,
    );
  };

  showMessage = (
    title: string,
    message: string,
    Icon: IconType = PiLightning,
  ) => {
    this.toast.open(
      <div className="left-4 flex justify-center gap-2 rounded-lg bg-blue-300 p-4 text-blue-800 shadow-2xl">
        <Icon size={40} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>,
    );
  };

  showSuccess = (title: string, message: string) => {
    this.toast.open(
      <div className="left-4 flex justify-center gap-2 rounded-lg bg-green-300 p-4 text-green-800 shadow-2xl">
        <PiCheckCircle size={40} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>,
      10000,
    );
  };
}
