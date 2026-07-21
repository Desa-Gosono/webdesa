import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { adminMenu } from '@/config/adminMenu';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/utils/cn'; // Assuming they have cn util, or clsx/tailwind-merge
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 bg-slate-950">
        <span className="text-xl font-bold text-white tracking-wide">Desa Admin</span>
        <button className="lg:hidden text-slate-300 hover:text-white" onClick={() => setIsOpen(false)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 space-y-1">
        {adminMenu.map((menu) => {
          const isActive = location.pathname === menu.path || (menu.children && menu.children.some(c => location.pathname.startsWith(c.path)));
          const hasChildren = menu.children && menu.children.length > 0;
          const isMenuOpen = openMenus[menu.title] || isActive;

          return (
            <div key={menu.title}>
              {hasChildren ? (
                <button
                  onClick={() => toggleMenu(menu.title)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors',
                    isActive ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <menu.icon className="w-5 h-5" />
                    <span className="font-medium">{menu.title}</span>
                  </div>
                  {isMenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              ) : (
                <NavLink
                  to={menu.path}
                  end={menu.path === '/admin'}
                  className={({ isActive: isLinkActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium',
                      isLinkActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                    )
                  }
                >
                  <menu.icon className="w-5 h-5" />
                  <span>{menu.title}</span>
                </NavLink>
              )}

              <AnimatePresence>
                {hasChildren && isMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-11 pr-3 py-1 space-y-1">
                      {menu.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          className={({ isActive: isChildActive }) =>
                            cn(
                              'block px-3 py-2 rounded-md text-sm transition-colors',
                              isChildActive
                                ? 'bg-indigo-600/20 text-indigo-300 font-medium'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
