# Publishing Guide

## Prerequisites

1. Have an npm account (sign up at https://www.npmjs.com/signup)
2. Login to npm:

```bash
   npm login
```

## Publishing Steps

1. **Make sure everything is committed:**

```bash
   git status
```

2. **Run tests and build:**

```bash
   npm run typecheck
   npm run build
```

3. **Test locally by installing globally:**

```bash
   npm link
   kz-wr record arte_mon
   npm unlink -g kz-wr
```

4. **Publish to npm:**

```bash
   npm publish
```

5. **Tag the release on GitHub:**

```bash
   git tag v1.0.0
   git push origin v1.0.0
```

## Updating Versions

- Patch (bug fixes): `npm version patch` → 1.0.1
- Minor (new features): `npm version minor` → 1.1.0
- Major (breaking changes): `npm version major` → 2.0.0

Then run `npm publish` again.

## Verify Installation

After publishing:

```bash
npm install -g kz-wr
kz-wr record arte_mon
```
