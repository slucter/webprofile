import { experience } from '@/content/profile'
import { SectionHead } from './SectionHead'

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead label="Experience" count={`${experience.length} roles`} />

        <div className="tbl">
          {experience.map((job) => (
            <article
              className="tbl-row tbl-row--split anim-item"
              key={`${job.company}-${job.period}`}
            >
              <div className="tbl-key">{job.period}</div>

              <div>
                <h3 className="xp-role">{job.role}</h3>
                <p className="xp-company">{job.company}</p>

                <ul className="xp-list">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="tag-row">
                  {job.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
