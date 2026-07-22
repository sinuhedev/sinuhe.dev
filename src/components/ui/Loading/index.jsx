import { css } from 'nextia'
import './style.css'

export default function UiLoading({ name, className, style }) {
  return (
    <article
      className={css('UiLoading', className)}
      style={style}
      name={name}
    />
  )
}
