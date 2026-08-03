import { env } from 'utils'

export default function AboutPage() {
  const V = env.VERSION

  return (
    <section className="min-h-3/4 flex flex-col items-center justify-center">
      <img src="logo.svg" className="w-48" alt="logo" />
      <h1>Sinuhe Maceda</h1>
      <br />
      <h5>Software Developer</h5>
      <h5>sinuhe.dev@gmail.com</h5>

      <small className="mute-version mt-5">
        v{V.version} | #{V.commit} | {V.env}
      </small>
      <small className="mute-version">{V.date}</small>
    </section>
  )
}
