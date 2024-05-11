import './navBar.scss';

import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="main-page_header_wrapper_header_nav">
      <div className="main-page_header_wrapper_header_nav_button active">
        <Link to="/">Main</Link>
      </div>
    </div>
  );
}
