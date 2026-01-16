import { html } from '#/lib/view'
import { shell } from '#/lib/shell'

type Props = { message: string, stack: string }

export function error(props: Props) {
  return shell({
    title: 'Error',
    content: content(props),
  })
}

function content({ message, stack }: Props) {
  return html`<div id="root">
    <h2>${message}</h2>
    <pre>${stack}</pre>
  </div>`
}
