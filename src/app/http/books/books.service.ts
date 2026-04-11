import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateBookSchema, GetBookFilterSchema } from 'src/domain/schemas/book';
import {
  BookSearchResponse,
  GoogleBookItem,
} from 'src/domain/types/google-books';
import { env } from 'src/env/env';

import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly httpService: HttpService,
    private readonly booksRepository: BooksRepository,
  ) {}

  findAll() {
    return `This action returns all books`;
  }

  async searchExternalBooks(
    userId: string,
    filter: GetBookFilterSchema,
  ): Promise<BookSearchResponse[]> {
    const { search } = filter;
    if (!search) return [];

    const url = this.buildGoogleBooksUrl(search);

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<{ items?: GoogleBookItem[] }>(url),
      );

      if (!data.items) return [];

      const userLibrary = await this.booksRepository.findMany({
        where: {
          userId,
        },
      });

      return data.items.map((googleItem) => {
        const bookInLibrary = userLibrary.find(
          (libItem) => libItem.externalId === googleItem.id,
        );

        return {
          externalId: googleItem.id,
          title: googleItem.volumeInfo.title,
          author:
            googleItem.volumeInfo.authors?.join(', ') || 'Autor desconhecido',
          thumbnail:
            googleItem.volumeInfo.imageLinks?.thumbnail?.replace(
              'http:',
              'https:',
            ) || null,
          status: bookInLibrary?.status || 'WANT_TO_READ',
          isInLibrary: !!bookInLibrary,
        };
      });
    } catch {
      throw new InternalServerErrorException(
        'Serviço de busca de livros indisponível no momento.',
      );
    }
  }

  async addToLibrary(
    userId: string,
    { externalId, status, thumbnail, title, author }: CreateBookSchema,
  ) {
    return this.booksRepository.upsert({
      where: {
        userId_externalId: {
          userId,
          externalId,
        },
      },
      update: {
        status,
        thumbnail,
      },
      create: {
        userId,
        externalId,
        title,
        author,
        thumbnail,
        status,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  private buildGoogleBooksUrl(search: string): string {
    const apiKey = env.googleBooksApíKey;
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    return `${baseUrl}?q=${encodeURIComponent(search)}&maxResults=12&key=${apiKey}`;
  }
}
