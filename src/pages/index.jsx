import i18n from 'assets/i18n.json'
import icons from 'assets/icons.svg?raw'
import { Background, Header, Loading, Menu } from 'components'
import { Pagex, useFx, usePage } from 'nextia'
import { useEffect, useRef } from 'react'
import { env } from 'utils'
import functions from './functions'

export default function App() {
  const pages = useFx(
    {
      i18n: window.localStorage.getItem('i18n'),
      loading: true,
      menu: {
        show: localStorage.getItem('menu') !== 'false',
        itemActive: 0,
        items: [
          { path: '#/about', name: 'menu.pages.aboutMe' },
          { path: '#/experience', name: 'menu.pages.experience' },
          { path: '#/skills', name: 'menu.pages.skills' },
          { path: '#/cards', name: 'menu.pages.freelance' },
          { path: '#/projects', name: 'menu.pages.projects' },
          { path: '#/open-source', name: 'menu.pages.openSource' }
        ]
      }
    },
    functions
  )

  const { state, fx, qs } = pages

  const viewTransitionRef = useRef()
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
        i18n
      }}
    >
      <div className="flex flex-col h-full">
        <Header
          style={{ height: env.HEADER_HEIGHT }}
          onClickMenu={fx.changeMenu}
        />

        <main className="flex-1 flex overflow-hidden">
          <Menu
            value={state.menu}
            width={state.menu.show ? env.MENU_WIDTH : 0}
            onClick={fx.changeMenu}
          />

          <div ref={viewTransitionRef} className="flex-1 overflow-auto p-2">
            {Page && <Page />}
          </div>
        </main>
      </div>

      {state.loading && <Loading />}
      <Background />
    </Pagex>
  )
}
