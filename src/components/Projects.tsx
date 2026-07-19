'use client'

import { useState } from 'react'
import { projects, projectFilters } from '@/content/profile'
import { SectionHead } from './SectionHead'
import { ExternalLinkIcon, GithubIcon } from './Icons'

export function Projects() {
  const [filter, setFilter] = useState<string>('all')

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead label="Projects" count={`${visible.length} / ${projects.length}`} />

        <div className="filters">
          {projectFilters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="tbl">
          {visible.map((project) => (
            <article className="tbl-row anim-item is-visible" key={project.name}>
              <div>
                <div className="prj-head">
                  <h3 className="prj-name">{project.name}</h3>
                  <span className="prj-context">{project.context}</span>
                </div>

                <p className="prj-desc">{project.desc}</p>

                <div className="tag-row">
                  {project.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Baris tautan hanya muncul bila project punya tautan publik. */}
                {(project.liveUrl || project.sourceUrl) && (
                  <div className="prj-links">
                    {project.liveUrl && (
                      <a
                        className="prj-link"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLinkIcon size={13} />
                        Live
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        className="prj-link"
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon size={13} />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
