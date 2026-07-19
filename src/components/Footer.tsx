import { profile } from '@/content/profile'
import { GithubIcon, LinkedinIcon } from './Icons'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="wordmark">
          <span className="wordmark-first">HASH</span>
          <span className="wordmark-last">CODE</span>
        </div>

        <span className="footer-copy">
          &copy; {new Date().getFullYear()} {profile.name}
        </span>

        <div className="footer-socials">
          <a
            className="footer-social"
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon size={17} />
          </a>
          <a
            className="footer-social"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
