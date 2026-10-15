# Fin

A phone home-screen app with two tabs:

- **Tasks** – a to-do list. Add tasks with a priority (Urgent / Normal / Someday), tick them off, delete them. FinBot also adds the action items from its morning `[FIN]` audit, marked "From FinBot".
- **Budget** – cash available vs. bills due before the next payday, the shortfall or cushion, accounts, and alerts that need attention. Filled in each day from the FinBot audit.

## Where the data lives

This repository is public, so **no financial data is stored here**. `index.html` is only the page source. It runs as a private claude.ai artifact and reads/writes its data in that artifact's private database:

| Path | Contents |
| --- | --- |
| `tasks/<id>` | `{ text, done, priority: "high"\|"normal"\|"low", source: "me"\|"finbot", due?: "YYYY-MM-DD", createdAt, doneAt? }` |
| `budget/latest` | `{ asOf, source, payday, cashAvailable, accounts[], due[], alerts[] }` |

`accounts[]`: `{ name, type: "cash"\|"credit", available?, current?, balance?, limit? }`
`due[]`: `{ name, amount, date?: "YYYY-MM-DD", status?: "overdue", note? }`
`alerts[]`: `{ priority: "high"\|"medium"\|"low"\|"info", title, detail? }`

## Add to home screen

Open the artifact link on your phone while signed in to claude.ai, then:

- **iPhone (Safari):** Share → Add to Home Screen.
- **Android (Chrome):** ⋮ menu → Add to Home screen.

Append `#tasks` or `#budget` to the link before adding it to make a shortcut that opens straight to that tab.
