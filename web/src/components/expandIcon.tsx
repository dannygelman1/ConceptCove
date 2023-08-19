import { ReactElement } from "react";

interface ExpandIconProps {
  className?: string;
}

export const ExpandIcon = ({ className }: ExpandIconProps): ReactElement => {
  return (
    <svg
      className="w-8 h-8"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 10L21 3M21 3H16.5M21 3V7.5M10 14L3 21M3 21H7.5M3 21L3 16.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
