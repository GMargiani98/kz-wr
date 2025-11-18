# kz-wr

A CLI tool for looking up KZ (CS1.6) world records from Kreedz.com and KZ-Rush.ru.

## Installation

Install globally via npm:

```bash
npm install -g kz-wr
```

## Usage

### Look up a world record (Non-CP by default)

```bash
kz-wr record <mapName>
```

Example:

```bash
kz-wr record arte_mon
```

### Look up a CP (checkpoint) record

```bash
kz-wr record <mapName> --cp
```

Example:

```bash
kz-wr record all1_unusually_x_fix --cp
```

### Show help

```bash
kz-wr help
kz-wr --help
```

## What is CP vs Non-CP?

- **Non-CP**: Records set without using checkpoints (more difficult)
- **CP**: Records set using checkpoints (allows saves during the run)

## Data Sources

- Primary: [Kreedz.com](https://kreedz.com)
- Fallback: [KZ-Rush.ru](https://kz-rush.ru)

## Features

- ✅ Search both CP and Non-CP records
- ✅ Beautiful terminal output
- ✅ Displays: player name, time, difficulty, YouTube links, download links
- ✅ TypeScript for type safety

## Development

```bash
# Clone the repo
git clone <your-repo-url>
cd kz-wr

# Install dependencies
npm install

# Run in development mode
npm run dev -- record <mapName>

# Build
npm run build

# Type check
npm run typecheck
```

## License

MIT

## Author

Giorgi Margiani
