import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h2>Home</h2>
    <Link to="/content">
      <button type="button">Switch to Content</button>
    </Link>
  </>
);

export default Home;
