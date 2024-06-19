import './topMenu.scss';

import NavBar from '../navBar/navBar';
import UserCabinet from '../userCabinet/userCabinet';

interface Props {
  position: 'top' | 'side';
}

export default function TopMenu({ position }: Props) {
  return (
    <div data-testid="top_menu" className="main-page_header_wrapper">
      <NavBar position={position} />
      <div className={`main-page_header_wrapper-all_buttons ${position}`}>
        <UserCabinet />
      </div>
    </div>
  );
}
