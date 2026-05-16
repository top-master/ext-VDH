# Clean-Room Status

This repository still keeps compatibility shims for upstream pages.

The repository ships a shared runtime option named `cleanroom.isNotCleanRoom`,
and that option defaults to `false`.

When the option remains `false`:

- The shared guard blocks attempts to reach original VDH URLs through `fetch`, `window.open`, anchor clicks, tab or window creation, and `weh.rpc.call("goto", ...)`.
- Our `cleanroom-shared.js` helper provides clean-room alternatives and overrides the legacy upstream URLs, product labels, file names, and help links.

The option could be set to `true`, and
in that case we would have following non-clean-room things:

- Legacy upstream branding would become active again.

## Audit Command

Run:

```powershell
corepack yarn test:cleanroom
```

The audit reports direct upstream fingerprints that should be removed before calling the project clean-room.
