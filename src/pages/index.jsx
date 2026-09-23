import i18n from 'assets/i18n.json'
import icons from 'assets/icons.svg?raw'
import { Background, Header, Loading, Menu, Translate } from 'components'
import { Pagex, useFx, usePage, useQueryString } from 'nextia'
import { useEffect, useRef } from 'react'
import { env } from 'utils'
import functions from './functions'

const PAGES = import.meta.glob('./**/index.jsx')
const IS_MENU = window.localStorage.getItem('menu')

export default function App() {
  const pages = useFx(
    {
      i18n: window.localStorage.getItem('i18n') ?? i18n.defaultLocale,
      loading: true,
      menu: {
        show: IS_MENU && IS_MENU !== 'false',
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

  const { state, fx } = pages
  const qs = useQueryString()
  const viewTransitionRef = useRef()
  const Page = usePage({
    hash: qs.hash,
    homePage: env.HOME_PAGE,
    importPage: (path) => {
      const key = `./${path.join('/')}/index.jsx`
      const currentPage = PAGES[key]

      if (!currentPage) return import('./not-found.jsx')
      return currentPage()
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
        >
          <Translate
            value={state.i18n}
            onChange={fx.changeI18n}
            locales={i18n.locales}
          />
        </Header>

        <main className="flex-1 flex overflow-hidden">
          <Menu
            value={state.menu}
            width={state.menu.show ? env.MENU_WIDTH : 0}
            onClick={fx.changeMenu}
          />

          <div ref={viewTransitionRef} className="flex-1 overflow-auto p-2">
            {Page && <Page context={pages} qs={qs} />}
          </div>
        </main>
      </div>

      {state.loading && <Loading />}
      <Background />
    </Pagex>
  )
}
