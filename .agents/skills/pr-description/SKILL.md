---
name: pr-description
description: Draft a concise, factual pull request description from the current diff. Use when the user asks to create, edit, or review a PR description.
disable-model-invocation: true
---

# Pull request descriptions

Read the current diff and any directly relevant issue or request before writing.

Write a title and one to four flat bullets. Each bullet must name a concrete change and, where useful, why it was made. Use inline code for files, APIs, commands, or configuration keys.

Do not add headings, templates, tables, a testing section, metrics, filler, or a generic conclusion. Do not claim behavior, motivation, or validation that the diff and supplied context do not support. Do not mention linting, tests, type checks, or builds unless the user explicitly asks.

If the change is too broad to describe accurately, ask one focused question instead of guessing.
