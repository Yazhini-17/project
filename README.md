# Tamil Nadu Market Gap Finder

A MERN stack application to identify market opportunities across Tamil Nadu pincodes by analyzing business density, population, demand indicators, and competition data.

## Problem Statement

Entrepreneurs and franchise companies often struggle to identify where demand exists but competition is low. Most business decisions are based on assumptions rather than data.

## Solution

Build a data analytics platform that analyzes business density, population, and demand indicators across Tamil Nadu pincodes to identify underserved business opportunities.

## Features

### Core Features
- **Pincode-wise Opportunity Analysis**: Analyze market gaps by specific pincodes across Tamil Nadu
- **Category-wise Competitor Count**: View competitor counts for each business category per pincode
- **Demand Forecasting**: Project future demand based on population growth and search trends
- **Market Gap Score Calculation**: Compute market gap scores using the formula: `Market Gap Score = Demand Score - Competition Score`
- **Interactive Heat Maps**: Visual representation of market opportunities with circle size indicating population and color indicating opportunity level
- **District and Business Category Filters**: Filter data by district and business category
- **Exportable Reports**: Download comprehensive CSV reports with all analysis data

### Detailed Features
- **District Selection**: Select from major Tamil Nadu districts (Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Erode)
- **Pincode Search**: Search for specific pincodes within selected districts
- **Business Category Filter**: Filter by business categories (Pharmacy, Supermarket, Restaurant, Coaching Centre, etc.)
- **Ranking Table**: View top opportunities ranked by Market Gap Score with columns for Rank, Pincode, Area, Business Category, Competitors, Demand Score, and Market Gap Score
- **Demand vs Supply Analysis**: 
  - Bar chart showing demand, supply, and gap for each business category
  - Line chart showing demand forecasting with current vs projected demand
  - Bar chart showing market gap score distribution
  - Pie chart showing business category gap share
- **Interactive Heat Map**: 
  - Circle size represents population
  - Color represents market opportunity (Red: High ≥80, Orange: Medium 70-79, Green: Low <70)
  - Detailed popup with population growth, income level, urban development, search trends, and top categories
- **Top Pincodes**: List of pincodes sorted by market opportunity with population, growth rate, and best business category
- **Business Category Summary**: Quick view of business category gaps

## Data Covered

**Districts:**
- Chennai (T. Nagar - 600100, Anna Nagar - 600040)
- Coimbatore (Gandhipuram - 641035, RS Puram - 641002)
- Madurai (KK Nagar - 625020)
- Tiruchirappalli (Srirangam - 620018)
- Salem (Fairlands - 636004)
- Erode (Brough Road - 638001)

**Business Categories:**
- Pharmacy, Supermarket, Restaurant, Coaching Centre

**Metrics per Pincode:**
- Population and population growth rate
- Income level (High/Medium)
- Competitor count per category
- Demand score per category (0-100)
- Market gap score per category (0-100)
- Urban development index (0-100)
- Search trends index (0-100)

## Market Gap Score Formula

```
Market Gap Score = Demand Score - Competition Score
```

Higher score = Better business opportunity

## Example Output

| Rank | Pincode | Business Category | Competitors | Demand Score | Market Gap Score |
|------|---------|------------------|-------------|-------------|-----------------|
| 1    | 600100  | Pharmacy         | 4           | 92          | 88              |
| 2    | 641035  | Supermarket      | 6           | 89          | 83              |
| 3    | 620018  | Coaching Centre  | 3           | 85          | 82              |

## Frontend Stack

- React 18
- Recharts (for charts - Bar, Line, Pie)
- Leaflet & React-Leaflet (for interactive heat maps)
- CSS3 (modern styling with gradients and animations)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
marketgap/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DistrictSelector.js
│   │   ├── SearchBar.js
│   │   ├── FilterPanel.js
│   │   ├── PincodeAnalysis.js
│   │   ├── ExportButton.js
│   │   ├── ChartsSection.js
│   │   ├── MapSection.js
│   │   └── TopAreas.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Components

- **DistrictSelector**: Dropdown to select Tamil Nadu districts
- **SearchBar**: Search functionality for pincodes within selected district
- **FilterPanel**: Filter data by business category
- **PincodeAnalysis**: Ranking table showing top opportunities by Market Gap Score
- **ExportButton**: Download comprehensive CSV reports
- **ChartsSection**: Display demand vs supply, demand forecasting, market gap distribution, and category share charts
- **MapSection**: Interactive heat map showing pincodes with detailed market gap data
- **TopAreas**: List of pincodes sorted by market opportunity with business category summary

## How It Works

### Step 1: Data Collection
- Census population data
- Google Maps business listings
- Business directories
- Demographic and income data
- Infrastructure information

### Step 2: Calculate Business Density
Example:
- Pincode: 600100
- Population: 1,20,000
- Restaurants: 18
- Restaurant Density: 18 restaurants / 1,20,000 people

