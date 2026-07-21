import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumbs, action }) => {
  return (
    <div className="mb-6 md:mb-8">
      <nav className="flex items-center text-sm text-gray-500 dark:text-slate-400 mb-4 whitespace-nowrap overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {item.path ? (
              <Link to={item.path} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-slate-200 font-medium">{item.label}</span>
            )}
            
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-gray-500 dark:text-slate-400 mt-1">{description}</p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
