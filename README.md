# onelyid-auth

**.env**  
_localhost:_ NODE_ENV (development), PORT (8080), PUBLIC_URL('')  
_production:_ NODE_ENV (production), PORT (?), PUBLIC_URL(https://auth.example.app), COOKIE_SECRET, STATE_SECRET  

**Start server**
- `cp .env.template .env` and update keys `PUBLIC_URL`, `COOKIE_SECRET`, `STATE_SECRET`, `NODE_ENV`, `PORT`
- [_dev_] `npm run dev`
- [_prod_] `npm run deploy`
- `npm run pm2:stop`
- `pm2 ls`

### TODO

Account management interface on the reference PDS implementation 
- https://pds.me/account

TypeScript OAuth Authorization server implementation (`@atproto/oauth-provider`) 
- https://chatgpt.com/c/695a7b54-b934-8322-8dc3-1d3cc3514c6d

- Is restore session supposed to be that slow??
    * compare w/ statusphere reference impl.
    * user table cache needed?

- Common errors:
	* OAuthCallbackError: Failed to resolve OAuth server metadata for resource: https://blewit.us-west.host.bsky.network/

**ENS support:**
- eth.link, eth.limo, eth.box, pds.me
- .eth -> pds.me (canonical) --> eth.link / eth.limo / eth.box
