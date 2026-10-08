'use client'

export default function SiteNav() {
  const closeDrawer = () => document.body.classList.remove('nav-open')
  const toggleDrawer = () => document.body.classList.toggle('nav-open')

  return (
    <>
      <nav className="site-nav">
        <div className="nav-left">
          <a href="#" className="nav-link">The Set</a>
          <a href="#" className="nav-link">Giveaways</a>
          <a href="#" className="nav-link">Pulls</a>
        </div>

        <div className="nav-logo-wrap">
          <img src="/shopps-logo-v2.png" alt="SHOPPS" className="nav-logo" />
        </div>

        <div className="nav-right">
          <a href="#" className="nav-link">How it works</a>
          <a href="#" className="nav-link">Nominate</a>
          <a href="#" className="nav-live">LIVE</a>
        </div>

        <button className="nav-hamburger" aria-label="Menu" onClick={toggleDrawer}>
          <span /><span /><span />
        </button>
      </nav>

      <div className="nav-drawer" onClick={closeDrawer}>
        <div className="nav-drawer-inner" onClick={e => e.stopPropagation()}>
          <a href="#" className="nav-drawer-link" onClick={closeDrawer}>The Set</a>
          <a href="#" className="nav-drawer-link" onClick={closeDrawer}>Giveaways</a>
          <a href="#" className="nav-drawer-link" onClick={closeDrawer}>Pulls</a>
          <a href="#" className="nav-drawer-link" onClick={closeDrawer}>How it Works</a>
          <a href="#" className="nav-drawer-link" onClick={closeDrawer}>Nominate</a>
          <a href="#" className="nav-drawer-live" onClick={closeDrawer}>LIVE</a>
        </div>
      </div>
    </>
  )
}
