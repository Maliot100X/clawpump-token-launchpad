export default function Launch() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-8">Launch Token</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-6">Create Your Token</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token Name</label>
              <input type="text" className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500" placeholder="My Token" />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Symbol</label>
              <input type="text" className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500" placeholder="MTK" />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500 h-24" placeholder="Token description..." />
            </div>
            
            <div className="bg-gray-800 rounded p-4 border border-gray-700">
              <p className="text-sm text-gray-400">Launch Cost: <span className="text-purple-400 font-semibold">10,000 CLAW</span></p>
              <p className="text-xs text-gray-500">You need 10,000 CLAW tokens to launch</p>
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition">
              Launch Token
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
