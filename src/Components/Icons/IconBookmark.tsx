import { FC } from "react";

import { IIconProps } from "./types";

const IconBookmark: FC<IIconProps> = props => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    focusable='false'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    className='StyledIconBase-sc-ea9ulj-0 hRnJPC'
    data-testid='icon-bookmark'
    {...props}
  >
    <path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z' />
  </svg>
);

export default IconBookmark;
