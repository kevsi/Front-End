export function PromoBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Banner */}
      <div className="lg:col-span-2">
        <div className="relative h-60 bg-dashboard-yellow rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-25">
            {/* Decorative circles */}
            <div className="absolute w-32 h-32 border-2 border-white rounded-full -top-8 right-20"></div>
            <div className="absolute w-24 h-24 border-2 border-white rounded-full top-16 -right-4"></div>
            <div className="absolute w-20 h-20 border-2 border-white rounded-full bottom-8 -left-4"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between h-full p-8">
            <div className="text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Conseillez le client en lui proposant
              </h3>
              <h3 className="text-2xl lg:text-3xl font-bold">
                cet article populaire
              </h3>
            </div>
            <div className="hidden lg:block">
              <img
                src="/placeholder.svg"
                alt="Featured item"
                className="w-80 h-60 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side Banner */}
      <div className="lg:col-span-1">
        <div className="relative h-60 bg-dashboard-yellow rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute w-24 h-24 border-2 border-white rounded-full -top-4 right-8"></div>
            <div className="absolute w-16 h-16 border-2 border-white rounded-full bottom-12 -left-2"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="text-white mb-4">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                Pourquoi pas
              </h3>
              <h3 className="text-xl lg:text-2xl font-bold">
                celui ci aussi ?
              </h3>
            </div>
            <div className="mt-4">
              <img
                src="/placeholder.svg"
                alt="Suggested item"
                className="w-32 h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
