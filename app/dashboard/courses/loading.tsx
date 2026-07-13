'use client';

export default function CoursesLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb Line Loader */}
      <div className="h-4 w-44 bg-black/10 dark:bg-white/10 border border-black/5 rounded animate-pulse" />

      {/* Filter Header Box Loader */}
      <div className="p-5 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] animate-pulse flex flex-col sm:flex-row justify-between gap-4 h-24 items-center">
        <div className="space-y-2 w-1/3">
          <div className="h-5 w-full bg-black/10 dark:bg-white/10 rounded" />
          <div className="h-3 w-3/4 bg-black/10 dark:bg-white/10 rounded" />
        </div>
        <div className="h-10 w-52 bg-black/10 dark:bg-white/10 border-2 border-transparent rounded-lg" />
      </div>

      {/* Brutalist Cards Loading Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div 
            key={idx} 
            className="bg-[var(--white)] border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#111111] animate-pulse space-y-6"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-3 w-full bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-3 w-5/6 bg-black/10 dark:bg-white/10 rounded" />
            </div>
            <div className="pt-3 border-t-2 border-dashed border-black/5 flex justify-between items-center">
              <div className="h-4 w-14 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-8 w-24 bg-black/10 dark:bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}