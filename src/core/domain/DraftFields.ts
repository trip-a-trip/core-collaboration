import { Venue } from '@trip-a-trip/lib';

export type DraftFields = Omit<Venue, 'id' | 'authorId'>;
