import Navbar from "../components/Navbar";

function App(){
  return (
    <>
      <Navbar />
        <main>
          <section className="home">
            <div className="hero">
              <img className="florFondoHome" src="/img/FlorLogo.png" alt="" />
              <h1 className="hero-title">SHANTI <span className="block yoga">yoga</span></h1>
              <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>
            </div>
          </section>
        </main>
    </>
  )
}

export default App
/*export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1 className="hero-title">SHANTI yoga</h1>
        <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>
      </div>
    </section>
  )
}*/

