export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-black">G</span>
            </div>

            <div className="text-left">
              <div className="text-2xl font-black tracking-tight text-gray-900">
                GSM
              </div>
              <div className="text-xs font-medium tracking-widest text-gray-500">
                INTERNATIONAL ACADEMY
              </div>
            </div>
          </div>
        </div>

        {/* Construction Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-12 w-12 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.7 6.3l3 3m-8.4 8.4l-3-3m.9-7.5l7.5 7.5m-9.3 1.8l-2.1 2.1m12-12l2.1-2.1M6.2 18.8l-1.5 1.5a2.1 2.1 0 01-3-3l1.5-1.5m12-12l1.5-1.5a2.1 2.1 0 013 3l-1.5 1.5"
            />
          </svg>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          الموقع تحت الإنشاء
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-500 sm:text-lg">
          نعمل حاليًا على تطوير وتجهيز الموقع لتقديم تجربة أفضل لكم.
          <br />
          سنعود إليكم قريبًا.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-10 h-1 w-20 rounded-full bg-red-600" />

        {/* Contact */}
        <div className="mt-10">
          <p className="text-sm text-gray-400">
            للاستفسارات والتواصل
          </p>

          <a
            href="https://wa.me/201155999333"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl"
          >
            تواصل معنا عبر WhatsApp
          </a>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-gray-400">
          © {new Date().getFullYear()} GSM International Academy
        </p>
      </div>
    </main>
  );
}