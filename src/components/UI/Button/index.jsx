import { css } from 'nextia'
import './style.css'

export default function UiButton({
  className,
  style,
  Icon,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={css('UiButton', className)}
      style={style}
      {...props}
    >
      {Icon} {children}
    </button>
  )
}
