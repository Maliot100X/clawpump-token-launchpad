'use client';

import { useState } from 'react';

export default function Launch() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleLaunch = async () => {
    if (!name || !symbol) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          symbol,
          description,
          imageUrl: '', // Will be uploaded separately
          agentId: 'clawpump-launchpad',
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: String(error) });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-8">Launch Token</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-6">Create Your Token</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500" 
                placeholder="My Token" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Symbol</label>
              <input 
                type="text" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500" 
                placeholder="MTK" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-800 rounded px-4 py-2 text-white border border-gray-700 focus:border-purple-500 h-24" 
                placeholder="Token description..." 
              />
            </div>
            
            <div className="bg-gray-800 rounded p-4 border border-gray-700">
              <p className="text-sm text-gray-400">Launch Cost: <span className="text-purple-400 font-semibold">0.035 SOL</span></p>
              <p className="text-xs text-gray-500">Gas fees for token creation on Solana</p>
            </div>
            
            {result && (
              <div className={`p-4 rounded ${result.success ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'}`}>
                {result.success ? (
                  <p className="text-green-400">Token launched! Mint: {result.mint}</p>
                ) : (
                  <p className="text-red-400">Error: {result.error}</p>
                )}
              </div>
            )}
            
            <button 
              onClick={handleLaunch}
              disabled={loading || !name || !symbol}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Launching...' : 'Launch Token'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
