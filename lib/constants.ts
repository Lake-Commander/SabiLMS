// lib/constants.ts

/**
 * ============================================================================
 * NAVIGATION & APP CONFIGURATION
 * ============================================================================
 */

export const NAV_ITEMS = [
    { href: '/', label: 'Dashboard' },
    { href: '/search', label: 'Search' },
    { href: '/simulator', label: 'Simulator' },
    { href: '/learn', label: 'Courses' },
];

export const SIMULATOR_DEFAULTS = {
    STARTING_BALANCE: 1000000, // ₦1,000,000 default paper money
    CURRENCY_SYMBOL: '₦',
    TRANSACTION_FEE_PERCENT: 0.015, // Standard NGX broker/SEC fee simulation
};

/**
 * ============================================================================
 * FORM & PREFERENCE OPTIONS
 * ============================================================================
 */

export const INVESTMENT_GOALS = [
    { value: 'Growth', label: 'Capital Growth' },
    { value: 'Income', label: 'Dividend Income' },
    { value: 'Balanced', label: 'Balanced Portfolio' },
    { value: 'Conservative', label: 'Capital Preservation' },
];

export const RISK_TOLERANCE_OPTIONS = [
    { value: 'Low', label: 'Low (Bonds/Blue-Chip focus)' },
    { value: 'Medium', label: 'Medium (Mixed Equities)' },
    { value: 'High', label: 'High (Aggressive Growth/Penny Stocks)' },
];

export const PREFERRED_INDUSTRIES = [
    { value: 'Financial Services', label: 'Financial Services & Banking' },
    { value: 'ICT', label: 'Telecommunications & Tech' },
    { value: 'Industrial Goods', label: 'Industrial Goods & Cement' },
    { value: 'Consumer Goods', label: 'Consumer Goods & Food' },
    { value: 'Oil and Gas', label: 'Oil and Gas' },
    { value: 'Agriculture', label: 'Agriculture' },
];

export const ALERT_TYPE_OPTIONS = [
    { value: 'upper', label: 'Upper Target (Take Profit)' },
    { value: 'lower', label: 'Lower Target (Stop Loss)' },
];

export const CONDITION_OPTIONS = [
    { value: 'greater', label: 'Greater than (>)' },
    { value: 'less', label: 'Less than (<)' },
];

export const WATCHLIST_TABLE_HEADER = [
    'Company',
    'Symbol',
    'Price',
    'Change',
    'Market Cap',
    'P/E Ratio',
    'Alert',
    'Action',
];

export const NO_MARKET_NEWS =
    '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">The NGX market feed is currently quiet. Please check back shortly for updates.</p>';

/**
 * ============================================================================
 * TRADINGVIEW WIDGET CONFIGURATIONS (NGX TAILORED)
 * ============================================================================
 */

