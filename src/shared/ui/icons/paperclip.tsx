import type { ComponentProps, ReactElement } from "react";

function Paperclip(props: ComponentProps<"svg">): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_37066_1955)">
        <path
          d="M14.2934 7.36666L8.1667 13.4933C7.41613 14.2439 6.39815 14.6656 5.3367 14.6656C4.27524 14.6656 3.25726 14.2439 2.5067 13.4933C1.75613 12.7428 1.33447 11.7248 1.33447 10.6633C1.33447 9.60187 1.75613 8.58389 2.5067 7.83333L8.22003 2.11999C8.72041 1.61873 9.39941 1.33678 10.1077 1.33615C10.8159 1.33553 11.4954 1.61628 11.9967 2.11666C12.498 2.61703 12.7799 3.29604 12.7805 4.0043C12.7812 4.71256 12.5004 5.39207 12 5.89333L6.27336 11.6067C6.02318 11.8568 5.68385 11.9974 5.33003 11.9974C4.97621 11.9974 4.63688 11.8568 4.3867 11.6067C4.13651 11.3565 3.99596 11.0171 3.99596 10.6633C3.99596 10.3095 4.13651 9.97018 4.3867 9.71999L10.0467 4.06666"
          stroke="white"
          strokeOpacity="0.42"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_37066_1955">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Paperclip;
