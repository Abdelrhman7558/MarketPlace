import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Percent, CheckCircle2 } from 'lucide-react';

interface FilterProps {
    brands: string[];
    categories: string[];
    selectedBrands: string[];
    selectedCategories: string[];
    priceRange: { min: string; max: string };
    onBrandChange: (brand: string) => void;
    onCategoryChange: (category: string) => void;
    onPriceChange: (range: { min: string; max: string }) => void;
    onApplyPrice: () => void;
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-4 group"
            >
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#FF7A1A] transition-colors">{title}</h3>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF7A1A]' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import { AnimatePresence } from 'framer-motion';

export default function ProductFilters(props: FilterProps) {
    const minVal = parseInt(props.priceRange.min) || 0;
    const maxVal = parseInt(props.priceRange.max) || 1000;

    // Simple Slider Logic
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        const value = e.target.value;
        if (type === 'min') {
            if (parseInt(value) <= maxVal) {
                props.onPriceChange({ ...props.priceRange, min: value });
            }
        } else {
            if (parseInt(value) >= minVal) {
                props.onPriceChange({ ...props.priceRange, max: value });
            }
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-50">
            {/* Department */}
            <FilterSection title="Categories">
                <div className="flex flex-col gap-2">
                    {props.categories.map(cat => {
                        const isActive = props.selectedCategories.includes(cat);
                        return (
                            <button
                                key={cat}
                                onClick={() => props.onCategoryChange(cat)}
                                className={`text-sm py-2 px-4 rounded-xl text-left transition-all flex items-center justify-between group
                                    ${isActive
                                        ? 'bg-[#FF7A1A] text-white font-black shadow-lg shadow-[#FF7A1A]/20'
                                        : 'text-gray-500 font-bold hover:bg-gray-50 hover:text-[#050B18]'
                                    }`}
                            >
                                <span>{cat}</span>
                                {isActive && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Brand */}
            <FilterSection title="Manufacturer">
                <div className="grid grid-cols-1 gap-2">
                    {props.brands.map(brand => {
                        const isActive = props.selectedBrands.includes(brand);
                        return (
                            <label key={brand} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all
                                ${isActive
                                    ? 'bg-[#050B18] border-[#050B18] text-white'
                                    : 'bg-white border-gray-100 hover:border-[#FF7A1A]/30 text-gray-600'
                                }`}>
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
                                    ${isActive ? 'bg-[#FF7A1A] border-[#FF7A1A]' : 'bg-gray-50 border-gray-200'}`}>
                                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => props.onBrandChange(brand)}
                                    className="hidden"
                                />
                                <span className="text-xs font-black uppercase tracking-wider">{brand}</span>
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Price Slider */}
            <FilterSection title="Wholesale Price Range">
                <div className="space-y-8 pt-2">
                    <div className="relative h-2 bg-gray-100 rounded-full">
                        {/* Track Highlights */}
                        <div
                            className="absolute h-full bg-[#FF7A1A] rounded-full"
                            style={{
                                left: `${(minVal / 1000) * 100}%`,
                                right: `${100 - (maxVal / 1000) * 100}%`
                            }}
                        />

                        {/* Range Inputs (Overlaid) */}
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={minVal}
                            onChange={(e) => handleSliderChange(e, 'min')}
                            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none z-20 slider-thumb"
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxVal}
                            onChange={(e) => handleSliderChange(e, 'max')}
                            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none z-20 slider-thumb"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Min</p>
                            <p className="text-sm font-black text-[#050B18]">${minVal}</p>
                        </div>
                        <div className="w-4 h-px bg-gray-200" />
                        <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100 text-right">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Max</p>
                            <p className="text-sm font-black text-[#050B18]">${maxVal === 1000 ? '1000+' : maxVal}</p>
                        </div>
                    </div>

                    <button
                        onClick={props.onApplyPrice}
                        className="w-full bg-[#050B18] text-white py-4 rounded-xl font-black text-sm hover:bg-[#1a2130] transition-all shadow-xl shadow-gray-200 active:scale-95"
                    >
                        APPLY RANGE
                    </button>

                    <style jsx>{`
                        .slider-thumb::-webkit-slider-thumb {
                            appearance: none;
                            width: 24px;
                            height: 24px;
                            background: white;
                            border: 4px solid #FF7A1A;
                            border-radius: 50%;
                            cursor: pointer;
                            pointer-events: auto;
                            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                            transition: all 0.2s;
                        }
                        .slider-thumb::-webkit-slider-thumb:hover {
                            transform: scale(1.1);
                            background: #FF7A1A;
                        }
                    `}</style>
                </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Stock Status" defaultOpen={false}>
                <label className="flex items-center gap-3 cursor-pointer group p-3 hover:bg-gray-50 rounded-xl transition-all">
                    <div className="w-5 h-5 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center group-hover:border-[#FF7A1A]/30">
                        <Percent className="w-3 h-3 text-gray-300 group-hover:text-[#FF7A1A]" />
                    </div>
                    <span className="text-xs font-black text-gray-500 uppercase tracking-wider group-hover:text-[#050B18]">Discounted Only</span>
                </label>
            </FilterSection>
        </div>
    );
}

import { CheckCircle2 } from 'lucide-react';
