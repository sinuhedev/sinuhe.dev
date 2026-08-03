import i18n from 'assets/i18n.json'
import icons from 'assets/icons.svg?raw'
import { Background, Header, Loading, Menu } from 'components'
import { Pagex, useFx, usePage, useQueryString, useResize } from 'nextia'
import { useEffect, useRef } from 'react'
import { env } from 'utils'
import functions from './functions'

export default function App() {
  const viewTransitionRef = useRef()
  const resize = useResize(env.WINDOW_RESIZE)
  const qs = useQueryString()
  const Page = usePage({
    hash: qs.hash,
    homePage: env.HOME_PAGE,
    importPage: async (path) => {
      if (path === undefined) return await import(`./not-found.jsx`)
      if (path.length === 1) return await import(`./${path[0]}/index.jsx`)
      if (path.length === 2)
        return await import(`./${path[0]}/${path[1]}/index.jsx`)
    },
    viewTransition: {
      ref: viewTransitionRef,
      name: env.VIEW_TRANSITION_NAME
    }
  })

  const pages = useFx(functions)
  const { state, fx } = pages

  useEffect(() => {
    fx.hide('loading')
  }, [])

  useEffect(() => {
    const hash = ['', '#/'].includes(qs.hash) ? env.HOME_PAGE : qs.hash

    fx.put({
      'menu.itemActive': state.menu.items.findIndex((e) => e.path === hash)
    })
  }, [qs.hash])

  return (
    <Pagex
      value={{
        context: pages,
        icons,
        i18n,
        logger: env.DEV && env.PUBLIC_LOGGER === 'true'
      }}
    >
      <Header
        style={{ height: env.HEADER_HEIGHT }}
        onClickMenu={fx.changeMenu}
      />

      <main
        className="flex"
        style={{ height: resize.height - env.HEADER_HEIGHT }}
      >
        <Menu
          value={state.menu}
          width={state.menu.show ? env.MENU_WIDTH : 0}
          resize={resize}
          onClick={fx.changeMenu}
        />

        <div ref={viewTransitionRef} className="w-full overflow-auto p-2">
          {Page && <Page qs={qs.queryString} resize={resize} />}
        </div>
      </main>

      {state.loading && <Loading />}
      <Background />
    </Pagex>
  )
}
