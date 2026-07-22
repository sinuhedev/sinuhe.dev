import { Glitch, PortalText } from 'components'
import { Link } from 'nextia'

export default function ProjectsPage() {
  return (
    <section className="h-3/4 flex flex-wrap items-center justify-around">
      <article className="text-center">
        <Link href="https://portalx.dev" target="_blank" rel="noreferrer">
          <PortalText value="Portal X." />
        </Link>
      </article>

      <article className="text-center">
        <Link href="https://portalfx.dev" target="_blank" rel="noreferrer">
          <Glitch value="Portal FX." />
        </Link>
      </article>
    </section>
  )
}
