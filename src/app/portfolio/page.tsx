export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-8">Portfolio</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
          <p className="text-gray-400">Connect your wallet to view holdings</p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Your Launches</h2>
          <p className="text-gray-400">No tokens launched yet</p>
        </div>
      </div>
    </main>
  );
}
