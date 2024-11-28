"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { PiX } from "react-icons/pi";

const ToastContext = createContext([]);

export const useToast = () => useContext(ToastContext);

type Toast = { id: number | string; component: ReactNode };
export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const open = (component: ReactNode, timeout = 10000) => {
    const id = Date.now();

    setToasts((toasts) => [...toasts, { id, component }]);

    setTimeout(() => close(id), timeout);
  };

  const close = (id: number | string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ open, close }}>
      <div className="relative">
        <div className="absolute bottom-4 right-5 z-50 w-96">
          {toasts.map(({ id, component }) => (
            <div key={id} className="relative mt-4">
              <button
                onClick={() => close(id)}
                className="absolute right-2 top-2 rounded-lg bg-gray-200/20 p-1 text-gray-800/60"
              >
                <PiX size={16} />
              </button>
              {component}
            </div>
          ))}
        </div>
        {children}
      </div>
    </ToastContext.Provider>
  );
}
