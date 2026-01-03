import { html } from '#/lib/view'
import { shell } from '#/lib/shell'

type Props = {}

export function home(props: Props) {
  return shell({
    title: 'Home',
    content: content(props),
  })
}

function content(props: Props) {
  return html`<div id="root">
    <div id="header">
      <h1>onely<span class="onelyid">id</span></h1>
      <p>Permissionless Identity.</p>
    </div>
  </div>`
}
