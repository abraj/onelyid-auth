import type { LoginPageProps } from '@onelyid/client'
import { html } from '#/lib/view'
import { shell } from '#/lib/shell'
import { escapeHtml } from '#/utils'

type Props = Partial<LoginPageProps> & { error?: string }

export function login(props: Props) {
  return shell({
    title: 'Log in',
    content: content(props),
  })
}

function content({ redirectUrl, authActioUrl, requestMode, error }: Props) {
  return html`<div id="root">
    <div id="header">
      <h1>onely<span class="onelyid">id</span></h1>
      <p>Permissionless Identity.</p>
    </div>
    <div class="container">
      <form action="${authActioUrl}" method="post" class="login-form">
        <input
          type="text"
          name="handle"
          placeholder="Enter your handle (eg alice.bsky.social)"
          required
        />
        ${redirectUrl ? html`<input type="hidden" name="redirectUrl" value="${escapeHtml(redirectUrl)}">` : undefined}
        ${requestMode && requestMode !== 'prod' ? html`<input type="hidden" name="requestMode" value="${escapeHtml(requestMode)}">` : undefined}
        <button type="submit">Log in</button>
        ${error ? html`<p>Error: <i>${error}</i></p>` : undefined}
      </form>
      <div class="signup-cta">
        Don't have an account on the Atmosphere?
        <a href="https://bsky.app">Sign up for Bluesky</a> to create one now!
      </div>
    </div>
  </div>`
}
