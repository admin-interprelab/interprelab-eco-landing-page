import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="p-4 bg-background border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">InterpreTrack</Link>
        <div className="flex gap-4">
          <Link to="/logs">Logs</Link>
          <Link to="/stats">Stats</Link>
        </div>
      </div>
    </nav>
  );
};
