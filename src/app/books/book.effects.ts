import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookActions from './book.actions';
import { BookService } from '../book/book.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class BookEffects {
    //effect respond to  'AddBook' actions
    addBook$ = createEffect(()=> this.actions$.pipe(
        
        ofType(bookActions.AddBook),

        //listen for actions of type 'AddBook'
        // merge map allow multiple concurrent 'addBook' call 
        mergeMap((action) => this.bookService.addBook(action)
        .pipe(

            //if 'addBook' call is successful, dispatch 'AddBookSuccess' action with the book data
            map(book => bookActions.AddBookSuccess(book)),
            // if call fail, dispatch 'AddBookFailure' action with the error
            catchError((error) => of(bookActions.AddBookFailure({error})))
        ))
    )); 

    constructor(private actions$:Actions,
        private bookService: BookService) {
    }
}