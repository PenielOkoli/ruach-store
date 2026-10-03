import CheckoutForm from '@/components/CheckoutForm';
import { bundleOffers, formatNaira } from '@/lib/bundles';
import Image from 'next/image';

const capacities = [
  { size: '1L', title: 'Everyday staple', copy: 'For lunches, snacks, chopped ingredients, and everyday leftovers.', image: '/1l-capacity.png', alt: '1 litre glass food storage container' },
  { size: '2L', title: 'Family ready', copy: 'For meal prep, larger portions, and fridge-ready family meals.', image: '/2l-capacity.png', alt: '2 litre glass food storage container size guide' },
  { size: '2.5L', title: 'Made for more', copy: 'For batch cooking, big soups, protein, and bulk storage.', image: '/2-5l-capacity.png', alt: '2.5 litre glass food storage container' },
  { size: '12 PCS', title: 'Classic complete set', copy: 'Four square, four round, and four rectangular containers for every meal.', image: '/12-piece-set.jpg', alt: 'Original 12-piece glass food storage container set' },
];

const promises = [
  ['Four-side locking lids', 'Snap the lid down on every side for a secure, confidence-inspiring seal.'],
  ['Borosilicate glass', 'Clear, durable glass that does not hold on to stains or food smells.'],
  ['Airtight for freshness', 'A silicone sealing ring helps keep food fresh and spills contained.'],
  ['Kitchen-ready convenience', 'Designed for freezer, microwave, and dishwasher use.'],
  ['BPA-free, food-safe materials', 'Store everyday meals with confidence in materials made for food storage.'],
  ['No lingering odours', 'The non-porous glass surface helps prevent strong food smells from sticking around.'],
  ['No plastic container body', 'Your food is stored in clear glass instead of a plastic storage bowl.'],
  ['Easy to clean completely', 'The smooth glass surface washes clean, helping you keep every container fresh for its next use.'],
];

function CheckIcon() {
  return <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" strokeWidth="1.8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m8 12 2.5 2.5L16 9" /></svg>;
}

