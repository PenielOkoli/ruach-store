import Script from 'next/script';
import CheckoutForm from '@/components/CheckoutForm';

const features = [
  ['Cordless and rechargeable', 'Wash without dragging a cable across the compound. The included batteries keep you moving.'],
  ['Pulls water from a bucket', 'Use it where there is no outdoor tap. The inlet hose draws water from a bucket or drum.'],
  ['Adjustable spray nozzle', 'Switch from a wide rinse to a concentrated blast for wheels, corners, and stubborn dirt.'],
  ['Two batteries included', 'Swap in the second battery when the first needs a recharge and finish the job without waiting.'],
  ['Foam bottle attachment', 'Add soap for a thicker wash on cars, motorcycles, outdoor furniture, and more.'],
  ['Complete wash kit', 'Hose, filter, charger, extra nozzles, and storage case are included in the box.'],
];

const boxItems = ['Pressure washer gun', '2 rechargeable batteries', 'Battery charger', 'Water hose and inlet filter', 'Nozzle set', 'Foam bottle attachment', 'Tap connector', 'Storage case'];
const specs = [
  ['Rated power', '320W'],
  ['Peak pressure', '30-31 Bar / approx. 435-450 PSI'],
  ['Water flow rate', '240 L/h / approx. 3.5 L/min'],
  ['Battery configuration', '128V / 6.0Ah lithium-ion, dual-battery kit'],
  ['Runtime', 'Approximately 45-60 minutes'],
  ['Charging time', 'Around 3 hours with overcharge protection'],
  ['Suction lift', 'Pulls water from over 5 metres'],
];

function CheckIcon() {
  return <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" strokeWidth="1.8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m8 12 2.5 2.5L16 9" /></svg>;
}

export default function PressurePage() {
  return (
    <div className="storefront">
      <header className="site-header"><div className="shell header-inner"><a className="logo" href="#top">ruach <span>/ store</span></a><nav className="site-nav" aria-label="Main navigation"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#order">Order now</a></nav><a className="header-cta" href="#order">Get yours <span aria-hidden="true">↗</span></a></div></header>
      <main id="top">
        <section className="hero shell"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Cordless cleaning power</p><h1>Wash anywhere.<br /><em>Work smarter.</em></h1><p className="hero-lede">A powerful cordless pressure washer for clean cars, patios, generators, and outdoor spaces, even when a tap or socket is nowhere nearby.</p><div className="price-row"><span className="price">₦73,000</span><span className="old-price">₦95,000</span><span className="save-badge">Save ₦22,000</span></div><a className="primary-button" href="#order">Order yours today <span aria-hidden="true">→</span></a><div className="trust-row"><span>✓ Pay on delivery</span><span>✓ Nationwide delivery</span><span>✓ 2 batteries included</span></div></div><div className="hero-product"><div className="burst">128V<br /><small>WIRELESS</small></div><img src="/pressure-washer-kit.webp" alt="Cordless pressure washer with batteries and accessories" /></div></section>
        <section id="features" className="feature-band"><div className="shell"><div className="section-intro"><p className="eyebrow">Built for real life</p><h2>Everything you need to clean <em>without limits.</em></h2><p>No hose reel. No extension cable. Just fill, click in a battery, and get to work.</p></div><div className="feature-grid">{features.map(([title, description]) => <article className="feature-card" key={title}><div className="feature-icon"><CheckIcon /></div><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>
        <section className="specs-section shell"><div className="section-intro"><p className="eyebrow">Technical details</p><h2>Power you can<br /><em>measure.</em></h2><p>Merchant listings commonly describe this model as a Hitachi 128V cordless pressure washer. The 128V label is a marketplace/model-line designation, rather than a standard commercial lithium-ion operating voltage.</p></div><div className="specs-table">{specs.map(([label, value]) => <div className="spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
        <section id="how-it-works" className="how-section shell"><div className="section-intro centered"><p className="eyebrow">Simple from the first spray</p><h2>From bucket to spotless<br /><em>in three steps.</em></h2></div><div className="steps-grid"><article><span>01</span><h3>Fill your source</h3><p>Fill a bucket or connect the hose to a tap. The washer can draw water either way.</p></article><article><span>02</span><h3>Power on and aim</h3><p>Squeeze the trigger and twist the nozzle for a wide rinse or a focused blast.</p></article><article><span>03</span><h3>Keep moving</h3><p>Swap in the second battery whenever you need it and finish the job without a long pause.</p></article></div><div className="diagram-wrap"><img src="/pressure-washer-2.webp" alt="Pressure washer parts labelled nozzle, trigger, inlet, and battery" /><div><p className="eyebrow">A closer look</p><h3>Small enough to carry.<br />Strong enough to count on.</h3><p>The compact gun body gives you control in tight spaces, while the interchangeable attachments handle the rest.</p></div></div></section>
        <section className="video-feature video-feature-dark"><div className="shell video-feature-inner"><div className="video-feature-copy"><p className="eyebrow">See it in action</p><h2>Clean power,<br /><em>in motion.</em></h2><p>See how the cordless washer handles real cleaning jobs without a tap or power socket nearby.</p></div><div className="video-card"><blockquote className="tiktok-embed" cite="https://www.tiktok.com/@gillydinho/video/7603878534393728276" data-video-id="7603878534393728276"><section /></blockquote><a href="https://www.tiktok.com/@gillydinho/video/7603878534393728276" target="_blank" rel="noopener noreferrer">Watch on TikTok ↗</a></div></div><Script async src="https://www.tiktok.com/embed.js" strategy="afterInteractive" /></section>
        <section className="box-section shell"><div className="box-image"><img src="/pressure-washer-kit.png" alt="Cordless pressure washer gun with two batteries, charger, hose, and accessories" /></div><div className="box-copy"><p className="eyebrow">Open the case and go</p><h2>What&apos;s in<br /><em>the box.</em></h2><p>Everything is packed together in one grab-and-go kit, ready for the next wash.</p><ul>{boxItems.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul></div></section>
        <section className="video-feature video-feature-light"><div className="shell video-feature-inner"><div className="video-feature-copy"><p className="eyebrow">One more look</p><h2>Every piece<br /><em>has a place.</em></h2><p>Watch the kit being connected and see how quickly it goes from case to ready-to-wash.</p></div><div className="video-card"><blockquote className="tiktok-embed" cite="https://www.tiktok.com/@aqua.junnior/video/7401962420748569861" data-video-id="7401962420748569861"><section /></blockquote><a href="https://www.tiktok.com/@aqua.junnior/video/7401962420748569861" target="_blank" rel="noopener noreferrer">Watch on TikTok ↗</a></div></div></section>
        <section id="order" className="order-section"><div className="shell"><div className="order-heading"><p className="eyebrow">Bring home the clean</p><h2>Order your cordless<br /><em>pressure washer.</em></h2><p>Pay only when it arrives. We&apos;ll call to confirm your delivery details.</p></div><div className="order-card"><CheckoutForm /></div></div></section>
      </main>
      <footer><div className="shell footer-inner"><a className="logo" href="#top">ruach <span>/ store</span></a><p>© 2026 Ruach Store · Pay on delivery across Nigeria</p></div></footer>
    </div>
  );
}