import { ReactElement } from "react";
import cn from "classnames";

interface UpDownIconProps {
  className?: string;
  sortedBy: boolean;
  reversed: boolean;
}

export const UpDownIcon = ({
  className,
  sortedBy,
  reversed,
}: UpDownIconProps): ReactElement => {
  return (
    <svg
      className={cn(className, "w-4 h-4")}
      // fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="800px"
      height="800px"
      viewBox="0 0 995.048 995.048"
      xmlSpace="preserve"
    >
      <g>
        <path
          fill={sortedBy ? (reversed ? "#94a3b8" : "#64748b") : "#94a3b8"}
          d="M538.475,365.624c-9.9,9.9-23.7,16.1-38.9,16.1c-30.4,0-55-24.6-55-55v-139.1l-74.7,74.7c-21.5,21.5-56.3,21.5-77.8,0
		s-21.5-56.3,0-77.8l168.6-168.5l0.101-0.1c6.399-6.4,14.399-11.2,23.1-13.7c0,0,0,0,0.101,0c10.8-3.2,22.5-2.9,33.1,0.6
		c8,2.7,15.4,7.3,21.4,13.2l168.6,168.6c21.5,21.5,21.5,56.3,0,77.8s-56.3,21.5-77.8,0l-74.7-74.8v139.2
		C554.574,341.924,548.374,355.724,538.475,365.624z"
        />
        <path
          fill={sortedBy ? (reversed ? "#64748b" : "#94a3b8") : "#94a3b8"}
          d="M538.475,629.224c-9.9-9.899-23.7-16.1-38.9-16.1c-30.4,0-55,24.6-55,55v139.2l-74.7-74.7c-21.5-21.5-56.3-21.5-77.8,0
		s-21.5,56.3,0,77.8l168.6,168.6l0.101,0.101c6.399,6.399,14.399,11.2,23.1,13.7c0,0,0,0,0.101,0c10.8,3.199,22.5,2.899,33.1-0.601
		c8-2.7,15.4-7.3,21.4-13.2l168.6-168.6c21.5-21.5,21.5-56.3,0-77.8s-56.3-21.5-77.8,0l-74.7,74.6v-139.2
		C554.574,652.924,548.374,639.124,538.475,629.224z"
        />
      </g>
    </svg>
  );
};