export const MARKET_OVERVIEW_WIDGET_CONFIG = {
    colorTheme: 'dark',
    dateRange: '12M',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: true,
    showFloatingTooltip: true,
    plotLineColorGrowing: '#0FEDBE',
    plotLineColorFalling: '#FF4D4D',
    gridLineColor: 'rgba(240, 243, 250, 0)',
    scaleFontColor: '#DBDBDB',
    belowLineFillColorGrowing: 'rgba(15, 237, 190, 0.12)',
    belowLineFillColorFalling: 'rgba(255, 77, 77, 0.12)',
    belowLineFillColorGrowingBottom: 'rgba(15, 237, 190, 0)',
    belowLineFillColorFallingBottom: 'rgba(255, 77, 77, 0)',
    symbolActiveColor: 'rgba(15, 237, 190, 0.05)',
    tabs: [
        {
            title: 'Financials',
            symbols: [
                { s: 'NSENG:ZENITHBANK', d: 'Zenith Bank Plc' },
                { s: 'NSENG:GTCO', d: 'Guaranty Trust Holding' },
                { s: 'NSENG:UBA', d: 'United Bank for Africa' },
                { s: 'NSENG:ACCESSCORP', d: 'Access Holdings Plc' },
                { s: 'NSENG:FBNH', d: 'FBN Holdings Plc' },
                { s: 'NSENG:STANBIC', d: 'Stanbic IBTC Holdings' },
            ],
        },
        {
            title: 'ICT & Telecoms',
            symbols: [
                { s: 'NSENG:MTNN', d: 'MTN Nigeria' },
                { s: 'NSENG:AIRTELAFRI', d: 'Airtel Africa Plc' },
                { s: 'NSENG:CWG', d: 'Computer Warehouse Group' },
                { s: 'NSENG:CHAMS', d: 'Chams Holding Company' },
            ],
        },
        {
            title: 'Industrials',
            symbols: [
                { s: 'NSENG:DANGCEM', d: 'Dangote Cement Plc' },
                { s: 'NSENG:BUACEMENT', d: 'BUA Cement Plc' },
                { s: 'NSENG:WAPCO', d: 'Lafarge Africa Plc' },
                { s: 'NSENG:BERGER', d: 'Berger Paints Plc' },
            ],
        },
        {
            title: 'Consumer Goods',
            symbols: [
                { s: 'NSENG:NESTLE', d: 'Nestle Nigeria Plc' },
                { s: 'NSENG:BUAFOODS', d: 'BUA Foods Plc' },
                { s: 'NSENG:NB', d: 'Nigerian Breweries Plc' },
                { s: 'NSENG:DANGSUGAR', d: 'Dangote Sugar Refinery' },
                { s: 'NSENG:FLOURMILL', d: 'Flour Mills Nigeria' },
            ],
        },
    ],
    support_host: 'https://www.tradingview.com',
    backgroundColor: '#141414',
    width: '100%',
    height: 600,
    showSymbolLogo: true,
    showChart: true,
};

