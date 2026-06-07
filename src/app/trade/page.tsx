export default function Trade() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-8">Trade</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Buy</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token</label>
              <select className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700">
                <option>Select token...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (CLAW)</label>
              <input type="number" className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700" placeholder="0.00" />
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition">
              Buy
            </button>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Sell</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token</label>
              <select className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700">
                <option>Select token...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <input type="number" className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700" placeholder="0.00" />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition">
              Sell
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
