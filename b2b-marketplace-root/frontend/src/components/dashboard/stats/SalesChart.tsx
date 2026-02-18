'use client';

export default function SalesChart() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 self-start">Sales Overview</h3>

            <div className="relative w-full h-[300px] flex items-end justify-between gap-2 px-2 border-b border-l border-slate-200 dark:border-slate-600">
                {/* Y-Axis Grid Lines (Visual only) */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-10">
                    <div className="w-full h-px bg-slate-500"></div>
                    <div className="w-full h-px bg-slate-500"></div>
                    <div className="w-full h-px bg-slate-500"></div>
                    <div className="w-full h-px bg-slate-500"></div>
                    <div className="w-full h-px bg-slate-500"></div>
                </div>

                {/* Bars */}
                {[35, 55, 40, 70, 60, 85, 95].map((h, i) => (
                    <div key={i} className="group relative flex-1 mx-1 flex flex-col justify-end h-full">
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${h * 150}
                        </div>
                        <div
                            style={{ height: `${h}%` }}
                            className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm hover:bg-blue-400 transition-all duration-300 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <span className="text-xs text-slate-400 mt-2 text-center">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 mt-6 text-sm">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-slate-500 dark:text-slate-400">Revenue</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full mr-2"></span>
                    <span className="text-slate-500 dark:text-slate-400">Target</span>
                </div>
            </div>
        </div>
    );
}
