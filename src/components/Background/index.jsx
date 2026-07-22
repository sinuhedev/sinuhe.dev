import { css } from 'nextia'
import './style.css'

export default function Background({ className, style }) {
  return (
    <article className={css('Background', className)} style={style}>
      <div className="worldCrystals">
        <div className="crystal_02" />
        <div className="crystal_03" />
      </div>
      <div className="crystals">
        <div className="crystal_01" />
        <div className="crystal_02" />
        <div className="crystal_03" />
      </div>
    </article>
  )
}
