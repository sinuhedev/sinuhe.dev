import { useEffect, useRef } from 'react'
import webgl from './webgl'

export default function Cube({ width, height }) {
  const canvas = useRef()

  useEffect(() => {
    webgl.action(canvas.current, width, height, {
      alpha: true
    })
    return () => {
      webgl.stop()
    }
  }, [])

  return <canvas ref={canvas} />
}
