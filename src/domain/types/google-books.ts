import { BookStatus } from '../schemas/book';

export interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface GoogleBooksResponse {
  items?: GoogleBookItem[];
}

export interface BookSearchResponse {
  externalId: string;
  title: string;
  author: string;
  thumbnail: string | null;
  status: BookStatus;
  isInLibrary: boolean;
}
