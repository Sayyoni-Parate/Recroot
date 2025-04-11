import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Upload, FileText, Users, Calendar } from 'lucide-react';

function NavLink({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <a href={href} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
      {icon}
      <span>{text}</span>
    </a>
  );
}

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Recroot</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <NavLink icon={<Upload />} text="Job Description" href="./src/components/upload_jd.html" />
            <NavLink icon={<FileText />} text="Upload CVs" href="./src/components/upload_cv.html" />
            <NavLink icon={<Users />} text="Shortlisted Students" href="./src/components/shortlisted.html" />
            <NavLink icon={<Calendar />} text="Interviews" href="./src/components/interviews.html" />
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}