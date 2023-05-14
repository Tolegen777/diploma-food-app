import {useEffect} from "react";


export function useOnClickOutside(
  ref: React.Ref<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      //@ts-ignore
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    //@ts-ignore
    document.addEventListener("mousedown", listener);
    //@ts-ignore
    document.addEventListener("touchstart", listener);

    return () => {
      //@ts-ignore
      document.removeEventListener("mousedown", listener);
      //@ts-ignore
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
