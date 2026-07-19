import { education, certificates, languages } from '@/content/profile'
import { SectionHead } from './SectionHead'

export function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHead label="Education" />

        <div className="tbl">
          {education.map((edu) => (
            <article className="tbl-row tbl-row--split anim-item" key={edu.title}>
              <div className="tbl-key">{edu.period}</div>
              <div>
                <h3 className="edu-title">{edu.title}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <ul className="xp-list">
                  {edu.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="tbl-row tbl-row--split anim-item">
            <div className="tbl-key">Certificates</div>
            <div>
              {certificates.map((c) => (
                <div key={c.name}>
                  <span className="cred-name">{c.name}</span>
                  <br />
                  <span className="cred-issuer">{c.issuer}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tbl-row tbl-row--split anim-item">
            <div className="tbl-key">Languages</div>
            <div className="skill-list">
              {languages.map((l) => (
                <div className="skill-item" key={l.name}>
                  <span className="skill-name">{l.name}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
