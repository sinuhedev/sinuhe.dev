const initialState = {
  i18n: window.localStorage.getItem('i18n'),
  loading: true,
  menu: {
    show: true,
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
}

function changeI18n({ payload, put }) {
  const { val } = payload.target
  put({ i18n: val })
  window.localStorage.setItem('i18n', val)
}

export default {
  initialState,
  changeI18n
}
