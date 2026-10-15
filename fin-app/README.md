# Fin

A phone home-screen app with two tabs:

- **Tasks** – a live view of the private "Fin To-Do Tracker" Google Sheet (read and written through the viewer's Google Sheets connector, refreshed about every minute). Add tasks with a priority (Urgent / Normal / Someday) and tick them off; changes land in the sheet. The finance agents add their action items to the same sheet, marked "From FinBot".
- **Budget** – cash available vs. bills due before the next payday, the shortfall or cushion, accounts, and alerts that need attention. Filled in each day from the FinBot audit.

## Where the data lives

This repository is public, so **no financial data is stored here**. `index.html` is only the page source. It runs as a private claude.ai artifact and keeps the budget in that artifact's private database. Tasks live in the owner-only Google Sheet, columns A Done, B Task, C Priority, D Due, E Source, F Added, G Completed, H Fin ID.

| Path | Contents |
| --- | --- |
| `budget/latest` | `{ asOf, source, payday, cashAvailable, accounts[], due[], alerts[] }` |

`accounts[]`: `{ name, type: "cash"\|"credit", available?, current?, balance?, limit? }`
`due[]`: `{ name, amount, date?: "YYYY-MM-DD", status?: "overdue", note? }`
`alerts[]`: `{ priority: "high"\|"medium"\|"low"\|"info", title, detail? }`

## Add to home screen

Open the artifact link on your phone while signed in to claude.ai, then:

- **iPhone (Safari):** Share → Add to Home Screen.
- **Android (Chrome):** ⋮ menu → Add to Home screen.

Append `#tasks` or `#budget` to the link before adding it to make a shortcut that opens straight to that tab.
