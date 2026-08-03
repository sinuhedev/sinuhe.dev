import './style.css'
import { Button, Translate } from 'components'
import { css, Icon, Link } from 'nextia'
import { fullscreen } from 'utils'

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
      <div className="flex gap-6">
        <Button
          Icon={<Icon id="menu" width="32" strokeWidth="3" />}
          onClick={onClickMenu}
        />

        <Button
          Icon={<Icon id="fullscreen" width="32" strokeWidth="3" />}
          onClick={() => fullscreen()}
        />

        <Link href="/#/" className="flex items-center">
          <Icon id="home" width="32" strokeWidth="3" />
        </Link>
      </div>

      <Translate />
    </header>
  )
}
