
export const Logo = ({ className = "", showText = true }: { className?: string, showText?: boolean }) => {
    return (
        <div className={`flex items-center gap-3 group ${className}`}>
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary transition-transform duration-300 group-hover:scale-105"
            >
                <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
                    </linearGradient>
                </defs>

                {/* The main container squircle - maximized size and roundedness */}
                <rect
                    x="1"
                    y="1"
                    width="38"
                    height="38"
                    rx="12"
                    stroke="url(#logo-gradient)"
                    strokeWidth="3"
                    fill="currentColor"
                    fillOpacity="0.05"
                    className="group-hover:fill-opacity-10 transition-all duration-300"
                />

                {/* Integrated 'Ma' Design
                    - Top of loop starts at y=1 (aligns with top border)
                    - Connects to right at x=39 (aligns with right border)
                    - Stroke width matches border (3px) to prevent "leaking" caps
                */}
                <path
                    d="M16 1V22C16 24.5 12 24.5 12 22C12 19.5 16 19.5 16 19.5H39"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

            </svg>

            {/* Logotype */}
            {showText && (
                <span className="font-heading text-2xl font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors duration-300">
                    Open<span className="text-primary group-hover:brightness-110">Mool</span>
                </span>
            )}
        </div>
    );
};
