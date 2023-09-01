import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksService', () => {
  let booksService: BooksService;
  let bookRepository: Repository<Book>;

  const mockBookRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        description: 'A test book',
        authorName: 'Test Author',
      };

      const createdBook: Book = {
        id: 1,
        ...createBookDto,
        publicationDate: new Date(),
        arrivalDate: new Date(),
        reservedByUser: null,
      };

      mockBookRepository.create.mockReturnValue(createdBook);
      mockBookRepository.save.mockResolvedValue(createdBook);

      const result = await booksService.createBook(createBookDto);

      expect(result).toEqual(createdBook);
    });
  });
  describe('getBooks', () => {
    it('should return an array of books', async () => {
      const mockBook = (id: number) => { 
        const createdBook: Book = {
          id: id,
          title: 'Test Book',
          description: 'A test book',
          authorName: 'Test Author',
          publicationDate: new Date(),
          arrivalDate: new Date(),
          reservedByUser: null,
        };
        return createdBook;
      }

      const mockBooks: Book[] = [
        mockBook(1),
        mockBook(2),
      ];

      mockBookRepository.find.mockResolvedValue(mockBooks);

      const result = await booksService.getBooks();

      expect(result).toEqual(mockBooks);
    });
  });

  describe('getBook', () => {
    it('should return a book by ID', async () => {
      const mockBook: Book = {
        id: 1,
        title: 'Test Book',
        description: 'A test book',
        authorName: 'Test Author',
        publicationDate: new Date(),
        arrivalDate: new Date(),
        reservedByUser: null,
      };

      mockBookRepository.findOne.mockResolvedValue(mockBook);

      const result = await booksService.getBook(1);

      expect(result).toEqual(mockBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const deleteResult = {
        affected: 1, // Número de registros eliminados
      };

      mockBookRepository.delete.mockResolvedValue(deleteResult);

      const result = await booksService.deleteBook(1);

      expect(result).toEqual(deleteResult);
    });
  });

  describe('updateBook', () => {
    it('should update a book by ID', async () => {
      const updateBookDto: UpdateBookDto = {
        // Datos de actualización aquí
      };

      const updateResult = {
        affected: 1, // Número de registros actualizados
      };

      mockBookRepository.update.mockResolvedValue(updateResult);

      const result = await booksService.updateBook(1, updateBookDto);

      expect(result).toEqual(updateResult);
    });
  });

  // Add more test cases for other methods in a similar manner
});
