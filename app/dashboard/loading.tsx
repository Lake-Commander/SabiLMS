'use client';

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#F1EAD9] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header Skeleton Frame */}
                <div className="p-6 bg-[#FBF8F1] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] animate-pulse">
                    <div className="h-8 w-64 bg-black/10 border border-black/5 rounded mb-3"></div>
                    <div className="h-4 w-96 bg-black/10 border border-black/5 rounded"></div>
                </div>

                {/* Grid Framework */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#111111] animate-pulse">
                            <div className="h-3 w-32 bg-black/10 rounded mb-4"></div>
                            <div className="h-9 w-16 bg-black/10 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#111111] animate-pulse">
                                <div className="h-5 w-44 bg-black/10 rounded mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-black/10 rounded"></div>
                                    <div className="h-3 w-5/6 bg-black/10 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#111111] animate-pulse h-64">
                        <div className="h-5 w-32 bg-black/10 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 bg-black/5 border border-black/5 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}