export default function StorageCollectionPage() {
  return (
    <div className="storefront collection-storefront">
      <header className="site-header"><div className="shell header-inner"><a className="logo" href="#top">Ruach <span>Store</span></a><nav className="site-nav" aria-label="Main navigation"><a href="#collection">Bundles</a><a href="#sizes">Sizes</a><a href="#why-glass">Why glass</a></nav><a className="header-cta" href="#order">Shop bundles <span aria-hidden="true">→</span></a></div></header>
      <main id="top">
        <section className="collection-hero shell">
          <div className="collection-hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> New larger sizes are here</p><h1>Big-batch storage, <em>made beautiful.</em></h1><p className="hero-lede">Meet the glass containers your kitchen has been waiting for: 1L, 2L, and a generous 2.5L. Choose the bundle that fits the way your family cooks.</p><div className="hero-price"><span>Sets from</span><strong>{formatNaira(85000)}</strong><small>Save up to {formatNaira(50000)}</small></div><div className="hero-actions"><a className="primary-button" href="#collection">See all bundles <span aria-hidden="true">↓</span></a><a className="text-link" href="#sizes">Compare sizes</a></div><div className="trust-row"><span>✓ Pay on delivery</span><span>✓ Free nationwide delivery</span><span>✓ Airtight locking lids</span></div></div>
          <div className="collection-hero-visual"><Image src="/glass-set-hero.jpg" alt="Stacked glass food storage containers with airtight locking lids" fill priority sizes="(max-width: 700px) 100vw, 55vw" /><div className="hero-sticker"><strong>1L · 2L · 2.5L</strong><span>NEW CAPACITIES</span></div><div className="hero-note">Choose from<br /><b>3 to 8 pieces</b></div></div>
        </section>

        <section id="sizes" className="capacity-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Every option, clearly shown</p><h2>Find your <em>everyday fit.</em></h2></div><p>Choose an individual capacity for larger meals or the original 12-piece set for a complete mix of shapes and sizes.</p></div><div className="capacity-grid">{capacities.map((capacity) => <article className="capacity-card" key={capacity.size}><div className="capacity-image"><Image src={capacity.image} alt={capacity.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="capacity-card-copy"><span>{capacity.size}</span><h3>{capacity.title}</h3><p>{capacity.copy}</p></div></article>)}</div></div></section>

        <section id="collection" className="bundle-section"><div className="shell"><div className="bundle-heading"><p className="eyebrow">Pick your perfect glass set</p><h2>Every set. <em>Exactly explained.</em></h2><p>Choose our original 12-piece classic set or one of the new large-capacity bundles. See every piece, total storage capacity, and saving before you order.</p></div><div className="bundle-grid">{bundleOffers.map((offer, index) => <article className={`bundle-card bundle-card-${index + 1}`} key={offer.name}>{offer.badge && <span className="bundle-badge">{offer.badge}</span>}<div className="bundle-card-top"><span className="bundle-piece-count">{offer.pieces} pieces</span><h3>{offer.name}</h3><p>{offer.description}</p></div><div className="bundle-contents"><span>INCLUDES</span><strong>{offer.contents}</strong>{offer.totalCapacity && <b className="bundle-capacity">{offer.totalCapacity}</b>}</div><div className="bundle-price-row"><div><span>NOW</span><strong>{formatNaira(offer.price)}</strong></div><div><span>WAS</span><s>{formatNaira(offer.was)}</s></div></div><a href={`?set=${encodeURIComponent(offer.name)}#order`} className="bundle-button">Choose this set <span aria-hidden="true">→</span></a></article>)}</div></div></section>

        <section id="why-glass" className="feature-band"><div className="shell"><div className="section-intro"><p className="eyebrow">Built for everyday use</p><h2>More than a bowl. <em>A better way to store.</em></h2><p>Practical storage features meet food-friendly glass, so every meal stays visible, organized, and ready for the next use.</p></div><div className="feature-grid collection-feature-grid">{promises.map(([title, description]) => <article className="feature-card" key={title}><div className="feature-icon"><CheckIcon /></div><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>

        <section className="story-section shell"><div className="story-image"><Image src="/glass-set-lifestyle.jpg" alt="Food stored in glass containers in a bright kitchen" fill sizes="(max-width: 700px) 100vw, 55vw" /></div><div className="story-copy"><p className="eyebrow">Make room for what matters</p><h2>Prep once.<br /><em>Store smarter.</em></h2><p>The larger 2L and 2.5L options are made for the meals you cook in real quantities, while the 1L size keeps everyday ingredients and leftovers close at hand.</p><div className="story-stat"><strong>1L · 2L · 2.5L</strong><span>Three capacities that work better together.</span></div></div></section>

        <section className="product-video-section product-video-secondary"><div className="shell"><div className="section-intro centered"><p className="eyebrow">A closer look</p><h2>Lock in freshness. <em>Clear the clutter.</em></h2><p>Watch how the containers stack into a calmer, more organized kitchen.</p></div><video className="product-video" controls playsInline preload="metadata"><source src="/glass-storage-video-2.mp4" type="video/mp4" />Your browser does not support the video element.</video></div></section>

        <section id="order" className="order-section"><div className="shell"><div className="order-heading"><p className="eyebrow">Order your storage set today</p><h2>Your kitchen upgrade<br /><em>starts here.</em></h2><p>Select a bundle below. You pay only when it arrives, and we&apos;ll call to confirm your delivery details.</p></div><div className="order-card"><CheckoutForm /></div></div></section>
      </main>
      <footer><div className="shell footer-inner"><a className="logo" href="#top">Ruach <span>Store</span></a><p>© 2026 Ruach Store Ltd · Pay on delivery across Nigeria</p></div></footer>
    </div>
  );
}
