'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmAndSubmit = async () => {
    if (!formRef.current) return;
    
    setShowModal(false);
    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current);
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

    if (!formId) {
      alert('Order form is not configured yet. Please contact the store.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/xgavvwlg`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        router.push('/thank-you');
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
    <div className="w-full max-w-xl mx-auto p-0 md:p-8 bg-transparent md:bg-white text-left relative">
      
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-extrabold text-center mb-4">Confirm Your Order</h2>
            <div className="space-y-4 text-sm md:text-base text-gray-700 text-center">
              <p>We spend a lot of money packaging orders and delivering products across Nigeria.</p>
              <p>To help us serve our customers better, we kindly ask that you only submit this order if you are ready to receive and pay for your cordless pressure washer upon delivery.</p>
              <p className="text-red-600 font-semibold">If you are not ready to complete your purchase at this time, please click No and cancel your order.</p>
              <p className="text-green-600 font-semibold">If you are ready to receive and pay for your pressure washer upon delivery, click Yes to continue.</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowModal(false)}
                className="w-1/2 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button 
                onClick={confirmAndSubmit}
                className="w-1/2 py-3 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-md"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleInitialSubmit} className="space-y-6">
        {/* Contact Info */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Your name</label>
          <input type="text" name="Full Name" required placeholder="Your Name" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Your phone number</label>
          <input type="tel" name="Phone Number" required placeholder="08012345678" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Alternative phone number (Optional)</label>
          <input type="tel" name="Alternative Phone" placeholder="08012345678" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        {/* Location Info */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Your state of delivery</label>
          <select name="State" required className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none bg-white">
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
          <label className="block text-sm text-gray-700 mb-1">Your city</label>
          <input type="text" name="City" required placeholder="Your city" className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Detailed delivery address</label>
          <input type="text" name="Address" required placeholder="House number, street, landmark..." className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-600 outline-none" />
        </div>

        {/* Package Selection */}
        <div className="pt-4">
          <h3 className="font-bold text-xl text-center mb-6">Select your quantity</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg cursor-pointer bg-white hover:border-orange-600 transition-colors">
              <div className="flex items-center gap-3">
                <input type="radio" name="Quantity" value="1 Pressure Washer (₦73,000)" required className="w-4 h-4 text-orange-600" defaultChecked />
                <span className="font-medium text-sm md:text-base text-gray-700 uppercase">Buy 1 Pressure Washer</span>
              </div>
              <span className="font-bold text-orange-600">₦73,000</span>
            </label>

            <label className="flex items-center justify-between p-3 md:p-4 border border-orange-300 rounded-lg cursor-pointer relative bg-orange-50/30 hover:border-orange-600 transition-colors">
              <div className="flex items-center gap-3">
                <input type="radio" name="Quantity" value="2 Pressure Washers (₦140,000)" required className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-sm md:text-base text-gray-700 uppercase">Buy 2 Pressure Washers</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="font-bold text-orange-600">₦140,000</span>
              </div>
            </label>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-70 mt-6 shadow-md">
          {isSubmitting ? 'Processing Order...' : 'Order Now — Free Delivery'}
        </button>
      </form>
    </div>
  );
}