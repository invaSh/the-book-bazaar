import React from 'react';
import { useAuth } from '../../contexts/authContext';

function Home() {
  const { user } = useAuth();

  console.log(JSON.stringify(user, null, 2));

  return (
    <div>
      <h1>This is the user home</h1>
    </div>
  );
}

export default Home;
