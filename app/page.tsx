export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">Welcome to Floral Studio</h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Create beautiful floral designs and arrangements for every occasion
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
            Get Started
          </button>
          <button className="px-6 py-2 border border-border rounded-lg font-semibold hover:bg-secondary transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}
