'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const orderOptions = {
  '1 Carton of 12pcs Glass Container (₦135,000)': { value: 135000, quantity: 1 },
  '2 Cartons of 12pcs Glass Container (₦261,000)': { value: 261000, quantity: 2 },
  '3 Cartons of 12pcs Glass Container (₦394,000)': { value: 394000, quantity: 3 },
  '4 Cartons of 12pcs Glass Container (₦522,000)': { value: 522000, quantity: 4 },
} as const;

export default function CheckoutForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!showModal || !dialog) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmAndSubmit = async () => {
    if (!formRef.current) return;

    setShowModal(false);
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const selectedOrder = orderOptions[formData.get('Quantity') as keyof typeof orderOptions];
    const eventId = crypto.randomUUID();

    if (selectedOrder) {
      window.fbq?.('track', 'InitiateCheckout', {
        currency: 'NGN',
        value: selectedOrder.value,
        num_items: selectedOrder.quantity,
        content_name: '12-Piece Glass Container Set',
        content_type: 'product',
      });
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({
          formData: Object.fromEntries(formData.entries()),
          value: selectedOrder?.value,
          quantity: selectedOrder?.quantity,
          phone: formData.get('Phone Number'),
          eventId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const params = new URLSearchParams({
          value: String(selectedOrder?.value ?? 135000),
          quantity: String(selectedOrder?.quantity ?? 1),
          eventId,
        });
        router.push(`/thank-you?${params.toString()}`);
      } else {
        alert('There was a problem submitting your order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was a problem submitting your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form">

      {/* Confirmation Modal */}
      <dialog ref={dialogRef} className="order-confirmation" aria-labelledby="confirm-order-title" onCancel={() => setShowModal(false)} onClose={() => setShowModal(false)}>
            <h2 id="confirm-order-title" className="text-2xl font-extrabold text-center mb-4">Confirm Your Order</h2>
            <div className="space-y-4 text-sm md:text-base text-gray-700 text-center">
              <p>We spend a lot of money packaging orders and delivering products across Nigeria.</p>
              <p>To help us serve our customers better, we kindly ask that you only submit this order if you are ready to receive and pay for your 12-piece glass container carton upon delivery.</p>
              <p className="text-red-600 font-semibold">If you are not ready to complete your purchase at this time, please click No and cancel your order.</p>
              <p className="text-green-600 font-semibold">If you are ready to receive and pay for your glass container set upon delivery, click Yes to continue.</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-order w-1/2 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmAndSubmit}
                className="w-1/2 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-md"
              >
                Yes, Submit
              </button>
            </div>
      </dialog>

      <form ref={formRef} onSubmit={handleInitialSubmit}>
        {/* Contact Info */}
        <div>
          <label htmlFor="full-name" className="block text-sm text-gray-700 mb-1">Your name</label>
          <input type="text" id="full-name" autoComplete="name" name="Full Name" required placeholder="Your Name" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label htmlFor="phone-number" className="block text-sm text-gray-700 mb-1">Your phone number</label>
          <input type="tel" id="phone-number" autoComplete="tel" name="Phone Number" required placeholder="08012345678" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label htmlFor="alternative-phone" className="block text-sm text-gray-700 mb-1">Alternative phone number (Optional)</label>
          <input type="tel" id="alternative-phone" autoComplete="off" name="Alternative Phone" placeholder="08012345678" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        {/* Location Info */}
        <div>
          <label htmlFor="delivery-state" className="block text-sm text-gray-700 mb-1">Your state of delivery</label>
          <select id="delivery-state" autoComplete="address-level1" name="State" required className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none bg-white">
            <option value="">Select your state</option>
            <option value="Abia">Abia</option>
            <option value="Adamawa">Adamawa</option>
            <option value="Akwa Ibom">Akwa Ibom</option>
            <option value="Anambra">Anambra</option>
            <option value="Bauchi">Bauchi</option>
            <option value="Bayelsa">Bayelsa</option>
            <option value="Benue">Benue</option>
            <option value="Borno">Borno</option>
            <option value="Cross River">Cross River</option>
            <option value="Delta">Delta</option>
            <option value="Ebonyi">Ebonyi</option>
            <option value="Edo">Edo</option>
            <option value="Ekiti">Ekiti</option>
            <option value="Enugu">Enugu</option>
            <option value="FCT - Abuja">FCT - Abuja</option>
            <option value="Gombe">Gombe</option>
            <option value="Imo">Imo</option>
            <option value="Jigawa">Jigawa</option>
            <option value="Kaduna">Kaduna</option>
            <option value="Kano">Kano</option>
            <option value="Katsina">Katsina</option>
            <option value="Kebbi">Kebbi</option>
            <option value="Kogi">Kogi</option>
            <option value="Kwara">Kwara</option>
            <option value="Lagos">Lagos</option>
            <option value="Nasarawa">Nasarawa</option>
            <option value="Niger">Niger</option>
            <option value="Ogun">Ogun</option>
            <option value="Ondo">Ondo</option>
            <option value="Osun">Osun</option>
            <option value="Oyo">Oyo</option>
            <option value="Plateau">Plateau</option>
            <option value="Rivers">Rivers</option>
            <option value="Sokoto">Sokoto</option>
            <option value="Taraba">Taraba</option>
            <option value="Yobe">Yobe</option>
            <option value="Zamfara">Zamfara</option>
          </select>
        </div>

        <div>
          <label htmlFor="delivery-city" className="block text-sm text-gray-700 mb-1">Your city</label>
          <input type="text" id="delivery-city" autoComplete="address-level2" name="City" required placeholder="Your city" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label htmlFor="delivery-address" className="block text-sm text-gray-700 mb-1">Detailed delivery address</label>
          <input type="text" id="delivery-address" autoComplete="street-address" name="Address" required placeholder="House number, street, landmark..." className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        {/* Package Selection */}
        <fieldset className="quantity-options">
          <legend>Select your quantity</legend>
          <div className="quantity-list">
            {Object.entries(orderOptions).map(([value, order]) => (
              <label className="quantity-option" key={value}>
                <input type="radio" name="Quantity" value={value} required defaultChecked={order.quantity === 1} />
                <span className="quantity-description">
                  {order.quantity} {order.quantity === 1 ? 'carton' : 'cartons'}
                  <small>12 pieces per carton</small>
                </span>
                <span className="quantity-price">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(order.value)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-70 mt-6 shadow-md">
          {isSubmitting ? 'Processing Order...' : 'Order Now — Free Delivery'}
        </button>
      </form>
    </div>
  );
}
