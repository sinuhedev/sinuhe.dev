function changeI18n({ payload, put }) {
  const { val } = payload.target
  put({ i18n: val })
  window.localStorage.setItem('i18n', val)
}

function changeMenu({ state, put }) {
  const val = !state.menu.show
  put({ 'menu.show': val })
  window.localStorage.setItem('menu', val)
}

export default {
  changeI18n,
  changeMenu
}
