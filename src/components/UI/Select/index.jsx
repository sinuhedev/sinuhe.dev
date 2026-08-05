import { css } from 'nextia'
import { useEffect, useRef, useState } from 'react'
import './style.css'

export default function UiSelect({
  className,
  style,
  name,
  value,
  onChange = () => {},
  children
}) {
  const [open, setOpen] = useState()
  const button = useRef(null)

  // close in the body
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (open && button.current && !button.current.contains(e.target)) {
        setOpen(false)
      }
    })
  }, [open, document.body])

  return (
    <article className={css('UiSelect', className)} style={style}>
      <button
        type="button"
        className=""
        ref={button}
        onClick={() => setOpen(!open)}
      >
        {value}
      </button>

      {open && (
        <ul className="absolute text-center z-101">
          {children.map(({ props, key }) => (
            <li
              {...props}
              key={key}
              onClick={(e) => {
                e.target.name = name
                e.target.val = props.value

                onChange(e)
                setOpen(false)
              }}
            >
              {props.children}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
