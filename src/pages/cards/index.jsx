import character from 'assets/img/cards/github/character.webp'
import cover from 'assets/img/cards/github/cover.webp'
import github from 'assets/img/cards/github/title.webp'
import character2 from 'assets/img/cards/linkedin/character.webp'
import cover2 from 'assets/img/cards/linkedin/cover.webp'
import linkedin from 'assets/img/cards/linkedin/title.webp'

import { Card } from 'components'

export default function CardsPage() {
  return (
    <section className="h-full flex flex-col justify-center">
      <div className="flex flex-wrap justify-center gap-30">
        <Card
          href="https://github.com/sinuhedev"
          cover={cover}
          title={github}
          character={character}
        />

        <Card
          href="https://linkedin.com/in/sinuhedev"
          cover={cover2}
          title={linkedin}
          character={character2}
        />
      </div>
    </section>
  )
}
