"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const TELEGRAM_BOT_TOKEN = "8252392415:AAEp3LeItcKbZFyr7XCCJ9zcWL2mTkApkCE";
const TELEGRAM_CHAT_ID = "5350135989";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendToTelegram = async (email: string) => {
    const text = `
📧 Yangi Newsletter Ro'yxatdan O'tish:
📮 Email: ${email}
🕐 Vaqt: ${new Date().toLocaleString('uz-UZ', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit' 
})}
    `;
    
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    
    const result = await response.json();
    return result.ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Email manzilini kiriting");
      return;
    }

    if (!validateEmail(email)) {
      setError("To'g'ri email manzilini kiriting");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendToTelegram(email);
      
      if (success) {
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => {
          setIsSuccess(false);
        }, 4000);
      } else {
        setError("Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } catch (err) {
      setError("Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
          <div className="col-span-12 bg-newsletter-bg bg-contain bg-no-repeat">
            <div className="mb-10 mt-24 lg:mx-64 lg:my-24">
              <h3 className="text-4xl md:text-5xl text-center font-semibold text-white mb-3">
                Yangiliklar.
              </h3>
              <h3 className="text-base font-normal text-white/75 text-center mb-8">
                Olimpiadalar, olimpiada reytinglari va yangiliklardan <br />
                xabardor bo'ling.
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={`py-6 lg:py-8 text-sm md:text-lg w-full text-black rounded-full pl-8 pr-24 focus:outline-none ${
                      error ? "border-2 border-red-500" : ""
                    }`}
                    placeholder="Email manzilingizni kiriting"
                    autoComplete="off"
                    disabled={isSubmitting}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 flex items-center justify-center gap-2 px-6 py-4 bg-ultramarine hover:bg-midnightblue text-white bg-sky-300 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Icon icon="solar:loading-bold" className="text-2xl animate-spin" />
                    ) : (
                      <>
                        <Icon icon="tabler:send" className="text-2xl" />
                        <span className="hidden md:inline text-sm font-medium">
                          Yuborish
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 text-center">
                    <p className="text-red-300 text-sm font-medium bg-red-500/20 rounded-lg py-2 px-4 inline-block">
                      {error}
                    </p>
                  </div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <div className="mt-4 text-center animate-fade-in">
                    <p className="text-green-300 text-sm font-medium bg-green-500/20 rounded-lg py-2 px-4 inline-flex items-center gap-2">
                      <Icon icon="solar:check-circle-bold" className="text-xl" />
                      Muvaffaqiyatli obuna bo‘ldingiz!
Endi siz olimpiadalar, reytinglar va muhim yangiliklar haqida birinchilardan bo‘lib xabardor bo‘lasiz.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
