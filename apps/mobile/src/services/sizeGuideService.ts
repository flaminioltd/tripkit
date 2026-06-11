import { syncService } from './sync-service';
import { db } from '../db/client';
import { contentCache } from '../db/schema';
import { eq } from 'drizzle-orm';

// --- Type Definitions for Size Guides ---

export type Region = 'US' | 'UK' | 'EU' | 'JP' | 'AU' | 'IT' | 'FR';

export interface ShoeSizeChart {
  us: number[];
  uk: number[];
  eu: number[];
  jp: number[];
}

export interface ClothingSizeChart {
  label: string[]; // e.g., ['XS', 'S', 'M', 'L', 'XL']
  us: (number | string)[];
  uk: (number | string)[];
  eu: (number | string)[];
  it?: (number | string)[];
  fr?: (number | string)[];
}

export interface SizeGuidePackage {
  shoes: {
    mens: ShoeSizeChart;
    womens: ShoeSizeChart;
    kids: ShoeSizeChart;
  };
  tops: {
    mens: ClothingSizeChart;
    womens: ClothingSizeChart;
  };
  bottoms: {
    mens: ClothingSizeChart;
    womens: ClothingSizeChart;
  };
}

export class SizeGuideService {
  private PACKAGE_NAME = 'size_guides';

  /**
   * Retrieves the size guide data from the local content cache.
   */
  async getSizeGuides(): Promise<SizeGuidePackage | null> {
    return await syncService.getPackageContent<SizeGuidePackage>(this.PACKAGE_NAME);
  }

  /**
   * For testing or initial setup without a backend API:
   * Seeds the local cache with placeholder size guide data if it doesn't exist.
   */
  async seedPlaceholderDataIfEmpty(): Promise<void> {
    const existing = await this.getSizeGuides();
    if (existing) {
      return; // Already seeded
    }

    const placeholderData: SizeGuidePackage = {
      shoes: {
        mens: {
          us: [7, 8, 9, 10, 11, 12, 13],
          uk: [6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5],
          eu: [40, 41, 42.5, 44, 45, 46, 47.5],
          jp: [25, 26, 27, 28, 29, 30, 31],
        },
        womens: {
          us: [5, 6, 7, 8, 9, 10, 11],
          uk: [3, 4, 5, 6, 7, 8, 9],
          eu: [35.5, 37, 38, 39, 40.5, 42, 43],
          jp: [22, 23, 24, 25, 26, 27, 28],
        },
        kids: {
          us: [1, 2, 3, 4, 5, 6],
          uk: [13, 1, 2, 3, 4, 5],
          eu: [32, 33, 34, 35, 37, 38],
          jp: [20, 21, 21.5, 22.5, 23.5, 24.5],
        }
      },
      tops: {
        mens: {
          label: ['S', 'M', 'L', 'XL', 'XXL'],
          us: [36, 38, 40, 42, 44],
          uk: [36, 38, 40, 42, 44],
          eu: [46, 48, 50, 52, 54],
          it: [46, 48, 50, 52, 54],
          fr: [46, 48, 50, 52, 54],
        },
        womens: {
          label: ['XS', 'S', 'M', 'L', 'XL'],
          us: [2, 4, 6, 8, 10],
          uk: [6, 8, 10, 12, 14],
          eu: [34, 36, 38, 40, 42],
          it: [38, 40, 42, 44, 46],
          fr: [34, 36, 38, 40, 42],
        },
        kids: {
          label: ['4-5', '6-7', '8-9', '10-11', '12-13'],
          us: [4, 6, 8, 10, 12],
          uk: [4, 6, 8, 10, 12],
          eu: [104, 116, 128, 140, 152],
          it: [104, 116, 128, 140, 152],
          fr: [104, 116, 128, 140, 152],
        }
      },
      bottoms: {
        mens: {
          label: ['S', 'M', 'L', 'XL', 'XXL'],
          us: [30, 32, 34, 36, 38],
          uk: [30, 32, 34, 36, 38],
          eu: [40, 42, 44, 46, 48],
          it: [46, 48, 50, 52, 54],
          fr: [40, 42, 44, 46, 48],
        },
        womens: {
          label: ['XS', 'S', 'M', 'L', 'XL'],
          us: [2, 4, 6, 8, 10],
          uk: [6, 8, 10, 12, 14],
          eu: [34, 36, 38, 40, 42],
          it: [38, 40, 42, 44, 46],
          fr: [36, 38, 40, 42, 44],
        },
        kids: {
          label: ['4-5', '6-7', '8-9', '10-11', '12-13'],
          us: [4, 6, 8, 10, 12],
          uk: [4, 6, 8, 10, 12],
          eu: [104, 116, 128, 140, 152],
          it: [104, 116, 128, 140, 152],
          fr: [104, 116, 128, 140, 152],
        }
      }
    };

    const contentString = JSON.stringify(placeholderData);
    
    // Using a quick MD5 or just a random hash for placeholder
    const mockHash = "mock-hash-12345";

    await db.insert(contentCache).values({
      packageName: this.PACKAGE_NAME,
      version: '1.0.0',
      hash: mockHash,
      content: contentString,
      updatedAt: new Date(),
    });
  }
}

export const sizeGuideService = new SizeGuideService();
