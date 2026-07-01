# Content Guidelines

Standards for writing lessons on NAVBC Learn.

## Required frontmatter

| Field | Description |
|-------|-------------|
| `title` | Lesson title |
| `description` | 1–2 sentences for SEO |
| `duration` | Minutes (number) |
| `difficulty` | `beginner`, `intermediate`, `advanced` |
| `objectives` | Array of learning outcomes |

## Code examples

```mdx
\`\`\`al title="Customer.Table.al"
table 50100 "Customer Bonus" { }
\`\`\`
```

## Callouts

```mdx
<Callout type="tip">Helpful advice</Callout>
```

Types: `info`, `tip`, `warning`, `note`

## Checklist before PR

- [ ] Lesson slug added to `course.json`
- [ ] Frontmatter complete
- [ ] `npm run build` passes
- [ ] Previewed with `npm run dev`
