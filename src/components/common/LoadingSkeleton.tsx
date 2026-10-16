import React from 'react';

export const ExperienceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden animate-pulse flex flex-col h-full">
      <div className="h-52 bg-neutral-200" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-3.5 w-24 bg-neutral-200 rounded" />
          <div className="h-5 w-4/5 bg-neutral-200 rounded" />
          <div className="h-3.5 w-1/2 bg-neutral-200 rounded" />
        </div>
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="h-5 w-20 bg-neutral-200 rounded" />
          <div className="h-8 w-28 bg-neutral-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const CatalogSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <ExperienceCardSkeleton key={i} />
      ))}
    </div>
  );
};
