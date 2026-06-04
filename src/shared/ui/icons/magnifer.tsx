import type { ComponentProps, ReactElement } from "react";

function Magnifer(props: ComponentProps<"svg">): ReactElement {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.6652 12.665L9.7985 9.79831M11.3317 5.99834C11.3317 8.94386 8.94389 11.3317 5.99837 11.3317C3.05285 11.3317 0.665039 8.94386 0.665039 5.99834C0.665039 3.05282 3.05285 0.665009 5.99837 0.665009C8.94389 0.665009 11.3317 3.05282 11.3317 5.99834Z"
        stroke="#FAFAFA"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Magnifer;
