'use client'

export default function SiteNav() {
  const closeDrawer = () => document.body.classList.remove('nav-open')
  const toggleDrawer = () => document.body.classList.toggle('nav-open')

  return (
    <>
      <nav className="site-nav">
        <div className="nav-left">
          <a href="/set" className="nav-link">View the Collection</a>
          <a href="/how-it-works" className="nav-link">How It Works</a>
        </div>

        <a href="/" className="nav-logo-wrap">
          <img src="/shopps-logo-v2.png" alt="SHOPPS" className="nav-logo" />
        </a>

        <div className="nav-right">
          <a href="/giveaways" className="nav-link">What Cards Unlock</a>
          <a href="/how-it-works" className="nav-live">Get a Pack</a>
        </div>

        <button className="nav-hamburger" aria-label="Menu" onClick={toggleDrawer}>
          <span /><span /><span />
        </button>
      </nav>

      <div className="nav-drawer" onClick={closeDrawer}>
        <div className="nav-drawer-inner" onClick={e => e.stopPropagation()}>
          <a href="/set" className="nav-drawer-link" onClick={closeDrawer}>View the Collection</a>
          <a href="/how-it-works" className="nav-drawer-link" onClick={closeDrawer}>How It Works</a>
          <a href="/giveaways" className="nav-drawer-link" onClick={closeDrawer}>What Cards Unlock</a>
          <a href="/how-it-works" className="nav-drawer-live" onClick={closeDrawer}>Get a Pack</a>
        </div>
      </div>
    </>
  )
}
