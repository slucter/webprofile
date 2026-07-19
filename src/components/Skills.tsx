import { skillGroups } from '@/content/profile'

export function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-pattern" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-label anim-label">Skills &amp; Expertise</h2>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const color = `var(--cat-${group.category})`
            const bg = `var(--cat-${group.category}-bg)`

            return (
              <div className="skill-card anim-item" key={group.title}>
                <div className="skill-card-accent" style={{ background: color }} />
                <h3 className="skill-card-title">{group.title}</h3>
                <p className="skill-card-desc">{group.desc}</p>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span
                      className="skill-tag"
                      key={skill.name}
                      style={{ background: bg, color }}
                    >
                      {skill.name}
                      {skill.level && <span className="skill-tag-level">{skill.level}</span>}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
