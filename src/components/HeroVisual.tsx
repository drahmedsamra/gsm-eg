export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg overflow-hidden lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gsm-blue/20 via-transparent to-gsm-red/15 blur-3xl animate-pulse-glow" />

      <div className="relative flex h-full min-h-[280px] items-center justify-center rounded-3xl border border-gsm-navy/10 bg-white/80 p-8 shadow-xl shadow-gsm-navy/5 backdrop-blur-sm sm:min-h-[360px] lg:min-h-[420px]">
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full max-h-[340px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1aff" />
              <stop offset="100%" stopColor="#06004f" />
            </linearGradient>

            <linearGradient id="heroRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d50000" />
              <stop offset="100%" stopColor="#8b0000" />
            </linearGradient>
          </defs>

          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="url(#heroGrad)"
            strokeWidth="1"
            opacity="0.2"
          />

          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="#1a1aff"
            strokeWidth="1"
            opacity="0.15"
            strokeDasharray="8 8"
          />

          <rect
            x="120"
            y="140"
            width="160"
            height="110"
            rx="12"
            fill="#06004f"
            opacity="0.95"
          />

          <rect
            x="130"
            y="155"
            width="140"
            height="8"
            rx="2"
            fill="#1a1aff"
          />

          <rect
            x="130"
            y="175"
            width="100"
            height="6"
            rx="2"
            fill="#1a1aff"
            opacity="0.6"
          />

          <rect
            x="130"
            y="190"
            width="120"
            height="6"
            rx="2"
            fill="#d50000"
            opacity="0.8"
          />

          <rect
            x="130"
            y="205"
            width="80"
            height="6"
            rx="2"
            fill="#1a1aff"
            opacity="0.4"
          />

          <text
            x="145"
            y="235"
            fill="#1a1aff"
            fontSize="11"
            fontFamily="monospace"
            opacity="0.9"
          >
            {"{ AI · Code }"}
          </text>

          <circle
            cx="300"
            cy="120"
            r="28"
            fill="url(#heroRed)"
            className="animate-float"
          />

          <path
            d="M288 120 L296 128 L312 108"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g
            className="animate-float-slow"
            style={{ transformOrigin: "80px 280px" }}
          >
            <rect
              x="50"
              y="250"
              width="60"
              height="45"
              rx="6"
              fill="#1a1aff"
              opacity="0.9"
            />

            <circle cx="65" cy="268" r="4" fill="white" />
            <circle cx="95" cy="268" r="4" fill="white" />

            <line
              x1="80"
              y1="278"
              x2="80"
              y2="288"
              stroke="white"
              strokeWidth="2"
            />
          </g>

          <g
            className="animate-float"
            style={{
              animationDelay: "1s",
              transformOrigin: "320px 300px",
            }}
          >
            <path
              d="M300 290 L340 290 L330 320 L310 320 Z"
              fill="#06004f"
              opacity="0.85"
            />

            <circle cx="320" cy="278" r="12" fill="#d50000" />
          </g>

          <path
            d="M180 80 L200 60 L220 80 L200 95 Z"
            fill="#1a1aff"
            opacity="0.7"
            className="animate-float-slow"
          />
        </svg>
      </div>

      <div className="absolute -top-2 end-4 rounded-xl border border-gsm-blue/20 bg-white px-3 py-2 text-xs font-en font-semibold text-gsm-blue shadow-lg animate-float">
        Python
      </div>

      <div
        className="absolute bottom-8 start-2 rounded-xl border border-gsm-red/20 bg-white px-3 py-2 text-xs font-en font-semibold text-gsm-red shadow-lg animate-float-slow"
        style={{ animationDelay: "0.5s" }}
      >
        Arduino
      </div>

      <div
        className="absolute top-1/3 end-2 rounded-xl border border-gsm-navy/10 bg-gsm-navy px-3 py-2 text-xs font-semibold text-white shadow-lg animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        AI / ML
      </div>
    </div>
  );
}