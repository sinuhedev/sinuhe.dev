import nextiaSvg from 'assets/img/nextia.svg'
import { css, I18n, Icon, Link, Svg } from 'nextia'
import './style.css'

export default function Nextia({ className, style }) {
  return (
    <article className={css('Nextia', className)} style={style}>
      <Svg
        src={nextiaSvg}
        viewBox="0 0 940 540"
        className="nextia-svg h-50 md:h-95"
      />

      <div className="text-center mt-3 ">
        <div>
          <Link
            href="https://nextia.dev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <h2>Nextia.</h2>
            <Icon id="external-link" width="14" strokeWidth="6" />
          </Link>
        </div>
        <h5>
          <I18n value="projects.nextia" />
        </h5>
      </div>
    </article>
  )
}
