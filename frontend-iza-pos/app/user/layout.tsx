import React from 'react';
import Sidebar from '../components/sidebar';

const userLayout: React.FC = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-screen overflow-hidden bg-[var(--color-black)]">
      <Sidebar />
      <div className="ml-[220px] h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default userLayout; 