import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const totalLength = 180;
  const [offset, setOffset] = useState(totalLength);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const newOffset = totalLength * (1 - progress);
      setOffset(newOffset);

      setVisible(scrollTop > 300);
    }

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <button
      id="back-to-top"
      class="rounded-main"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ opacity: visible ? "1" : "0" }}
    >
      <div className="progress-border">
        <svg viewBox="0 0 52 52">
          <path
            d="M15,2 H37 Q48,2 48,13 V37 Q48,48 37,48 H15 Q2,48 2,37 V13 Q2,2 15,2"
            strokeDasharray="180"
            strokeDashoffset={offset}
          ></path>
        </svg>
      </div>

      <svg
        id="arrow-icon"
        width="36"
        height="36"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${visible ? "arrow-appear" : "arrow-disappear"} ${
          hover ? "hover-bounce" : ""
        }`}
      >
        <path
          d="M24 24 L40 8 L56 24"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 24 L40 72"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="40" cy="72" r="5" fill="white" />
      </svg>
    </button>
  );
}