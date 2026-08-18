import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = () => {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Hello.", "Hai.", "こんにちは.", "Hola.", "你好."],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        startDelay: 500,
        smartBackspace: true,
        loop: true,
        showCursor: false,
        cursorChar: "|",
      });

      return () => typed.destroy();
    }
  }, []);

  return <span ref={typedRef} className=" text-accent-content text-wrap font-black text-[6rem] tablet:text-[10rem] tablet:-translate-3 desktop:-translate-9 desktop:text-[25rem] "></span>;
};

export default TypedText;
