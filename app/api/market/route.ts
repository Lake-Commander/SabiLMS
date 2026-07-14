// app/api/market/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NGN_MARKET_API_KEY;

  try {
    // 🔀 Fetch the market totals AND the comprehensive stock list simultaneously
    const [snapshotRes, companiesRes] = await Promise.all([
      fetch('https://api.ngnmarket.com/v1/market/snapshot', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        next: { revalidate: 300 }
      }),
      fetch('https://api.ngnmarket.com/v1/companies', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        next: { revalidate: 300 }
      })
    ]);

    const snapshotData = await snapshotRes.json();
    const companiesData = await companiesRes.json();

    return NextResponse.json({
      success: true,
      macro: snapshotData.success ? snapshotData.data : null,
      stocks: companiesData.success ? companiesData.data : []
    });
  } catch (error) {
    console.error("Upstream proxy failure:", error);
    return NextResponse.json({ success: false, error: "Data pipeline failure" }, { status: 502 });
  }
}