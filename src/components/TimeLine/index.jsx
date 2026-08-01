import { css, I18n } from 'nextia'
import './style.css'

export default function Timeline({ name, className, style }) {
  return (
    <article className={css('TimeLine', className)} style={style} name={name}>
      <ul className="timeline">
        <li className="timeline-inverted">
          <div className="timeline-badge">
            2020 - <I18n value="experience.currently" />
          </div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">Software Developer</h4>
            </div>
            <div className="timeline-body">
              <h5>sinuhe.dev</h5>
              <p>
                <I18n value="experience.aa" />
              </p>
            </div>
          </div>
        </li>

        <li className="">
          <div className="timeline-badge">2019 - 2020</div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">Software Developer</h4>
            </div>
            <div className="timeline-body">
              <h5>Creze</h5>
              <p>
                <I18n value="experience.a" />
              </p>
            </div>
          </div>
        </li>

        <li className="timeline-inverted">
          <div className="timeline-badge">2016 - 2019</div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">Senior Developer</h4>
            </div>
            <div className="timeline-body">
              <h5>Deintec</h5>
              <p>
                <I18n value="experience.b" />
              </p>
            </div>
          </div>
        </li>

        <li className="">
          <div className="timeline-badge">2012 - 2016</div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">Senior Developer</h4>
            </div>
            <div className="timeline-body">
              <h5>Compartamos Banco</h5>
              <p>
                <I18n value="experience.d" />
              </p>
            </div>
          </div>
        </li>

        <li className="timeline-inverted">
          <div className="timeline-badge">2010 - 2012</div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">Junior Developer</h4>
            </div>
            <div className="timeline-body">
              <h5>Go-Sharp</h5>
              <p>
                <I18n value="experience.e" />
              </p>
            </div>
          </div>
        </li>

        <li className="">
          <div className="timeline-badge">2005 - 2010</div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4 className="timeline-title">
                <I18n value="experience.ICO" />
              </h4>
            </div>
            <div className="timeline-body">
              <p>
                <I18n value="experience.f" />
              </p>
            </div>
          </div>
        </li>
      </ul>
    </article>
  )
}
