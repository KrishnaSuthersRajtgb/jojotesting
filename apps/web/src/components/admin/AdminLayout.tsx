import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { path: '/admin', label: '📊 Dashboard' },
  { path: '/admin/upload', label: '📤 Upload Images' },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="pt-16">
      {' '}
      {/* 👈 added bottom space */}
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar - desktop only */}
        <aside className="w-56 bg-white border-r border-gray-100 hidden md:flex flex-col p-4">
          <div className="mb-8">
            <h1 className="text-lg font-bold text-pink-500">👗 Admin</h1>
            <p className="text-xs text-gray-400">Girls Clothing Store</p>
          </div>
          <nav className="flex flex-col gap-2">
            {NAV.map((n) => (
              <Link
                key={n.path}
                to={n.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === n.path
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile top nav */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t 
                      border-gray-100 flex z-50"
        >
          {NAV.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              className={`flex-1 text-center py-3 text-xs font-medium ${
                pathname === n.path ? 'text-pink-500' : 'text-gray-500'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20 md:pb-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
