import { skillGroups } from '@/content/profile'
import { SectionHead } from './SectionHead'

export function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead label="Skills" count={`${total} items`} />

        <div className="tbl">
          {skillGroups.map((group) => (
            <div className="tbl-row tbl-row--split anim-item" key={group.title}>
              <div className="tbl-key">{group.title}</div>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    {skill.level && (
                      <span className="skill-level" data-level={skill.level}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
