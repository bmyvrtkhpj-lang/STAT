import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Bell,
  Bookmark,
  Clock,
  MessageSquare,
  Target,
  Calendar,
  Rss,
  Grid3x3,
  HelpCircle,
  ChevronRight,
  Minus,
} from "lucide-react";

// ---- sample / illustrative data only (not live market data) ----
const CHART_VALUES = [
  5, 12, 22, 18, 28, 24, 34, 40, 36, 44, 40, 48, 44, 50, 46, 52, 48, 54, 50,
  56, 52, 50, 46, 42, 44, 48, 52, 56, 60, 58, 62, 58, 54, 58, 62, 60, 56, 52,
  48, 44, 40, 34, 28, 20, 14, 90, 78, 82, 76, 80, 84, 80, 86, 82, 88, 86, 90,
  88, 92, 90, 94, 92, 96, 98,
];

const TIME_LABELS = [
  { t: "09:30", bold: false },
  { t: "10:00", bold: true },
  { t: "10:30", bold: false },
  { t: "11:00", bold: true },
  { t: "11:30", bold: false },
  { t: "12:00", bold: true },
  { t: "12:30", bold: false },
  { t: "13:00", bold: true },
  { t: "13:30", bold: false },
  { t: "14:00", bold: true },
  { t: "14:30", bold: false },
  { t: "15:00", bold: true },
  { t: "15:28", bold: false },
];

const NSE_STOCKS = [
  { proName: "NSE:RELIANCE", title: "Reliance" },
  { proName: "NSE:TCS", title: "TCS" },
  { proName: "NSE:HDFCBANK", title: "HDFC Bank" },
  { proName: "NSE:INFY", title: "Infosys" },
  { proName: "NSE:ICICIBANK", title: "ICICI Bank" },
  { proName: "NSE:ITC", title: "ITC" },
  { proName: "NSE:SBIN", title: "SBI" },
  { proName: "NSE:BHARTIARTL", title: "Bharti Airtel" },
  { proName: "NSE:LT", title: "L&T" },
  { proName: "NSE:HINDUNILVR", title: "HUL" },
  { proName: "NSE:KOTAKBANK", title: "Kotak Bank" },
  { proName: "NSE:AXISBANK", title: "Axis Bank" },
  { proName: "NSE:MARUTI", title: "Maruti Suzuki" },
  { proName: "NSE:SUNPHARMA", title: "Sun Pharma" },
  { proName: "NSE:TATAMOTORS", title: "Tata Motors" },
];