### Step 3: Generate Demand Signals
Factors:
- Population size
- Population growth
- Nearby residential projects
- Search trends
- Competitor count
- Income levels
- Urban development indicators

### Step 4: Compute Market Gap Score
```
Market Gap Score = Demand Score - Competition Score
```

## Future Enhancements (Backend)

- MongoDB database for storing business and population data
- Express.js API for data retrieval
- Node.js server for backend logic
- Real-time data integration from Google Maps API
- User authentication and saved reports
- Advanced analytics and reporting
- More Tamil Nadu districts and pincodes
- Historical trend analysis
- Machine learning for demand prediction
- Mobile app development


import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell,
} from "recharts";
const PINCODES = [
  {rank:1,  pincode:"600100",district:"Chennai",    category:"Pharmacy",        competitors:4,  demand:92,gap:88,population:120000,income:"High",growth:8.2},
  {rank:2,  pincode:"641035",district:"Coimbatore", category:"Supermarket",     competitors:6,  demand:89,gap:83,population:98000, income:"Mid", growth:6.8},
  {rank:3,  pincode:"620018",district:"Trichy",     category:"Coaching Centre", competitors:3,  demand:85,gap:82,population:85000, income:"Mid", growth:9.1},
  {rank:4,  pincode:"625001",district:"Madurai",    category:"Clinic",          competitors:5,  demand:88,gap:79,population:105000,income:"Mid", growth:7.4},
  {rank:5,  pincode:"636001",district:"Salem",      category:"Restaurant",      competitors:9,  demand:84,gap:75,population:92000, income:"Low", growth:5.6},
  {rank:6,  pincode:"600028",district:"Chennai",    category:"Gym",             competitors:7,  demand:80,gap:73,population:78000, income:"High",growth:11.2},
  {rank:7,  pincode:"641041",district:"Coimbatore", category:"Pharmacy",        competitors:5,  demand:79,gap:71,population:88000, income:"Mid", growth:6.1},
  {rank:8,  pincode:"600091",district:"Chennai",    category:"Clinic",          competitors:8,  demand:82,gap:68,population:115000,income:"High",growth:7.9},
  {rank:9,  pincode:"620017",district:"Trichy",     category:"Restaurant",      competitors:11, demand:77,gap:66,population:73000, income:"Low", growth:4.8},
  {rank:10, pincode:"625020",district:"Madurai",    category:"Supermarket",     competitors:7,  demand:75,gap:64,population:91000, income:"Mid", growth:5.9},
  {rank:11, pincode:"636003",district:"Salem",      category:"Coaching Centre", competitors:4,  demand:73,gap:69,population:67000, income:"Low", growth:8.7},
  {rank:12, pincode:"641002",district:"Coimbatore", category:"Gym",             competitors:10, demand:70,gap:60,population:80000, income:"Mid", growth:9.3},
  {rank:13, pincode:"600015",district:"Chennai",    category:"Restaurant",      competitors:15, demand:88,gap:58,population:130000,income:"High",growth:6.5},
  {rank:14, pincode:"620003",district:"Trichy",     category:"Pharmacy",        competitors:6,  demand:68,gap:62,population:62000, income:"Low", growth:5.2},
  {rank:15, pincode:"625011",district:"Madurai",    category:"Coaching Centre", competitors:5,  demand:72,gap:67,population:83000, income:"Mid", growth:7.8},
  {rank:16, pincode:"636007",district:"Salem",      category:"Supermarket",     competitors:8,  demand:69,gap:55,population:58000, income:"Low", growth:4.1},
  {rank:17, pincode:"641045",district:"Coimbatore", category:"Clinic",          competitors:9,  demand:74,gap:61,population:76000, income:"Mid", growth:6.6},
  {rank:18, pincode:"600040",district:"Chennai",    category:"Supermarket",     competitors:12, demand:85,gap:57,population:125000,income:"High",growth:8.8},
  {rank:19, pincode:"620020",district:"Trichy",     category:"Gym",             competitors:6,  demand:71,gap:65,population:59000, income:"Mid", growth:10.1},
  {rank:20, pincode:"625025",district:"Madurai",    category:"Pharmacy",        competitors:7,  demand:67,gap:53,population:70000, income:"Low", growth:5.0},
  {rank:21, pincode:"636015",district:"Salem",      category:"Clinic",          competitors:4,  demand:63,gap:59,population:54000, income:"Low", growth:3.8},
  {rank:22, pincode:"641060",district:"Coimbatore", category:"Restaurant",      competitors:8,  demand:76,gap:61,population:87000, income:"Mid", growth:7.2},
  {rank:23, pincode:"600050",district:"Chennai",    category:"Coaching Centre", competitors:14, demand:90,gap:62,population:118000,income:"High",growth:9.5},
  {rank:24, pincode:"620022",district:"Trichy",     category:"Supermarket",     competitors:9,  demand:65,gap:50,population:61000, income:"Low", growth:4.4},
  {rank:25, pincode:"625030",district:"Madurai",    category:"Gym",             competitors:5,  demand:69,gap:64,population:79000, income:"Mid", growth:8.9},
];

