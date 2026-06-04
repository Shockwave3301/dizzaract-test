import type { ComponentProps, ReactElement } from "react";

function User(props: ComponentProps<"svg">): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM9.99998 18.5C11.784 18.5 13.4397 17.9504 14.8069 17.0112C15.4108 16.5964 15.6688 15.8062 15.3178 15.1632C14.59 13.8303 13.0902 13 9.99994 13C6.90969 13 5.40997 13.8302 4.68214 15.1632C4.33105 15.8062 4.5891 16.5963 5.19296 17.0111C6.56018 17.9503 8.2159 18.5 9.99998 18.5Z"
        fill="#A3A3A3"
      />
    </svg>
  );
}

export default User;
