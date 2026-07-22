import { useEffect, useRef } from 'react'
import webgl from './webgl'

export default function Holography({ value, width = '100%', height = '100%' }) {
  const canvas = useRef()

  useEffect(() => {
    webgl.action(canvas.current, width, height, {
      alpha: true
    })
    return () => {
      webgl.stop()
    }
  }, [])

  useEffect(() => {
    webgl.onChange(value)
  }, [value])

  return <canvas ref={canvas} />
}
