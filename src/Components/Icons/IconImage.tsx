import type { SVGProps } from "react";

const SvgIconImage = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M6 17h12l-3.75-5-3 4L9 13zm-3 4V3h18v18zm2-2h14V5H5zm0 0V5z'
    />
  </svg>
);
export default SvgIconImage;
