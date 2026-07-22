import { css, I18n, Link } from 'nextia'
import './style.css'

export default function Menu({
  className,
  value,
  width,
  resize,
  onClick = () => {}
}) {
  return (
    <aside className={css('Menu ', className)}>
      {resize.sm && width > 0 && (
        <button type="button" className="lock" onClick={onClick} />
      )}

      <section
        className={css('flex flex-col h-full', { 'menu-sm': resize.sm })}
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
                className="block p-1 w-100"
                onClick={() => resize.sm && onClick()}
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
