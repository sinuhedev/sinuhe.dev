import i18n from 'assets/i18n.json'
import icons from 'assets/icons.svg' with { type: 'text' }
import { Background, Header, Loading, Menu, Translate } from 'components'
import { Pagex, useFx, usePage, useQueryString } from 'nextia'
import { useEffect, useRef } from 'react'
import { env, getMenu } from 'utils'
import functions from './functions'

const PAGES = {
  about: () => import('./about/index.jsx'),
  cards: () => import('./cards/index.jsx'),
  'cube-3d': () => import('./cube-3d/index.jsx'),
  experience: () => import('./experience/index.jsx'),
  'open-source': () => import('./open-source/index.jsx'),
  projects: () => import('./projects/index.jsx'),
  skills: () => import('./skills/index.jsx'),
  //
  notFound: () => import(`./not-found.jsx`)
}

export default function App() {
  const pages = useFx(
    {
      i18n: window.localStorage.getItem('i18n') ?? i18n.defaultLocale,
      loading: true,
      menu: {
        show: getMenu(),
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

  const qs = useQueryString()
  const { state, fx } = pages
  const viewTransitionRef = useRef()

  const Page = usePage({
    hashPage: qs.hash,
    homePage: env.HOME_PAGE,
    currentPage: (path) => PAGES[path.join('/')] ?? PAGES.notFound,
    viewTransition: viewTransitionRef,
    viewTransitionName: env.VIEW_TRANSITION_NAME
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
