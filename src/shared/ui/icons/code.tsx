import type { ComponentProps, ReactElement } from "react";

function Code(props: ComponentProps<"svg">): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6667 12L14.6667 8L10.6667 4"
        stroke="#06B6D4"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33325 4L1.33325 8L5.33325 12"
        stroke="#06B6D4"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Code;
