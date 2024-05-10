import './navBar.scss';

import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="ain-page_header_wrapper_header">
      <div>
        <Link to="/">Main</Link>
      </div>
    </div>
  );
}
