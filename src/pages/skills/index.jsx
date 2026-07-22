import apiImg from 'assets/img/holography/api.webp'
import cgiImg from 'assets/img/holography/cgi.webp'
import cloudImg from 'assets/img/holography/cloud.webp'
import dbImg from 'assets/img/holography/db.webp'
import osImg from 'assets/img/holography/os.webp'
import webImg from 'assets/img/holography/web.webp'
import { Button, Holography } from 'components'
import { useFx } from 'nextia'
import functions from './functions'
// import { Suspense, useEffect } from 'react'
// import {  Loading } from 'components'

export default function SkillsPage() {
  const { state, fx } = useFx(functions, (initialState) => {
    initialState.img = osImg
    return initialState
  })

  return (
    <section className="h-3/4 flex flex-col items-center justify-center">
      <Holography value={state.img} width="100%" height="100%" />

      <div className="flex flex-wrap justify-center gap-7 mt-10">
        <Button onClick={() => fx.put({ img: osImg })}>OS</Button>
        <Button onClick={() => fx.put({ img: cloudImg })}>Cloud</Button>
        <Button onClick={() => fx.put({ img: dbImg })}>DB</Button>
        <Button onClick={() => fx.put({ img: apiImg })}>API</Button>
        <Button onClick={() => fx.put({ img: webImg })}>WEB</Button>
        <Button onClick={() => fx.put({ img: cgiImg })}>CGI</Button>
      </div>
    </section>
  )
}
