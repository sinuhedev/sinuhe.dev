import { Select } from 'components'
import { css } from 'nextia'
import './style.css'

export default function Translate({
  className,
  style,
  value,
  onChange = () => [],
  locales = []
}) {
  return (
    <article className={css('Translate', className, '')} style={style}>
      <Select name="i18n" value={value} onChange={onChange}>
        {locales.map((e) => (
          <option key={e} value={e} className="m-2">
            {e}
          </option>
        ))}
      </Select>
    </article>
  )
}
