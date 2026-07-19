import { about } from '@/content/profile'

export function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="anim-item">
            <div className="about-avatar">
              <svg className="crosshair" viewBox="0 0 320 320" fill="none" aria-hidden="true">
                <line x1="160" y1="0" x2="160" y2="320" stroke="#FFE6CB" strokeOpacity="0.06" strokeWidth="0.5" />
                <line x1="0" y1="160" x2="320" y2="160" stroke="#FFE6CB" strokeOpacity="0.06" strokeWidth="0.5" />
              </svg>
              <span className="about-avatar-label">[portrait]</span>
            </div>
            <div className="about-stats">
              {about.stats.map((stat) => (
                <span className="about-stat" key={stat.value}>
                  {stat.value}
                </span>
              ))}
            </div>
          </div>

          <div className="about-text">
            <h2 className="section-label anim-label">About</h2>
            <div className="about-divider anim-item" />
            {about.paragraphs.map((p, i) => (
              <p className="anim-item" key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
