import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetBookFilterSchema } from 'src/domain/schemas/book';
import {
  BookSearchResponse,
  GoogleBookItem,
} from 'src/domain/types/google-books';

import { CreateBookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}
  create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async searchExternalBooks(
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

      return data.items.map((book) => this.mapToResponse(book));
    } catch {
      throw new InternalServerErrorException(
        'Serviço de busca de livros indisponível no momento.',
      );
    }
  }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  private buildGoogleBooksUrl(search: string): string {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    return `${baseUrl}?q=${encodeURIComponent(search)}&maxResults=12&key=${apiKey}`;
  }

  private mapToResponse(book: GoogleBookItem): BookSearchResponse {
    const info = book.volumeInfo;

    return {
      externalId: book.id,
      title: info.title,
      author: info.authors?.join(', ') || 'Autor desconhecido',
      thumbnail: info.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    };
  }
}
