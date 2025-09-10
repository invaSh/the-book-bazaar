import React from 'react';
import BooksList from './BooksList';
import BookDetails from './BookDetails';

const BooksSection = ({ books, selectedBook, onSelectBook }) => (
  <div className="bg-white/50 backdrop-blur-sm rounded-4xl overflow-hidden mb-8 p-4 sm:p-6 lg:p-10">
    {books.length > 0 ? (
      <div className="flex flex-col lg:flex-row gap-8">
        <BooksList 
          books={books} 
          selectedBook={selectedBook} 
          onSelectBook={onSelectBook} 
        />
        <BookDetails selectedBook={selectedBook} />
      </div>
    ) : (
      <div className="text-center">
        This marketplace has no books. Click on "Add Book" to get started.
      </div>
    )}
  </div>
);

export default BooksSection;