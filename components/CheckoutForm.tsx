'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { bundleOffers, formatNaira, type BundleOffer } from '@/lib/bundles';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function CheckoutForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(bundleOffers[0].name);
  const [pendingOffer, setPendingOffer] = useState<BundleOffer>(bundleOffers[0]);

  useEffect(() => {
    const selectPackageFromUrl = () => {
      const packageName = new URLSearchParams(window.location.search).get('set');
      if (packageName && bundleOffers.some((offer) => offer.name === packageName)) {
        setSelectedPackage(packageName);
      }
    };

    selectPackageFromUrl();
    window.addEventListener('popstate', selectPackageFromUrl);
    return () => window.removeEventListener('popstate', selectPackageFromUrl);
  }, []);

  const handleInitialSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const offer = bundleOffers.find((item) => item.name === formData.get('Package'));
    setPendingOffer(offer ?? bundleOffers[0]);
    setShowModal(true);
  };

  const confirmAndSubmit = async () => {
    if (!formRef.current) return;

    setShowModal(false);
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const selectedOffer = bundleOffers.find((item) => item.name === formData.get('Package')) ?? bundleOffers[0];
    formData.set('Order Summary', `${selectedOffer.name} — ${formatNaira(selectedOffer.price)} | Includes: ${selectedOffer.contents}${selectedOffer.totalCapacity ? ` | Capacity: ${selectedOffer.totalCapacity}` : ''}`);
    const eventId = crypto.randomUUID();

    window.fbq?.('track', 'InitiateCheckout', {
      currency: 'NGN',
      value: selectedOffer.price,
      num_items: selectedOffer.pieces,
      content_name: selectedOffer.name,
      content_type: 'product',
    });

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({
          formData: Object.fromEntries(formData.entries()),
          value: selectedOffer.price,
          quantity: selectedOffer.pieces,
          productName: selectedOffer.name,
          phone: formData.get('Phone Number'),
          eventId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const params = new URLSearchParams({
          value: String(selectedOffer.price),
          quantity: String(selectedOffer.pieces),
          product: selectedOffer.name,
          eventId,
        });
        router.push(`/thank-you?${params.toString()}`);
        return;
      }

      alert('There was a problem submitting your order. Please try again.');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was a problem submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form w-full text-left relative">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <p className="text-xs font-bold tracking-widest text-orange-600 uppercase text-center mb-2">Please confirm</p>
            <h2 className="text-2xl font-extrabold text-center mb-3">{pendingOffer.name}</h2>
            <p className="text-center text-gray-600 mb-6">{formatNaira(pendingOffer.price)} · {pendingOffer.contents}</p>
            <div className="space-y-4 text-sm md:text-base text-gray-700 text-center">
              <p>We package and deliver orders across Nigeria with care.</p>
              <p className="text-green-700 font-semibold">Please submit only if you are ready to receive and pay for this set upon delivery.</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="w-1/2 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">Go back</button>
              <button onClick={confirmAndSubmit} className="w-1/2 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-md">Yes, order</button>
            </div>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleInitialSubmit} className="space-y-6">
        <div className="form-grid">
          <div><label className="form-label">Your name</label><input type="text" name="Full Name" required placeholder="Your name" className="form-input" /></div>
          <div><label className="form-label">Your phone number</label><input type="tel" name="Phone Number" required placeholder="08012345678" className="form-input" /></div>
        </div>
        <div><label className="form-label">Alternative phone number <span>(optional)</span></label><input type="tel" name="Alternative Phone" placeholder="08012345678" className="form-input" /></div>

        <div className="form-grid">
          <div><label className="form-label">State of delivery</label><select name="State" required className="form-input"><option value="">Select your state</option><option value="Abia">Abia</option><option value="Adamawa">Adamawa</option><option value="Akwa Ibom">Akwa Ibom</option><option value="Anambra">Anambra</option><option value="Bauchi">Bauchi</option><option value="Bayelsa">Bayelsa</option><option value="Benue">Benue</option><option value="Borno">Borno</option><option value="Cross River">Cross River</option><option value="Delta">Delta</option><option value="Ebonyi">Ebonyi</option><option value="Edo">Edo</option><option value="Ekiti">Ekiti</option><option value="Enugu">Enugu</option><option value="FCT - Abuja">FCT - Abuja</option><option value="Gombe">Gombe</option><option value="Imo">Imo</option><option value="Jigawa">Jigawa</option><option value="Kaduna">Kaduna</option><option value="Kano">Kano</option><option value="Katsina">Katsina</option><option value="Kebbi">Kebbi</option><option value="Kogi">Kogi</option><option value="Kwara">Kwara</option><option value="Lagos">Lagos</option><option value="Nasarawa">Nasarawa</option><option value="Niger">Niger</option><option value="Ogun">Ogun</option><option value="Ondo">Ondo</option><option value="Osun">Osun</option><option value="Oyo">Oyo</option><option value="Plateau">Plateau</option><option value="Rivers">Rivers</option><option value="Sokoto">Sokoto</option><option value="Taraba">Taraba</option><option value="Yobe">Yobe</option><option value="Zamfara">Zamfara</option></select></div>
          <div><label className="form-label">Your city</label><input type="text" name="City" required placeholder="Your city" className="form-input" /></div>
        </div>
        <div><label className="form-label">Detailed delivery address</label><input type="text" name="Address" required placeholder="House number, street, landmark..." className="form-input" /></div>

        <fieldset className="package-fieldset">
          <legend>Choose your storage set</legend>
          <p>Every option includes the exact airtight glass containers listed.</p>
          <div className="package-picker">
            {bundleOffers.map((offer) => (
              <label className="package-option" key={offer.name}>
                <input type="radio" name="Package" value={offer.name} required checked={selectedPackage === offer.name} onChange={() => setSelectedPackage(offer.name)} />
                <span className="package-option-copy"><strong>{offer.name}</strong><small>{offer.contents}{offer.totalCapacity ? ` · ${offer.totalCapacity}` : ''}</small></span>
                <span className="package-option-price"><b>{formatNaira(offer.price)}</b><s>{formatNaira(offer.was)}</s></span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" disabled={isSubmitting} className="submit-order-button">{isSubmitting ? 'Processing order...' : 'Place order — pay on delivery'}</button>
        <p className="form-assurance">We will call to confirm your delivery details before dispatch.</p>
      </form>
    </div>
  );
}
