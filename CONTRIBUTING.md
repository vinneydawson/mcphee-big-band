# Contributing

## Branching

`main` is the integration branch. Do not commit to it directly — open a pull request.

Branch names: `feat/<short-description>`, `fix/<short-description>`, `chore/<short-description>`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`.
Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`.

## Pull requests

- **Squash merge only.** Merge commits and rebase merges are disabled, so `main` stays linear
  and one PR lands as one commit.
- Keep PRs focused. If a PR does two unrelated things, split it.
- Fill out the PR template. Say how you verified the change — "it builds" is not verification.
- At least one approving review before merge.

> Review and linear-history rules are currently **convention, not enforcement**: branch protection
> requires a paid GitHub plan and this repo is private on the free tier. Treat them as binding
> anyway; they become enforced the moment the plan is upgraded.

## Local setup

See `README.md`.

## Review expectations

- Reviewers respond within one business day.
- Authors resolve or reply to every comment before merging.