export const HEATMAP_WIDGET_CONFIG = {
    exchanges: ['NSENG'], // Explicitly targets the Nigerian Stock Exchange
    dataSource: 'NGX30', // Uses the NGX 30 Index for a clean, reliable heatmap
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    isTransparent: true,
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'dark',
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'market',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'nigeria', // Targets local NGX business news
    width: '100%',
    height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
    title: 'NGX Equities',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'Top Capitalization',
            symbols: [
                { name: 'NSENG:MTNN', displayName: 'MTN Nigeria' },
                { name: 'NSENG:DANGCEM', displayName: 'Dangote Cement' },
                { name: 'NSENG:AIRTELAFRI', displayName: 'Airtel Africa' },
                { name: 'NSENG:BUACEMENT', displayName: 'BUA Cement' },
                { name: 'NSENG:BUAFOODS', displayName: 'BUA Foods' },
            ],
        },
        {
            name: 'Banking Sector',
            symbols: [
                { name: 'NSENG:ZENITHBANK', displayName: 'Zenith Bank' },
                { name: 'NSENG:GTCO', displayName: 'GTCO Holdings' },
                { name: 'NSENG:UBA', displayName: 'United Bank for Africa' },
                { name: 'NSENG:ACCESSCORP', displayName: 'Access Corp' },
                { name: 'NSENG:FBNH', displayName: 'FBN Holdings' },
                { name: 'NSENG:FCMB', displayName: 'FCMB Group' },
            ],
        },
        {
            name: 'Oil, Gas & Energy',
            symbols: [
                { name: 'NSENG:SEPLAT', displayName: 'Seplat Energy' },
                { name: 'NSENG:GEREGU', displayName: 'Geregu Power' },
                { name: 'NSENG:OANDO', displayName: 'Oando Plc' },
                { name: 'NSENG:CONOIL', displayName: 'Conoil Plc' },
                { name: 'NSENG:TOTAL', displayName: 'TotalEnergies' },
                { name: 'NSENG:TRANSCORP', displayName: 'Transcorp Plc' },
            ],
        },
    ],
};

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    width: '100%',
    height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: true,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 1,
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    theme: 'dark',
    timezone: 'Africa/Lagos', // Adjusted to WAT
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 10,
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    theme: 'dark',
    timezone: 'Africa/Lagos',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 400,
    interval: '1h',
    largeChartUrl: '',
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.startsWith('NSENG:') ? symbol : `NSENG:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 464,
    displayMode: 'regular',
    largeChartUrl: '',
});

/**
 * ============================================================================
 * NIGERIAN STOCK EXCHANGE (NGX) TICKER DIRECTORY
 * ============================================================================
 */

export const NGX_STOCK_SYMBOLS = [
    // Premium Board / Mega Cap
    'MTNN',         // MTN Nigeria Communications Plc
    'DANGCEM',      // Dangote Cement Plc
    'AIRTELAFRI',   // Airtel Africa Plc
    'BUACEMENT',    // BUA Cement Plc
    'BUAFOODS',     // BUA Foods Plc
    
    // Tier-1 Banking (FUGAZ +)
    'ZENITHBANK',   // Zenith Bank Plc
    'GTCO',         // Guaranty Trust Holding Company Plc
    'UBA',          // United Bank for Africa Plc
    'ACCESSCORP',   // Access Holdings Plc
    'FBNH',         // FBN Holdings Plc
    'STANBIC',      // Stanbic IBTC Holdings Plc
    'FIDELITYBK',   // Fidelity Bank Plc
    'FCMB',         // FCMB Group Plc
    'STERLINGNG',   // Sterling Financial Holdings
    'WEMABANK',     // Wema Bank Plc
    
    // Consumer Goods
    'NESTLE',       // Nestle Nigeria Plc
    'NB',           // Nigerian Breweries Plc
    'GUINNESS',     // Guinness Nigeria Plc
    'DANGSUGAR',    // Dangote Sugar Refinery Plc
    'FLOURMILL',    // Flour Mills Nigeria Plc
    'NASCON',       // NASCON Allied Industries Plc
    'PZ',           // PZ Cussons Nigeria Plc
    'CADBURY',      // Cadbury Nigeria Plc
    'HONOURFO',     // Honeywell Flour Mill Plc
    'UNILEVER',     // Unilever Nigeria Plc
    'CHAMPION',     // Champion Breweries Plc
    
    // Oil, Gas & Utilities
    'SEPLAT',       // Seplat Energy Plc
    'GEREGU',       // Geregu Power Plc
    'OANDO',        // Oando Plc
    'CONOIL',       // Conoil Plc
    'TOTAL',        // TotalEnergies Marketing Nigeria Plc
    'MRS',          // MRS Oil Nigeria Plc
    'ETERNA',       // Eterna Plc
    
    // Conglomerates
    'TRANSCORP',    // Transnational Corporation Plc
    'UACN',         // UAC of Nigeria Plc
    'JOHNHOLT',     // John Holt Plc
    
    // Industrial Goods & Building Materials
    'WAPCO',        // Lafarge Africa Plc
    'BERGER',       // Berger Paints Plc
    'CAP',          // CAP Plc
    'MEYER',        // Meyer Plc
    'BETAGLAS',     // Beta Glass Plc
    'CUTIX',        // Cutix Plc
    
    // Agriculture
    'OKOMUOIL',     // Okomu Oil Palm Plc
    'PRESCO',       // Presco Plc
    'FTNCOCOA',     // FTN Cocoa Processors Plc
    'ELLAHLAKES',   // Ellah Lakes Plc
    
    // Healthcare & Pharmaceuticals
    'FIDSON',       // Fidelity Healthcare
    'MAYBAKER',     // May & Baker Nigeria Plc
    'NEIMETH',      // Neimeth International Pharmaceuticals
    'GLAXOSMITH',   // GlaxoSmithKline Consumer Nig. Plc
    
    // ICT & Technology
    'CWG',          // Computer Warehouse Group Plc
    'CHAMS',        // Chams Holding Company Plc
    'OMATEK',       // Omatek Ventures Plc
    'TRIPPLEG',     // Tripple Gee and Company Plc
    'COURTVILLE',   // Courteville Business Solutions Plc
    
    // Insurance
    'AIICO',        // AIICO Insurance Plc
    'CUSTODIAN',    // Custodian Investment Plc
    'MANSARD',      // AXA Mansard Insurance Plc
    'MUTUALANI',    // Mutual Benefits Assurance
    'NEM',          // NEM Insurance Plc
    'CORNERST',     // Cornerstone Insurance Plc
    'WAPIC',        // Coronation Insurance Plc
    'LASACO',       // Lasaco Assurance Plc
    
    // Real Estate & Construction
    'UPDC',         // UACN Property Development Company
    'UPL',          // UPDC Real Estate Investment Trust
    'ARBHICO',      // Arbico Plc
];