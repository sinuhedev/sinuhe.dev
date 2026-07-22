import { Select } from 'components'
import { css, useCx } from 'nextia'
import './style.css'

export default function Translate({ className, style }) {
  const { context, i18n } = useCx()

  return (
    <article className={css('Translate', className, '')} style={style}>
      <Select
        name="i18n"
        value={context.state?.i18n || i18n.defaultLocale}
        onChange={context.fx.changeI18n}
      >
        {i18n.locales.map((e) => (
          <option key={e} value={e} className="m-2">
            {e}
          </option>
        ))}
      </Select>
    </article>
  )
}
