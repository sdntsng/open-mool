
export const Logo = ({ className = "", showText = true }: { className?: string, showText?: boolean }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon: Rounded Square with incomplete 'ma' */}
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
            >
                {/* Rounded Square Container */}
                <rect
                    x="2"
                    y="2"
                    width="36"
                    height="36"
                    rx="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                />

                {/* Stylized 'ma' (Devanagari म) - Incomplete/Minimalist 
            Path: loop start, curve down, loop up, cross bar (broken/short), vertical stem.
        */}
                <path
                    d="M12 14C12 14 12 24 12 25C12 27.5 14 28 16 26C18 24 16 20 12 20H26M26 12V28"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-text-primary"
                />
            </svg>

            {/* Logotype */}
            {showText && (
                <span className="font-heading text-2xl font-bold text-text-primary tracking-tight">
                    Open<span className="text-primary">Mool</span>
                </span>
            )}
        </div>
    );
};