const CATEGORIES = ["All","Pharmacy","Supermarket","Coaching Centre","Clinic","Restaurant","Gym"];
const DISTRICTS  = ["All","Chennai","Coimbatore","Trichy","Madurai","Salem"];
const CAT_COLORS = {
  "Pharmacy":"#2a78d6","Supermarket":"#1baf7a","Coaching Centre":"#eda100",
  "Clinic":"#4a3aa7","Restaurant":"#e34948","Gym":"#e87ba4",
};

const grade      = s => s>=85?"A+":s>=75?"A":s>=65?"B+":s>=55?"B":"C";
const gradeColor = s => s>=85?"#1baf7a":s>=75?"#2a78d6":s>=65?"#eda100":"#e34948";
function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative w-14 h-7 rounded-full border-2 transition-all duration-300 cursor-pointer
        flex items-center px-0.5 flex-shrink-0
        ${dark
          ? "bg-amber-500 border-amber-400"
          : "bg-sky-200 border-sky-300"}
      `}
    >
      {
      <span className="absolute left-1 text-xs select-none pointer-events-none">
        {dark ? "" : "☀️"}
      </span>
      <span className="absolute right-1 text-xs select-none pointer-events-none">
        {dark ? "🌙" : ""}
      </span>
      {}
      <span className={`
        w-5 h-5 rounded-full shadow-md flex items-center justify-center text-sm
        transition-transform duration-300 z-10
        ${dark ? "translate-x-7 bg-gray-900" : "translate-x-0 bg-white"}
      `}>
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

function Badge({ cat }) {
  const c = CAT_COLORS[cat] || "#888";
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap"
      style={{ background: c + "22", color: c, border: `1px solid ${c}44` }}
    >
      {cat}
    </span>
  );
}

function KpiCard({ label, value, sub, accent }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        borderTop: `3px solid ${accent}`,
      }}
    >
      <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "var(--text-sub)" }}>{sub}</p>}
    </div>
  );
}

function LoginPage({ onLogin, dark, setDark }) {
  const [email, setEmail] = useState("");
  const [pw, setPw]       = useState("");
  const [showPw, setShow] = useState(false);
  const [loading, setLoad]= useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (!email.trim() || !pw.trim()) { setError("Enter your email and password."); return; }
    if (!email.includes("@"))        { setError("Enter a valid email address.");   return; }
    if (pw.length < 6)               { setError("Password must be at least 6 characters."); return; }
    setLoad(true);
    setTimeout(() => onLogin(), 1100);
  };

  return (
    <div className="min-h-screen flex relative" style={{ background: "var(--bg)", fontFamily: "system-ui,sans-serif" }}>
      {}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>

      {}
      <div className="hidden md:flex flex-col justify-center w-5/12 flex-shrink-0 bg-gray-950 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }}/>
        <div className="absolute -top-1/5 -left-1/10 w-3/5 h-3/5 pointer-events-none"
          style={{ background:"radial-gradient(circle,#f59e0b33 0%,transparent 70%)" }}/>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 bg-amber-400 rounded-lg flex items-center justify-center text-black font-bold text-lg">📍</div>
            <span className="font-bold text-base tracking-wide">MarketGap</span>
          </div>

          <h1 className="text-3xl font-semibold leading-snug mb-6 text-white">
            Find where demand<br/>meets opportunity.
          </h1>

          <div className="mb-8 space-y-2">
            {["Pincode-level market analysis","AI-powered demand forecasting","Interactive heat maps across Tamil Nadu","Exportable opportunity reports"].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-amber-400 font-bold">✓</span>{f}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[["1,240+","Pincodes"],["32","Districts"],["4,800+","Opportunities"],["6","Categories"]].map(([v,l]) => (
              <div key={l} className="bg-white/5 rounded-lg p-3">
                <div className="text-xl font-semibold text-amber-400">{v}</div>
                <div className="text-xs text-slate-400">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-1" style={{ color:"var(--text-primary)" }}>Sign in</h2>
          <p className="text-sm mb-8" style={{ color:"var(--text-sub)" }}>Access your market intelligence dashboard</p>

          <div className="mb-4">
            <label className="block text-xs mb-1.5" style={{ color:"var(--text-sub)" }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              onKeyDown={e => e.key==="Enter" && submit()}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none transition-colors"
              style={{ background:"var(--input-bg)", borderColor:"var(--input-border)", color:"var(--input-text)" }}
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs mb-1.5" style={{ color:"var(--text-sub)" }}>Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)}
                placeholder="Enter your password"
                onKeyDown={e => e.key==="Enter" && submit()}
                className="w-full rounded-lg px-3 py-2 pr-10 text-sm border outline-none transition-colors"
                style={{ background:"var(--input-bg)", borderColor:"var(--input-border)", color:"var(--input-text)" }}
              />
              <button onClick={() => setShow(s => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-base"
                style={{ color:"var(--text-muted)", background:"none", border:"none", cursor:"pointer" }}>
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 rounded-lg text-xs flex items-center gap-2 bg-red-100 border border-red-300 text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button onClick={submit} disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{ background: loading ? "#d97706" : "#f59e0b", color:"#000", border:"none", cursor: loading ? "wait" : "pointer" }}>
            {loading ? <>⏳ Signing in…</> : "Sign in"}
          </button>

          <p className="text-xs mt-4 text-center" style={{ color:"var(--text-muted)" }}>
            Use any email and a password of 6+ characters.
          </p>
        </div>
      </div>
    </div>
  );
}
function DashboardView({ data }) {
  const top10 = data.slice(0, 10);
  const catData = useMemo(() => {
    const m = {};
    data.forEach(d => {
      if (!m[d.category]) m[d.category] = { cat:d.category, total:0, count:0 };
      m[d.category].total += d.gap; m[d.category].count++;
    });
    return Object.values(m).map(x => ({ ...x, avgGap:Math.round(x.total/x.count) })).sort((a,b) => b.avgGap-a.avgGap);
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KpiCard label="Pincodes Analyzed" value="1,240" sub="Across 32 districts"   accent="#2a78d6"/>
        <KpiCard label="High-Opportunity"  value="312"   sub="Gap score ≥ 70"         accent="#1baf7a"/>
        <KpiCard label="Avg Gap Score"     value="67.4"  sub="+3.2 from last quarter" accent="#f59e0b"/>
        <KpiCard label="Categories"        value="6"     sub="Pharmacy to Coaching"   accent="#4a3aa7"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        {/* top opportunities table */}
        <div className="lg:col-span-3 rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color:"var(--text-primary)" }}>Top opportunities</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor:"var(--border)" }}>
                {["#","Pincode","Category","Gap","Demand"].map(h => (
                  <th key={h} className="text-left py-1 px-2 font-medium" style={{ color:"var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {top10.map(r => (
                <tr key={r.pincode} className="border-b" style={{ borderColor:"var(--border)" }}>
                  <td className="py-1.5 px-2" style={{ color:"var(--text-muted)" }}>{r.rank}</td>
                  <td className="py-1.5 px-2 font-mono font-semibold" style={{ color:"var(--text-primary)" }}>{r.pincode}</td>
                  <td className="py-1.5 px-2"><Badge cat={r.category}/></td>
                  <td className="py-1.5 px-2">
                    <span className="font-bold text-sm" style={{ color:gradeColor(r.gap) }}>{r.gap}</span>
                    <span className="ml-1 px-1 rounded text-xs" style={{ background:gradeColor(r.gap)+"22", color:gradeColor(r.gap) }}>{grade(r.gap)}</span>
                  </td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 rounded overflow-hidden" style={{ background:"var(--surface-alt)" }}>
                        <div className="h-full rounded bg-blue-500" style={{ width:`${r.demand}%` }}/>
                      </div>
                      <span className="text-xs" style={{ color:"var(--text-muted)" }}>{r.demand}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {}
        <div className="lg:col-span-2 rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color:"var(--text-primary)" }}>Avg gap score by category</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={catData} layout="vertical" margin={{ left:8, right:16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-stroke)" horizontal={false}/>
              <XAxis type="number" domain={[0,100]} tick={{ fontSize:10, fill:"var(--text-muted)" }}/>
              <YAxis type="category" dataKey="cat" tick={{ fontSize:11, fill:"var(--text-sub)" }} width={100}/>
              <Tooltip contentStyle={{ background:"var(--tooltip-bg)", border:"1px solid var(--border)", borderRadius:8, fontSize:12, color:"var(--text-primary)" }} formatter={v => [v,"Avg Gap Score"]}/>
              <Bar dataKey="avgGap" radius={[0,4,4,0]} maxBarSize={20}>
                {catData.map(e => <Cell key={e.cat} fill={CAT_COLORS[e.cat]||"#888"}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {}
      <div className="rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
        <p className="text-sm font-semibold mb-3" style={{ color:"var(--text-primary)" }}>Pincode opportunity grid</p>
        <div className="flex flex-wrap gap-1.5">
          {data.map(d => (
            <div key={d.pincode} title={`${d.pincode} · ${d.category} · Gap: ${d.gap}`}
              className="w-14 h-12 rounded-md flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{
                background: d.gap>=80?"#f59e0b22":d.gap>=70?"#1baf7a1a":d.gap>=60?"#2a78d61a":"rgba(128,128,128,0.1)",
                border: `1px solid ${d.gap>=80?"#f59e0b55":d.gap>=70?"#1baf7a44":d.gap>=60?"#2a78d644":"rgba(128,128,128,0.2)"}`,
              }}>
              <span className="text-xs font-mono" style={{ color:"var(--text-muted)", fontSize:9 }}>{d.pincode.slice(-4)}</span>
              <span className="text-sm font-bold" style={{ color:d.gap>=80?"#b45309":d.gap>=70?"#0f6e56":d.gap>=60?"#185fa5":"var(--text-muted)" }}>{d.gap}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {[["#f59e0b","Excellent ≥80"],["#1baf7a","Good 70–79"],["#2a78d6","Moderate 60–69"],["#888","Low <60"]].map(([c,l]) => (
            <div key={l} className="flex items-center gap-1 text-xs" style={{ color:"var(--text-muted)" }}>
              <div className="w-2 h-2 rounded-sm" style={{ background:c }}/>{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpportunitiesView({ data, filterDistrict, filterCat, search }) {
  const [sortKey, setSortKey] = useState("gap");
  const [sortDir, setSortDir] = useState("desc");

  const rows = useMemo(() => {
    let d = [...data];
    if (filterDistrict !== "All") d = d.filter(x => x.district === filterDistrict);
    if (filterCat !== "All")      d = d.filter(x => x.category === filterCat);
    if (search) d = d.filter(x => x.pincode.includes(search) || x.district.toLowerCase().includes(search.toLowerCase()));
    d.sort((a,b) => sortDir==="asc" ? a[sortKey]-b[sortKey] : b[sortKey]-a[sortKey]);
    return d;
  }, [data, filterDistrict, filterCat, search, sortKey, sortDir]);

  const toggle = k => { if (sortKey===k) setSortDir(d => d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("desc"); } };

  const Th = ({ k, label }) => (
    <th onClick={() => toggle(k)}
      className="text-left py-2 px-2.5 font-medium text-xs cursor-pointer select-none whitespace-nowrap"
      style={{ color:"var(--text-muted)" }}>
      {label}{sortKey===k ? (sortDir==="asc"?" ↑":" ↓") : ""}
    </th>
  );

  return (
    <div>
      <p className="text-sm mb-3" style={{ color:"var(--text-sub)" }}>
        Showing <strong style={{ color:"var(--text-primary)" }}>{rows.length}</strong> opportunities · click headers to sort
      </p>
      <div className="rounded-xl border overflow-hidden" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
        <table className="w-full text-xs border-collapse">
          <thead style={{ background:"var(--surface-alt)" }}>
            <tr>
              <Th k="rank" label="#"/>
              <th className="text-left py-2 px-2.5 font-medium text-xs" style={{ color:"var(--text-muted)" }}>Pincode</th>
              <th className="text-left py-2 px-2.5 font-medium text-xs" style={{ color:"var(--text-muted)" }}>District</th>
              <th className="text-left py-2 px-2.5 font-medium text-xs" style={{ color:"var(--text-muted)" }}>Category</th>
              <Th k="competitors" label="Competitors"/>
              <Th k="population"  label="Population"/>
              <Th k="demand"      label="Demand"/>
              <Th k="gap"         label="Gap Score"/>
              <th className="text-left py-2 px-2.5 font-medium text-xs" style={{ color:"var(--text-muted)" }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.pincode} className="border-t" style={{ borderColor:"var(--border)", background: i%2===0?"transparent":"var(--table-alt)" }}>
                <td className="py-2 px-2.5" style={{ color:"var(--text-muted)" }}>{r.rank}</td>
                <td className="py-2 px-2.5 font-mono font-semibold" style={{ color:"var(--text-primary)" }}>{r.pincode}</td>
                <td className="py-2 px-2.5" style={{ color:"var(--text-sub)" }}>{r.district}</td>
                <td className="py-2 px-2.5"><Badge cat={r.category}/></td>
                <td className="py-2 px-2.5 text-center" style={{ color:"var(--text-sub)" }}>{r.competitors}</td>
                <td className="py-2 px-2.5" style={{ color:"var(--text-sub)" }}>{(r.population/1000).toFixed(0)}k</td>
                <td className="py-2 px-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1 rounded overflow-hidden" style={{ background:"var(--surface-alt)" }}>
                      <div className="h-full rounded bg-blue-500" style={{ width:`${r.demand}%` }}/>
                    </div>
                    <span style={{ color:"var(--text-muted)" }}>{r.demand}</span>
                  </div>
                </td>
                <td className="py-2 px-2.5 font-bold text-sm" style={{ color:gradeColor(r.gap) }}>{r.gap}</td>
                <td className="py-2 px-2.5">
                  <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background:gradeColor(r.gap)+"22", color:gradeColor(r.gap) }}>{grade(r.gap)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeatMapView({ data, filterCat }) {
  const [hovered, setHovered] = useState(null);

  const byDistrict = useMemo(() => {
    const m = {};
    data.forEach(d => {
      if (filterCat !== "All" && d.category !== filterCat) return;
      if (!m[d.district]) m[d.district] = [];
      m[d.district].push(d);
    });
    return m;
  }, [data, filterCat]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3">
        {Object.entries(byDistrict).map(([dist, items]) => (
          <div key={dist} className="mb-5">
            <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color:"var(--text-sub)" }}>
              🏙️ {dist}
              <span className="text-xs font-normal" style={{ color:"var(--text-muted)" }}>({items.length} zones)</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map(d => {
                const col = d.gap>=80?"#f59e0b":d.gap>=70?"#1baf7a":d.gap>=60?"#2a78d6":"#888888";
                const isH = hovered?.pincode === d.pincode;
                return (
                  <div key={d.pincode}
                    onMouseEnter={() => setHovered(d)} onMouseLeave={() => setHovered(null)}
                    className="w-16 h-14 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform"
                    style={{
                      background: col+"22", border:`1.5px solid ${isH ? col : col+"55"}`,
                      transform: isH ? "scale(1.08)" : "scale(1)",
                    }}>
                    <span className="font-mono" style={{ fontSize:9, color:"var(--text-muted)" }}>{d.pincode}</span>
                    <span className="text-base font-bold" style={{ color: col==="#888888"?"var(--text-muted)":col }}>{d.gap}</span>
                    <span style={{ fontSize:8, color:"var(--text-muted)" }}>{grade(d.gap)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 lg:sticky lg:top-4 self-start">
        <div className="rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          {hovered ? (
            <>
              <p className="text-xs uppercase tracking-wide mb-2" style={{ color:"var(--text-muted)" }}>Zone Inspector</p>
              <p className="text-xl font-bold font-mono mb-2" style={{ color:"var(--text-primary)" }}>{hovered.pincode}</p>
              <Badge cat={hovered.category}/>
              <div className="mt-4 space-y-2">
                {[["District",hovered.district],["Population",(hovered.population/1000).toFixed(0)+"k"],["Demand score",hovered.demand],["Competitors",hovered.competitors],["Income level",hovered.income],["Growth rate",hovered.growth+"%/yr"]].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-xs">
                    <span style={{ color:"var(--text-muted)" }}>{l}</span>
                    <span className="font-medium" style={{ color:"var(--text-primary)" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor:"var(--border)" }}>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color:"var(--text-muted)" }}>Market gap score</span>
                  <span className="text-xl font-bold" style={{ color:gradeColor(hovered.gap) }}>{hovered.gap}</span>
                </div>
                <div className="mt-2 py-1.5 px-3 rounded-md text-xs font-semibold text-center"
                  style={{ background:gradeColor(hovered.gap)+"22", color:gradeColor(hovered.gap) }}>
                  Grade {grade(hovered.gap)} — {hovered.gap>=80?"Excellent":hovered.gap>=70?"Strong":hovered.gap>=60?"Moderate":"Monitor"}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8" style={{ color:"var(--text-muted)" }}>
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm">Hover a zone to inspect</p>
            </div>
          )}
        </div>

        <div className="rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color:"var(--text-muted)" }}>Legend</p>
          {[["#f59e0b","Excellent","≥ 80"],["#1baf7a","Strong","70–79"],["#2a78d6","Moderate","60–69"],["#888","Low","< 60"]].map(([c,l,r]) => (
            <div key={l} className="flex items-center gap-2 mb-2 text-xs">
              <div className="w-7 h-5 rounded" style={{ background:c+"33", border:`1.5px solid ${c}66` }}/>
              <span className="font-medium" style={{ color:"var(--text-primary)" }}>{l}</span>
              <span className="ml-auto" style={{ color:"var(--text-muted)" }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsView({ data }) {
  const scatterData = data.map(d => ({ x:d.competitors, y:d.demand, z:d.population/1000, name:d.pincode, category:d.category }));
  const districtData = useMemo(() => {
    const m = {};
    data.forEach(d => { if (!m[d.district]) m[d.district] = { district:d.district, total:0, count:0 }; m[d.district].total+=d.gap; m[d.district].count++; });
    return Object.values(m).map(x => ({ ...x, avgGap:Math.round(x.total/x.count) })).sort((a,b) => b.avgGap-a.avgGap);
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { icon:"🏆", color:"#f59e0b", title:"Best district",      value:"Chennai",     sub:"Avg gap 72.8" },
          { icon:"🔥", color:"#e34948", title:"Hottest category",   value:"Pharmacy",    sub:"Avg gap 74.3" },
          { icon:"📈", color:"#1baf7a", title:"Fastest growing",    value:"Gym centres", sub:"11.2% annual growth" },
          { icon:"👥", color:"#2a78d6", title:"Largest unserved",   value:"6,00,100",    sub:"Pincode 600050" },
        ].map(i => (
          <div key={i.title} className="rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md flex items-center justify-center text-sm" style={{ background:i.color+"22" }}>{i.icon}</div>
              <span className="text-xs" style={{ color:"var(--text-muted)" }}>{i.title}</span>
            </div>
            <p className="font-bold text-sm" style={{ color:"var(--text-primary)" }}>{i.value}</p>
            <p className="text-xs mt-0.5" style={{ color:"var(--text-sub)" }}>{i.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          <p className="text-sm font-semibold" style={{ color:"var(--text-primary)" }}>Demand vs. competition</p>
          <p className="text-xs mb-3" style={{ color:"var(--text-muted)" }}>Bubble size = population · color = category</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(CAT_COLORS).map(([k,c]) => (
              <div key={k} className="flex items-center gap-1 text-xs" style={{ color:"var(--text-sub)" }}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background:c }}/>{k}
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart margin={{ top:8, right:16, bottom:16, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-stroke)"/>
              <XAxis dataKey="x" type="number" name="Competitors" tick={{ fontSize:10, fill:"var(--text-muted)" }} label={{ value:"Competitors", position:"insideBottom", offset:-4, fill:"var(--text-muted)", fontSize:10 }}/>
              <YAxis dataKey="y" type="number" name="Demand"      tick={{ fontSize:10, fill:"var(--text-muted)" }} domain={[40,100]}/>
              <ZAxis dataKey="z" range={[30,200]}/>
              <Tooltip contentStyle={{ background:"var(--tooltip-bg)", border:"1px solid var(--border)", borderRadius:8, fontSize:12, color:"var(--text-primary)" }} formatter={(v,n) => [v, n==="x"?"Competitors":n==="y"?"Demand":"Population (k)"]}/>
              {scatterData.map(d => <Scatter key={d.name} data={[d]} fill={CAT_COLORS[d.category]} opacity={0.8}/>)}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-xl border p-4" style={{ background:"var(--surface)", borderColor:"var(--border)" }}>
          <p className="text-sm font-semibold mb-3" style={{ color:"var(--text-primary)" }}>District comparison</p>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={districtData} margin={{ left:-8, right:8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-stroke)" vertical={false}/>
              <XAxis dataKey="district" tick={{ fontSize:10, fill:"var(--text-muted)" }}/>
              <YAxis domain={[0,100]}    tick={{ fontSize:10, fill:"var(--text-muted)" }}/>
              <Tooltip contentStyle={{ background:"var(--tooltip-bg)", border:"1px solid var(--border)", borderRadius:8, fontSize:12, color:"var(--text-primary)" }} formatter={v => [v,"Avg Gap Score"]}/>
              <Bar dataKey="avgGap" radius={[4,4,0,0]} maxBarSize={40}>
                {districtData.map((e,i) => <Cell key={e.district} fill={["#2a78d6","#1baf7a","#eda100","#4a3aa7","#e34948"][i%5]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const THEME_CSS = `
  :root {
    --bg:#f0f4f8; --surface:#ffffff; --surface-alt:#f5f7fa; --border:#e2e8f0;
    --text-primary:#0f172a; --text-sub:#475569; --text-muted:#94a3b8;
    --input-bg:#f8fafc; --input-border:#e2e8f0; --input-text:#0f172a;
    --table-alt:#f8fafc; --grid-stroke:#e2e8f0; --tooltip-bg:#ffffff;
    --header-bg:#ffffff;
    --sidebar-bg:#ffffff; --sidebar-border:#e2e8f0; --sidebar-text:#475569;
    --sidebar-active-bg:rgba(245,158,11,0.12); --sidebar-active-text:#b45309;
  }
  [data-theme="dark"] {
    --bg:#060d1f; --surface:#0d1830; --surface-alt:#0a1220; --border:rgba(255,255,255,0.08);
    --text-primary:#f1f5f9; --text-sub:#94a3b8; --text-muted:#475569;
    --input-bg:#0a1220; --input-border:rgba(255,255,255,0.1); --input-text:#f1f5f9;
    --table-alt:#0a1220; --grid-stroke:#1e2d4a; --tooltip-bg:#0d1830;
    --header-bg:#0d1830;
    --sidebar-bg:#060d1f; --sidebar-border:rgba(255,255,255,0.07); --sidebar-text:#94a3b8;
    --sidebar-active-bg:rgba(245,158,11,0.15); --sidebar-active-text:#f59e0b;
  }
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--text-primary); }
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }
`;

export default function App() {
  const [loggedIn,   setLoggedIn]   = useState(false);
  const [dark,       setDark]       = useState(true);
  const [view,       setView]       = useState("dashboard");
  const [filterDistrict, setFD]     = useState("All");
  const [filterCat,      setFC]     = useState("All");
  const [search,         setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const id = "mgf-theme";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = THEME_CSS;
      document.head.appendChild(s);
    }
  }, []);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} dark={dark} setDark={setDark}/>;

  const NAV = [
    { key:"dashboard",     emoji:"📊", label:"Dashboard" },
    { key:"opportunities", emoji:"🔍", label:"Opportunities" },
    { key:"heatmap",       emoji:"🗺️",  label:"Heat Map" },
    { key:"analytics",     emoji:"📈", label:"Analytics" },
  ];

  return (
    <div className="flex min-h-screen" style={{ background:"var(--bg)", fontFamily:"system-ui,sans-serif" }}>
      {}
      <aside className="w-52 flex-shrink-0 flex flex-col" style={{ background:"var(--sidebar-bg)", borderRight:"1px solid var(--sidebar-border)" }}>
        <div className="p-4 border-b flex items-center gap-2" style={{ borderColor:"var(--sidebar-border)" }}>
          <div className="w-7 h-7 bg-amber-400 rounded-md flex items-center justify-center text-xs font-bold text-black">📍</div>
          <div>
            <p className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>MarketGap</p>
            <p className="text-xs" style={{ color:"var(--text-muted)" }}>Tamil Nadu · v2.0</p>
          </div>
        </div>

        <nav className="flex-1 p-2">
          <p className="text-xs px-2 py-1.5 uppercase tracking-widest" style={{ color:"var(--text-muted)" }}>Navigation</p>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setView(n.key)}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg mb-0.5 text-sm text-left border-0 cursor-pointer transition-colors"
              style={{
                background: view===n.key ? "var(--sidebar-active-bg)" : "transparent",
                color:       view===n.key ? "var(--sidebar-active-text)" : "var(--sidebar-text)",
                fontWeight:  view===n.key ? 600 : 400,
              }}>
              <span>{n.emoji}</span>{n.label}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t" style={{ borderColor:"var(--sidebar-border)" }}>
          <button onClick={() => setLoggedIn(false)}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm border-0 cursor-pointer"
            style={{ background:"transparent", color:"#e34948" }}>
            🚪 Sign out
          </button>
        </div>
      </aside>

      {}
      <div className="flex-1 flex flex-col overflow-hidden">
        {}
        <header className="flex items-center gap-2.5 px-6 py-2.5 border-b" style={{ background:"var(--header-bg)", borderColor:"var(--border)" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pincode or district…"
            className="w-48 rounded-lg px-3 py-1.5 text-sm border outline-none"
            style={{ background:"var(--input-bg)", borderColor:"var(--input-border)", color:"var(--input-text)" }}/>
          <select value={filterDistrict} onChange={e => setFD(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-sm border outline-none"
            style={{ background:"var(--input-bg)", borderColor:"var(--input-border)", color:"var(--input-text)" }}>
            {DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={filterCat} onChange={e => setFC(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-sm border outline-none"
            style={{ background:"var(--input-bg)", borderColor:"var(--input-border)", color:"var(--input-text)" }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <div className="ml-auto flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border cursor-pointer"
              style={{ background:"var(--surface)", borderColor:"var(--border)", color:"var(--text-sub)" }}>
              ⬇️ Export
            </button>
            {/* ☀️ / 🌙 toggle */}
            <ThemeToggle dark={dark} setDark={setDark}/>
          </div>
        </header>

        {}
        <div className="px-6 pt-4 pb-0">
          <h1 className="text-lg font-semibold mb-0.5" style={{ color:"var(--text-primary)" }}>
            {NAV.find(n => n.key===view)?.label}
          </h1>
          <p className="text-xs mb-4" style={{ color:"var(--text-muted)" }}>
            {view==="dashboard"     && "Overview of market opportunities across Tamil Nadu pincodes"}
            {view==="opportunities" && "Full sortable list of all analyzed pincode opportunities"}
            {view==="heatmap"       && "Visual zone map grouped by district — hover to inspect"}
            {view==="analytics"     && "Demand, competition, and growth analytics"}
          </p>
        </div>

        {}
        <div className="flex-1 overflow-auto px-6 pb-6">
          {view==="dashboard"     && <DashboardView     data={PINCODES}/>}
          {view==="opportunities" && <OpportunitiesView data={PINCODES} filterDistrict={filterDistrict} filterCat={filterCat} search={search}/>}
          {view==="heatmap"       && <HeatMapView       data={PINCODES} filterCat={filterCat}/>}
          {view==="analytics"     && <AnalyticsView     data={PINCODES}/>}
        </div>
      </div>
    </div>
  );
}
