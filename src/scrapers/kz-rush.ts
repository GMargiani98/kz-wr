import * as cheerio from 'cheerio';
import type { ScraperResult } from '../types/index.js';

interface KzRushRawRecord {
  mapName: string;
  mapUrl: string;
  time: string;
  player: string;
  downloadLink: string;
  youtubeLink: string | null;
}

type KzMode = 'cp' | 'non-cp';

async function scrapeKzRushEndpoint(
  url: string,
  mapName: string
): Promise<KzRushRawRecord | null> {
  try {
    const listResponse = await fetch(url);

    if (!listResponse.ok) {
      return null;
    }

    const listHtml = await listResponse.text();
    const $ = cheerio.load(listHtml);

    let foundRecord: KzRushRawRecord | null = null;

    $('#maps-table-id tr').each((_, row) => {
      const td = $(row).find('td');

      const name = td.eq(0).find('a').first().text().trim();

      if (name === mapName) {
        const mapUrl =
          'https://kz-rush.ru' + td.eq(0).find('a').first().attr('href');
        const downloadHref = td.eq(4).find('a').eq(0).attr('href');
        const youtubeHref = td.eq(4).find('a').eq(1).attr('href');

        foundRecord = {
          mapName: name,
          mapUrl,
          time: td.eq(1).text().trim(),
          player: td.eq(2).find('a').text().trim(),
          downloadLink: downloadHref
            ? 'https://kz-rush.ru' + downloadHref
            : 'N/A',
          youtubeLink: youtubeHref || null,
        };

        return false;
      }
    });

    return foundRecord;
  } catch (error) {
    console.error('Error scraping KZ-Rush endpoint:', url, error);
    return null;
  }
}

export async function scrapeKzRush(
  mapName: string,
  mode: KzMode = 'non-cp'
): Promise<ScraperResult> {
  try {
    const endpoint =
      mode === 'cp'
        ? 'https://kz-rush.ru/en/records/maps/cp'
        : 'https://kz-rush.ru/en/records/maps/noncp';

    const firstRecord = await scrapeKzRushEndpoint(endpoint, mapName);

    if (!firstRecord) {
      console.log(
        `No records found for map: ${mapName} on KZ-Rush (${mode.toUpperCase()})`
      );
      return null;
    }

    const mapDetailsUrl = `https://kz-rush.ru/en/maps/cs16/${mapName}`;
    const detailsResponse = await fetch(mapDetailsUrl);

    let difficulty = 'N/A';

    if (detailsResponse.ok) {
      const detailsHtml = await detailsResponse.text();
      difficulty = extractDifficulty(detailsHtml);
    }

    return {
      mapName: firstRecord.mapName,
      playerName: firstRecord.player || 'N/A',
      time: firstRecord.time || 'N/A',
      youtubeLink: firstRecord.youtubeLink,
      difficulty,
      downloadLink:
        firstRecord.downloadLink === 'N/A' ? null : firstRecord.downloadLink,
    };
  } catch (error) {
    console.error('Error in scrapeKzRush:', error);
    return null;
  }
}

function extractDifficulty(html: string): string {
  const $$ = cheerio.load(html);
  const labels = ['Difficulty', 'Сложность'];

  const span = $$('span.mapsinfo-subheader').filter((_, el) =>
    labels.includes($$(el).text().trim())
  );

  if (span.length === 0) return 'N/A';

  const td = span.parent();

  const value = td
    .contents()
    .filter((_, node) => node.type === 'text')
    .text()
    .trim();

  const translations: Record<string, string> = {
    'Экстремальная-Смертельная': 'Extreme-Death',
    'Легкая-Средняя': 'Easy-Average',
    Легкая: 'Easy',
    Средняя: 'Average',
    'Средняя-Сложная': 'Average-Hard',
    Сложная: 'Hard',
    'Сложная-Экстремальная': 'Hard-Extreme',
    Экстремальная: 'Extreme',
    Смертельная: 'Death',
  };

  return translations[value] || value || 'N/A';
}
