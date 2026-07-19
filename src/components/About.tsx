import { about } from '@/content/profile'
import { SectionHead } from './SectionHead'

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead label="About" />

        <div className="about-body">
          <dl className="about-aside anim-item">
            {about.aside.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="about-text">
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
