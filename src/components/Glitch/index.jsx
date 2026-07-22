import './style.css'
import { css } from 'nextia'

export default function Glitch({ className, style, value }) {
  return (
    <article className={css('Glitch', className)} style={style}>
      <div className="hero-container">
        <h2 className="hero glitch layers" data-text={value}>
          <span>{value}</span>
        </h2>
      </div>
    </article>
  )
}
