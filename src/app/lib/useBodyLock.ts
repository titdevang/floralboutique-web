import { useEffect } from "react";

let modalCount = 0;

export function useBodyLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      modalCount += 1;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (isOpen) {
        modalCount -= 1;
        if (modalCount === 0) {
          document.body.style.overflow = "";
        }
      }
    };
  }, [isOpen]);
}
