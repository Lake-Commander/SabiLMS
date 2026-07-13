import { createClient } from '@/lib/auth';
import CourseCard from '@/components/CourseCard';
import { redirect } from 'next/navigation';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const resolvedParams = await searchParams;
  const activeDifficulty = resolvedParams.level || 'all';

  let query = supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  //  FIXED: Changed column reference from 'difficulty' to 'level' to match your schema matrix
  if (activeDifficulty !== 'all') {
    query = query.eq('level', activeDifficulty);
  }

  const { data: courses, error } = await query;

  if (error) {
    return (
      <div className="p-4 border-2 border-black bg-rose-100 dark:bg-rose-950 font-mono text-xs font-black uppercase rounded-lg shadow-[4px_4px_0px_#111111]">
        ⚠️ Failed to parse courses relational schema database parameters.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Small Route Badge */}
      <div className="flex items-center gap-2 select-none">
        <span className="bg-[var(--blue)] text-white border-2 border-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_#111111] uppercase tracking-wide">
          Curriculum
        </span>
        <span className="text-xs text-gray-500 font-bold font-mono uppercase tracking-wider">
          / modules catalog
        </span>
      </div>

      {/* Header Controller Card with Brutalist Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111]">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-[var(--black)]">
            All Learning Tracks
          </h2>
          <p className="text-[11px] text-gray-500 font-bold uppercase font-mono tracking-wide mt-0.5">
            Master the NGX from scratch • No Paywalls. No Jargon.
          </p>
        </div>

        {/* High-Contrast Interactive Filter Tabs Row */}
        <div className="flex flex-wrap items-center gap-1 bg-[var(--cream)] border-2 border-black p-1 rounded-lg">
          {[
            { id: 'all', label: 'All' },
            { id: 'Beginner', label: 'Beginner' },
            { id: 'Intermediate', label: 'Intermediate' },
            { id: 'Advanced', label: 'Advanced' },
          ].map((tab) => {
            const isSelected = activeDifficulty === tab.id;
            return (
              <a
                key={tab.id}
                // FIXED: Updated path variable key from ?difficulty= to ?level= so URL matching hits the correct router slot
                href={`/dashboard/courses${tab.id === 'all' ? '' : `?level=${tab.id}`}`}
                className={`px-3 py-1.5 border-2 rounded-md text-[10px] font-mono font-black uppercase tracking-wider transition-all ${
                  isSelected
                    ? 'bg-[var(--orange)] border-black text-black shadow-[2px_2px_0px_#111111] translate-x-[-1px] -translate-y-[1px]'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--black)]'
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Courses Cards Grid */}
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--white)] border-2 border-black border-dashed rounded-xl p-12 text-center shadow-[4px_4px_0px_#111111]">
          <span className="text-2xl">🎛️</span>
          <h3 className="font-display font-black text-xs uppercase mt-2 text-[var(--black)]">No Modules Found</h3>
          <p className="text-[11px] text-gray-500 font-bold uppercase font-mono mt-0.5">No parameters match this difficulty level layer.</p>
        </div>
      )}
    </div>
  );
}