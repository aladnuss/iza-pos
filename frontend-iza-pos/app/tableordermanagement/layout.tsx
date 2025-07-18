import React from 'react';
import Sidebar from '../components/general/sidebar';

const tableordermanagement: React.FC = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />
      <div className="ml-[220px] h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default tableordermanagement;