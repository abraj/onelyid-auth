import { html } from '#/lib/view'
import { shell } from '#/lib/shell'

type Props = { user?: null }

export function home(props: Props) {
  return shell({
    title: 'Home',
    content: content(props),
  })
}

function content({ user }: Props) {
  return html`<div id="root">
    <div id="header">
      <h1>onely<span class="onelyid">id</span></h1>
      <p>Permissionless Identity.</p>
    </div>
    <div class="container">
      <div class="card">
        ${user 
          ? html`<form action="/logout" method="post" class="session-form">
              <div>
                Hi, <strong>@${user || 'friend'}</strong>. 
                Hope you’re having a great day!
              </div>
              <div>
                <button type="submit">Log out</button>
              </div>
            </form>` 
          : html`<div class="session-form">
              <div><a href="/login">Log in</a> to continue!</div>
              <div>
                <a href="/login" class="button">Log in</a>
              </div>
            </div>`}
      </div>
    </div>
  </div>`
}
