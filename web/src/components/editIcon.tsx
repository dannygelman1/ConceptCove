import { ReactElement } from "react";
import cn from "classnames";

interface EditIconProps {
  className?: string;
}

export const EditIcon = ({ className }: EditIconProps): ReactElement => {
  return (
    <svg
      className={cn(className, "w-4 h-4")}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <title />

      <g id="Complete">
        <g id="edit">
          <g>
            <path
              d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polygon
              fill="none"
              points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
