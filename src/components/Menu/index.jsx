import { css, I18n, Link } from 'nextia'
import { isMobile } from 'utils'
import './style.css'

export default function Menu({ className, value, width, onClick = () => {} }) {
  return (
    <aside className={css('Menu ', className)}>
      {isMobile() && width > 0 && (
        <button type="button" className="lock-sm" onClick={onClick} />
      )}

      <section
        className={css('flex flex-col h-full menu-sm')}
        style={{ width }}
      >
        <ul className="ps-3 pt-3">
          {value.items.map((e, key) => (
            <li
              key={e.path}
              className={css('py-2 ps-2', { active: key === value.itemActive })}
            >
              <Link
                href={e.path}
                className="block p-1"
                onClick={() => isMobile() && onClick()}
              >
                <I18n value={e.name} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
