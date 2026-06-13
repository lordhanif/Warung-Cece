import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  TicketPercent, 
  Image as ImageIcon, 
  MessageSquare,
  Users,
  LogOut,
  Flame,
  Award,
  QrCode,
  Globe
} from 'lucide-react';

export function AdminLayout() {
  const { logout, user, role } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Promos', path: '/admin/promos', icon: TicketPercent },
    { name: 'Hero Banner', path: '#', icon: ImageIcon },
    { name: 'Sambal Config', path: '#', icon: Flame },
    { name: 'Gallery', path: '#', icon: ImageIcon },
    { name: 'Reviews', path: '#', icon: MessageSquare },
    { name: 'Loyalty', path: '#', icon: Award },
    { name: 'QRIS', path: '#', icon: QrCode },
    { name: 'SEO', path: '#', icon: Globe },
    { name: 'Users', path: '#', icon: Users, reqRoles: ['SuperAdmin'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold mr-3">C</div>
          <span className="font-display font-bold text-lg text-gray-900">Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            if (item.reqRoles && (!role || !item.reqRoles.includes(role))) return null;
            
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold uppercase overflow-hidden">
              {user?.email?.charAt(0)}
            </div>
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{role || 'Staff'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header (placeholder for now) */}
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