function AreaChart() {
  const { linePath, areaPath, w, h } = useMemo(() => {
    const w = 1000;
    const h = 300;
    const stepX = w / (CHART_VALUES.length - 1);
    const maxV = 100;
    let linePath = "";
    CHART_VALUES.forEach((v, i) => {
      const x = i * stepX;
      const y = h - (v / maxV) * h;
      linePath += `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)} `;
    });
    const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;
    return { linePath, areaPath, w, h };
  }, []);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${1000} ${300}`}
        className="w-full h-[260px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22b573" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22b573" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#1f9d6b"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between mt-2 px-1">
        {TIME_LABELS.map((l) => (
          <span
            key={l.t}
            className={`text-[11px] ${
              l.bold ? "text-neutral-700 font-semibold" : "text-neutral-400"
            }`}
          >
            {l.t}
          </span>
        ))}
      </div>
    </div>
  );
}

// TOP NAV COMPONENT (Updated as per request)
function TopNav({ activeTab, setActiveTab, showStrategies, setShowStrategies }) {
  // Strategies Data
  const strategiesList = [
    { name: "Alpha Hedging", desc: "Market girne par portfolio protect karta hai." },
    { name: "Momentum Swing", desc: "Fast-moving stocks me short-term profit." },
    { name: "Long Term Core", desc: "Stable aur blue-chip stocks ka portfolio." }
  ];

  return (
    <header className="border-b border-neutral-100 bg-white relative z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-[76px] flex items-center justify-between">
        
        {/* Left Side: "S" Icon & Dropdown */}
        <div className="relative flex-shrink-0">
          <button 
            onClick={() => setShowStrategies(!showStrategies)}
            className="h-9 w-9 bg-black text-white text-sm font-bold rounded-lg flex items-center justify-center hover:bg-neutral-800 transition"
          >
            S
          </button>

          {/* Strategies Dropdown Menu */}
          {showStrategies && (
            <div className="absolute top-12 left-0 w-72 bg-white border border-neutral-200 rounded-xl shadow-xl p-4 z-50">
              <h3 className="font-bold text-neutral-800 mb-3 border-b pb-2">My Strategies</h3>
              <div className="space-y-3">
                {strategiesList.map((strat, index) => (
                  <div key={index} className="hover:bg-neutral-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <p className="font-semibold text-sm text-neutral-900">{strat.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{strat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle: Tabs (White & Black) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 h-full">
          <button 
            onClick={() => setActiveTab('White')}
            className={`text-[15px] font-medium h-full border-b-2 transition-colors ${
              activeTab === 'White' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'
            }`}
          >
            White
          </button>
          <button 
            onClick={() => setActiveTab('Black')}
            className={`text-[15px] font-medium h-full border-b-2 transition-colors ${
              activeTab === 'Black' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'
            }`}
          >
            Black
          </button>
        </nav>

        {/* Right Side: Kept empty intentionally */}
        <div className="w-9 flex-shrink-0"></div>
      </div>
    </header>
  );
}

function IndexCard() {
  return (
    <div
      className="rounded-2xl border border-neutral-100 p-6 bg-white"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-[#131a3a] flex items-center justify-center text-white font-bold text-base">
          50
        </div>
        <span className="text-lg font-semibold text-neutral-900">
          Nifty 50
        </span>
        <span className="text-xs font-semibold bg-neutral-100 text-neutral-500 px-2 py-1 rounded">
          NIFTY
        </span>
        <button className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
          <Minus size={14} />
        </button>
      </div>

      <div className="flex items-end gap-3 mt-3">
        <span className="text-5xl font-bold tracking-tight text-neutral-900">
          24,334.30
        </span>
        <span className="text-sm text-neutral-400 mb-2">POINT</span>
        <span className="text-lg font-medium text-emerald-600 mb-1.5">
          +1.09%
        </span>
      </div>

      <div className="mt-4">
        <AreaChart />
      </div>
    </div>
  );
}

function MajorIndicesCard() {
  const rows = [
    {
      icon: "BSE",
      iconBg: "bg-blue-600",
      name: "Sensex",
      tag: "D",
      pill: "SENSEX",
      pillBg: "bg-blue-600",
      value: "78,151.45",
      change: "+1.25%",
      highlighted: true,
    },
    {
      icon: "S&P",
      iconBg: "bg-red-600",
      name: "S&P 500",
      tag: "D",
      pill: "SPX",
      pillBg: "bg-neutral-700",
      value: "7,457.69",
      change: "+0.62%",
      highlighted: false,
    },
  ];

  return (
    <div
      className="rounded-2xl border border-neutral-100 p-6 bg-white"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <h3 className="text-lg font-semibold mb-2">Major indices</h3>
      <div className="-mx-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className={`flex items-center justify-between rounded-xl px-3 py-3 ${
              r.highlighted ? "bg-neutral-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-full ${r.iconBg} flex items-center justify-center text-white text-[10px] font-bold`}
              >
                {r.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-neutral-900">
                    {r.name}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold align-super">
                    {r.tag}
                  </span>
                  <button className="h-5 w-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <Minus size={10} />
                  </button>
                </div>
                <span
                  className={`text-[11px] font-semibold text-white ${r.pillBg} px-1.5 py-0.5 rounded`}
                >
                  {r.pill}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-neutral-900">
                {r.value}
                <span className="text-xs font-normal text-neutral-400 ml-1">
                  POINT
                </span>
              </div>
              <div className="text-emerald-600 text-sm">{r.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CryptoCard() {
  const spark = [10, 22, 16, 28, 24, 34, 30, 40, 36, 46, 42, 50, 48, 58];
  const w = 300;
  const h = 90;
  const stepX = w / (spark.length - 1);
  const path = spark
    .map((v, i) => {
      const x = i * stepX;
      const y = h - (v / 60) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      className="rounded-2xl border border-neutral-100 p-6 bg-white flex flex-col"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 rounded-full bg-blue-500" />
        <span className="text-lg font-semibold">Crypto market cap</span>
        <span className="text-xs font-semibold bg-neutral-100 text-neutral-500 px-2 py-1 rounded">
          TOTAL
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">2.19T</span>
        <span className="text-sm text-neutral-400 mb-1">USD</span>
      </div>
      <div className="text-emerald-600 mb-2">+1.94%</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[80px] mt-auto">
        <path d={path} fill="none" stroke="#1f9d6b" strokeWidth="2" />
      </svg>
    </div>
  );
}

function TradingViewChart({ symbol = "NSE:NIFTY", theme = "light", height = 480 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme,
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_top_toolbar: false,
      watchlist: NSE_STOCKS.map((s) => s.proName),
      support_host: "https://www.tradingview.com",
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, theme]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full"
      style={{ height }}
    />
  );
}

function TradingViewMiniChart({ symbol, height = 220 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: "100%",
      height,
      locale: "en",
      dateRange: "1D",
      colorTheme: "light",
      isTransparent: false,
      autosize: true,
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, height]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full"
      style={{ height }}
    />
  );
}

// Updated IndicesGrid to accept title and dynamic data
function IndicesGrid({ title, indicesData }) {
  return (
    <div
      className="rounded-2xl border border-neutral-100 bg-white p-5 mt-5"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 px-1">{title}</h3>
      {/* 4 columns for large screens, 2 for medium, 1 for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indicesData.map((idx) => (
          <div
            key={idx.symbol}
            className="rounded-xl border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <TradingViewMiniChart symbol={idx.symbol} height={210} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TickerTape() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: NSE_STOCKS,
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="rounded-2xl border border-neutral-100 bg-white overflow-hidden mt-5"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <div ref={containerRef} className="tradingview-widget-container w-full" />
    </div>
  );
}

function ChartCard() {
  return (
    <div
      className="rounded-2xl border border-neutral-100 bg-white p-2 sm:p-4 mt-5"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.03), 0 12px 28px -14px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex items-center justify-between px-3 pt-2 pb-3">
        <h3 className="text-lg font-semibold">Stock chart & watchlist</h3>
        <span className="text-xs text-neutral-400">
          Live via TradingView widget — click any symbol in the watchlist panel to switch
        </span>
      </div>
      <TradingViewChart symbol="NSE:NIFTY" />
    </div>
  );
}

function RightRail() {
  const icons = [
    Bookmark,
    Clock,
    MessageSquare,
    Target,
    Calendar,
    Rss,
    Bell,
    Grid3x3,
    HelpCircle,
  ];
  return (
    <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col gap-1 z-10">
      {icons.map((Icon, i) => (
        <button
          key={i}
          className="h-10 w-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}

// MAIN APP COMPONENT
export default function App() {
  const [activeTab, setActiveTab] = useState('White');
  const [showStrategies, setShowStrategies] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 🇮🇳 Indian Indices List
  const indianIndices = [
    { symbol: "NSE:NIFTY", label: "Nifty 50" },
    { symbol: "NSE:BANKNIFTY", label: "Bank Nifty" },
    { symbol: "BSE:SENSEX", label: "Sensex" },
    { symbol: "NSE:FINNIFTY", label: "FinNifty" },
    { symbol: "NSE:CNXIT", label: "Nifty IT" },
    { symbol: "NSE:CNXAUTO", label: "Nifty Auto" },
    { symbol: "NSE:NIFTYMIDCAP100", label: "Midcap 100" },
    { symbol: "NSE:CNXFMCG", label: "Nifty FMCG" },
  ];

  // 🌎 Global (Foreign) Indices List
  const globalIndices = [
    { symbol: "TVC:SPX", label: "S&P 500 (US)" },
    { symbol: "NASDAQ:NDX", label: "NASDAQ 100 (US)" },
    { symbol: "TVC:DJI", label: "Dow Jones (US)" },
    { symbol: "TVC:UKX", label: "FTSE 100 (UK)" },
    { symbol: "TVC:NI225", label: "Nikkei 225 (Japan)" },
    { symbol: "XETR:DAX", label: "DAX (Germany)" },
    { symbol: "TVC:HSI", label: "Hang Seng (Hong Kong)" },
    { symbol: "TVC:SHCOMP", label: "Shanghai Composite" },
  ];

  return (
    <div className={`min-h-screen font-sans ${activeTab === 'Black' ? 'bg-neutral-900 text-white' : 'bg-gray-50 text-neutral-900'}`}>
      
      <TopNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showStrategies={showStrategies} 
        setShowStrategies={setShowStrategies} 
      />
      
      <main className="max-w-[1400px] mx-auto px-6 pt-8 pb-16 md:pr-20">
        
        <div className="mb-8 relative max-w-xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className={activeTab === 'Black' ? 'text-neutral-500' : 'text-neutral-400'} />
          </div>
          <input
            type="text"
            placeholder={`Search funds in ${activeTab} strategy...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors ${
              activeTab === 'Black' 
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400'
            }`}
          />
        </div>

        {activeTab === 'White' ? (
          <>
            <h1 className="flex items-center gap-1 text-[26px] font-semibold mb-6 cursor-pointer w-fit group">
              Market summary
              <ChevronRight
                size={20}
                className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"
              />
            </h1>
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <IndexCard />
              <MajorIndicesCard />
            </div>

            {/* Indian Indices Grid */}
            <IndicesGrid title="🇮🇳 Indian Markets" indicesData={indianIndices} />
            
            {/* Foreign Indices Grid */}
            <IndicesGrid title="🌎 Global Markets" indicesData={globalIndices} />

            <TickerTape />
            <ChartCard />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2 text-white">Black Strategy Data</h2>
            <p className="text-neutral-400">Yahan aapki Black strategy ke dark-themed charts aur data aayenge.</p>
          </div>
        )}

      </main>

      {activeTab === 'White' && <RightRail />}
    </div>
  );
}
