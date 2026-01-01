"use client";

export default function Stats() {
  return (
    <section className="w-full bg-[#050A1A] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center lg:border-r lg:border-white/10 px-6">
            <p className="text-sm text-white/60">Current Focus</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              Fleet
            </h3>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center lg:border-r lg:border-white/10 px-6">
            <p className="text-sm text-white/60">Pre-seed Funding</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              $1.5M
            </h3>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center px-6">
            <p className="text-sm text-white/60">Future Categories</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              8+
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}
