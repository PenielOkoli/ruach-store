import Link from 'next/link';
import Script from 'next/script';

export default function ThankYouPage() {
  const whatsappNumber = "2348107945423"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20just%20placed%20an%20order%20for%20the%20cordless%20pressure%20washer%20on%20your%20website.%20I%20would%20like%20to%20confirm%20my%20delivery%20details.`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4 pb-20 font-sans">
      
      
      {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? <Script id="fb-purchase" strategy="afterInteractive">
        {`fbq('track', 'Purchase', {currency: 'NGN', value: 73000, content_name: 'Cordless Pressure Washer'});`}
      </Script> : null}
      

      {/* Order Status Badge */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-lg">
        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-orange-600 flex items-center justify-center text-orange-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase">Order Confirmed</h2>
          <p className="text-gray-500 text-sm">A confirmation call is on its way</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-lg space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            Your cordless pressure washer is on its way.
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We&apos;ll be in touch within 24 hours - no upfront payment needed.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">Delivery Progress</h3>
          <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-gray-200 -z-10"></div>
            
            {/* Steps */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-600 ring-4 ring-orange-100"></div>
              <span className="text-xs font-bold text-orange-600 text-center">Order<br/>placed</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-400 text-center">Confirmed</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-400 text-center">Dispatched</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <span className="text-xs text-gray-400 text-center">Delivered</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">Estimated delivery: <strong className="text-gray-800">2–5 business days</strong> after confirmation</p>
        </div>

        {/* WhatsApp Button */}
        <div className="pt-8 border-t border-gray-200">
           <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Fast-Track Your Order</h3>
           <a 
             href={whatsappLink}
             target="_blank"
             rel="noopener noreferrer"
             className="w-full bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-[#1ebd5a] transition-colors shadow-lg"
           >
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
             </svg>
             Chat with us on WhatsApp
           </a>
        </div>
      </div>
    </div>
  );
}