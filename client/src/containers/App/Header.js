import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li>
      <Link to="/">home</Link>
    </li>
    <li>
      <Link to="/graph">graph</Link>
    </li>
    <li>
      <Link to="/history">history</Link>
    </li>
  </ul>
);

export default Header;
