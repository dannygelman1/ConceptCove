import { ReactElement } from "react";
import cn from "classnames";

interface EscapeIconProps {
  className?: string;
}

export const EscapeIcon = ({ className }: EscapeIconProps): ReactElement => {
  return (
    <svg
      className={cn(className, "w-4 h-4")}
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      color="currentColor"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M8.5 23.5l15-15M23.5 23.5l-15-15"
      />
    </svg>
  );
};
