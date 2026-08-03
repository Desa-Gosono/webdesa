import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm p-4 flex flex-col gap-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}
