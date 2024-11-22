import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Array<{ title: string; image: string }> = []; 
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  loadBooks() {
    const bookIds = '20,2,3,4,6,8,9,10,200,900,10000';
    
    const booksUrl = `https://gutendex.com/books?ids=${bookIds}`;
    this.http.get(booksUrl).subscribe({
      next: (response: any) => {
        const bookData = response.results;

        bookData.forEach((book: any) => {
          const isRobot = Math.random() < 0.5; 

          if (isRobot) {
            const robotImage = `https://robohash.org/${book.id}`;
            this.books.push({ title: book.title, image: robotImage });
          } else {
            this.http
              .get('https://dog.ceo/api/breeds/image/random')
              .subscribe((dogResponse: any) => {
                const dogImage = dogResponse.message;
                this.books.push({ title: book.title, image: dogImage });
              });
          }
        });
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }
}
