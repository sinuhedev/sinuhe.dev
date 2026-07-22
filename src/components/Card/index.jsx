import { css } from 'nextia'
import './style.css'

export default function Card({
  className,
  style,
  href,
  cover,
  title,
  character
}) {
  return (
    <article className={css('Card', className)} style={style}>
      <a href={href} target="_blank" rel="noreferrer">
        <div className="card">
          <img src={cover} className="poster" alt="" />
          <img src={title} className="title" alt="" />
          <img src={character} className="character" alt="" />
        </div>
      </a>
    </article>
  )
}
