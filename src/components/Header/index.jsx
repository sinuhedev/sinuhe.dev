import './style.css'
import { Button, Translate } from 'components'
import { css, Icon, Link } from 'nextia'

export default function Header({ className, style, onClickMenu = () => {} }) {
  return (
    <header
      className={css(
        'Header',
        'flex justify-between items-center ps-4 pe-2',
        className
      )}
      style={style}
    >
      <div className="flex gap-3">
        <Button
          Icon={<Icon id="menu" width="32" strokeWidth="5" />}
          onClick={onClickMenu}
        />

        <Link href="/#/" className="flex items-center">
          <Icon id="home" width="32" strokeWidth="5" />
        </Link>
      </div>

      <Translate />
    </header>
  )
}
