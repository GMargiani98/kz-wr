export function verticalSpace(lines: number = 1): void {
  const lineCount = typeof lines === 'number' && lines > 0 ? lines : 1;
  console.log('\n'.repeat(lineCount - 1));
}

export function horizontalLine(): void {
  const width = process.stdout.columns || 80;
  const line = '─'.repeat(width);
  console.log(line);
}

export function centered(str: string = ''): void {
  const text =
    typeof str === 'string' && str.trim().length > 0 ? str.trim() : '';
  const width = process.stdout.columns || 80;
  const leftPadding = Math.floor((width - text.length) / 2);
  const line = ' '.repeat(Math.max(0, leftPadding)) + text;
  console.log(line);
}

export function centeredBox(str: string = '', padding: number = 2): void {
  const text =
    typeof str === 'string' && str.trim().length > 0 ? str.trim() : '';
  const width = process.stdout.columns || 80;
  const boxWidth = Math.min(width - 4, text.length + padding * 2 + 2);

  const horizontalLineStr = '─'.repeat(boxWidth);
  const paddedText = ' '.repeat(padding) + text + ' '.repeat(padding);
  const leftPadding = Math.floor((width - boxWidth) / 2);

  const leftSpace = ' '.repeat(Math.max(0, leftPadding));

  console.log(`${leftSpace}┌${horizontalLineStr}┐`);
  console.log(`${leftSpace}│${paddedText}│`);
  console.log(`${leftSpace}└${horizontalLineStr}┘`);
}

export function displayRecord(record: Record<string, string | null>): void {
  horizontalLine();
  centered('KZ World Record');
  horizontalLine();
  verticalSpace(2);

  for (const key in record) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      let line = '      \x1b[33m' + key + '      \x1b[0m';
      const padding = 60 - line.length;

      for (let i = 1; i < padding; i++) {
        line += ' ';
      }

      line += value ?? 'N/A';
      console.log(line);
      verticalSpace();
    }
  }

  verticalSpace();
  horizontalLine();
}
