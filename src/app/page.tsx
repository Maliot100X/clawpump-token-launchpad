export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-purple-500">ClawPump Launchpad</h1>
        <div className="flex gap-4">
          <a href="/launch" className="hover:text-purple-400">Launch</a>
          <a href="/trade" className="hover:text-purple-400">Trade</a>
          <a href="/portfolio" className="hover:text-purple-400">Portfolio</a>
        </div>
      </nav>
      
      <section className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Launch Tokens with <span className="text-purple-500">CLAW</span>
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          The first Solana launchpad where CLAW is the quote currency
        </p>
        <a href="/launch" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-lg font-semibold transition">
          Launch Token
        </a>
      </section>
    </main>
  );
}
