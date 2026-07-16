// app/debug-market/page.tsx
export const dynamic = 'force-dynamic';

export default async function DebugMarket() {
  const apiKey = process.env.NGN_MARKET_API_KEY;
  
  let status = 0;
  let rawBody = "No fetch attempted";

  try {
    const res = await fetch('https://api.ngnmarket.com/v1/market/snapshot', {
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json' 
      },
      cache: 'no-store'
    });
    
    status = res.status;
    rawBody = await res.text(); // Get raw text to see if it's returning HTML or JSON
  } catch (error: any) {
    rawBody = error.message;
  }

  return (
    <div className="p-10 font-mono text-sm space-y-4 max-w-3xl bg-white text-black min-h-screen">
      <h1 className="text-xl font-black bg-yellow-300 inline-block px-2 border-2 border-black">
        API PIPELINE DEBUGGER
      </h1>
      
      <div className="p-4 border-2 border-black rounded shadow-[4px_4px_0px_#111111]">
        <strong>API KEY INJECTED:</strong> {apiKey ? `YES (Starts with ${apiKey.substring(0, 12)}...)` : 'NO - Vercel Env Var is Missing!'}
      </div>

      <div className="p-4 border-2 border-black rounded shadow-[4px_4px_0px_#111111]">
        <strong>HTTP STATUS:</strong> {status} {status === 401 && "(Unauthorized - Check Key)"} {status === 404 && "(Endpoint does not exist)"}
      </div>

      <div className="p-4 border-2 border-black rounded shadow-[4px_4px_0px_#111111] overflow-auto">
        <strong>RAW RESPONSE PAYLOAD:</strong>
        <pre className="mt-2 text-xs bg-gray-100 p-2 border border-black/20">{rawBody}</pre>
      </div>
    </div>
  );
}