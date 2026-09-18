import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Fire a webhook to your n8n automation pipeline
    // The n8n workflow will parse this payload and trigger the automated WhatsApp confirmation
    const webhookUrl = process.env.WEBHOOK_URL; 
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ success: true, message: 'Order received' }, { status: 200 });

  } catch (error) {
     return NextResponse.json({ success: false, message: 'Failed to process order' }, { status: 500 });
  }
}