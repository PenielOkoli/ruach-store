import { NextResponse } from 'next/server';

const pixelId = '4630814730482514';

function sha256(value: string) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
}

async function hashValue(value: string) {
  const hash = await sha256(value);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderValue = Number(body.value);
    const orderQuantity = Number(body.quantity);
    const eventId = String(body.eventId || crypto.randomUUID());
    const phone = String(body.phone || '').replace(/\D/g, '');
    const productName = String(body.productName || 'Glass Food Storage Set');

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(body.formData || {})) {
      formData.set(key, String(value));
    }

    const formspreeResponse = await fetch('https://formspree.io/f/xgavvwlg', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json({ success: false, message: 'Failed to submit order' }, { status: 502 });
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    const accessToken = process.env.META_ACCESS_TOKEN;
    if (accessToken && Number.isFinite(orderValue) && Number.isFinite(orderQuantity)) {
      const userData: Record<string, unknown> = {
        client_ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        client_user_agent: request.headers.get('user-agent'),
      };

      if (phone) userData.ph = [await hashValue(phone)];

      await fetch(`https://graph.facebook.com/v24.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: 'website',
            event_source_url: request.headers.get('origin') || request.headers.get('referer'),
            user_data: userData,
            custom_data: {
              currency: 'NGN',
              value: orderValue,
              num_items: orderQuantity,
              content_name: productName,
              content_type: 'product',
            },
          }],
        }),
      });
    }

    return NextResponse.json({ success: true, message: 'Order received' }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: 'Failed to process order' }, { status: 500 });
  }
}
