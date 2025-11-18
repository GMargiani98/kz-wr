import { scrapeKreedz } from '../scrapers/kreedz.js';
import { scrapeKzRush } from '../scrapers/kz-rush.js';
import { displayRecord } from '../utils/cli-formatting.js';
import type { ScraperResult } from '../types/index.js';

interface RecordOptions {
  cp?: boolean;
}

export async function recordCommand(
  mapName: string,
  options: RecordOptions
): Promise<void> {
  try {
    const mode = options.cp ? 'cp' : 'non-cp';

    let result: ScraperResult = await scrapeKreedz(mapName.trim(), mode);

    if (!result) {
      result = await scrapeKzRush(mapName.trim(), mode);
    }

    if (!result) {
      console.log(
        `No records found for map: ${mapName} (${mode.toUpperCase()})`
      );
      return;
    }

    const recordData: Record<string, string | null> = {
      mapName: result.mapName,
      playerName: result.playerName,
      time: result.time,
      youtubeLink: result.youtubeLink,
      difficulty: result.difficulty,
      downloadLink: result.downloadLink,
    };

    displayRecord(recordData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
