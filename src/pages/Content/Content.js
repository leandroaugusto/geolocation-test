import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h2>Content</h2>
    <Link to="/">
      <button type="button">Switch to Home</button>
    </Link>
  </>
);

export default Home;
