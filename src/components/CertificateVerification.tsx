"use client";

export function CertificateVerification() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center text-[var(--gsm-navy)]">
          التحقق من الشهادة
        </h2>

        <p className="mt-3 text-center text-gray-500">
          ادخل كود الشهادة للتحقق منها
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <input
            type="text"
            placeholder="مثال: gsm123"
            className="flex-1 rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-[var(--gsm-blue)]"
          />

          <button
            className="rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 font-semibold text-white transition hover:opacity-90"
          >
            بحث
          </button>

        </div>

      </div>
    </section>
  );
}