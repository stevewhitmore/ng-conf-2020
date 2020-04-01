# Learn NgRx from the Creators of NgRx

NgRx takes concepts we're already familiar with and builds them up into a framework.

```typescript
@Component({
  ...
  template: `
    <search-movies-box (search)="onSearch($event)"></search-movies-box>
    <movies-list [movies]="movies"></movies-list>
  `
})
class searchMoviesPageComponent {
  movies: Movie[] = [];

  onSearch(searchTerm: string) {
    this.moviesService.findMovies(searchTerm)
      .subscribe(movies => {
        this.movies = movies;
      });
  }
}
```

`[movies]="movies"` and `movies: Movie[] = [];` is State

`(search)="onSearch($event)"` and the `onSearch` method is a Side Effect

What happens inside `onSearch` is a State Change

## NgRx Mental Model

### State flows down, changes flow up

A parent component:

- Connects data to components
- Triggers die effects
- Handles state transitions

Does the child component know who's passing it things? Who's listening to its output? No.

There is indirection between consumer of state, how state changes, and side effects.

### Select and Dispatch are special versions of Input and Output

> Actions are like the global @Output() of your whole app while Selectors are the global @Input() of your whole app

NgRx takes the state out of the local scope for components and pulls them into a global scope for the whole app.

#### Responsibilities

- Containers connect data to components
- Effects triggers side effects
- Reducers handle state transitions

### Delegate responsibilities to individual modules of code

- State flows down, changes flow up
- Indirection between state & consumer
- Select & Dispatch => Input & Output
- Adhere to single responsibility principle

## Actions

- Unified interface to describe events
- Just data, no functionality
- Has at a minimum a type property
- Strongly typed using classes and enums

```typescript
{
  type: "[Movies Page] Select Movie",
  movie: MovieModel
}
```

### Good Action Hygene

- Unique events get unique actionsundefined
- Actions are never reused

`createAction()` is a new method for NgRx that enforces this

```typescript
export const createMovie = createAction(
  '[Movies Page] Create Movie',
  props<{ movie: MovieRequredProps }>()
);

...

store.dispatch(createMovie({
  movie: movieRequiredProps
}));
```

> Actions only need type. They dont necessarily need property data (props)

## Reducers

- Produce new states
- Receive the last state and next action
- Listen to specific actions
- Use pure, immutable operations

`createReducer()` creates a reducer function to handle state transitions.

```typescript
export const initialState: State = {
  collection: [],
  activeBookId: null
};

export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state, // copy current state into new object
      activeBookId: action.bookId // update new state object with new activeBookId property value
    };
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    };
  })

  ...
);
```

Takes initial state and `on()` method which handles associations between actions and state changes.

*Note: `createReducer()` Must be used with `ActionCreator`'s (returned by `createAction()`). Cannot be used with class-based action creators.*

## Store

- State contained in a single state tree
- State in the store is immutable (hence the copying of objects with the spread `...` operator instead of just updating them)
- Slices of state are updated with reducers

## Selectors

- Allow us to query our store for data
- Recompute when their inputs change
- Fully leverage memoization for performance
- Selectors are fully composable

Selectors are pure functions that take slices of state as arguments and return some state data that we can pass to our components.

`createSelector()` is used as an optimization step for store slices selection. For example, if you return some heavy computation result for some store slice, then using createSelector will do memoization which means it will keep track of last input params to selector and if they are the same as current ones, it will return last result immediately instead of repeating computation.

```typescript
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => books.find(book => book.id === activeBookId) || null
);
```

## Effects

- Processes that run in the background outside the event loop (api calls, timeouts, etc)
- Connect your app to the outside world
- Often used to talk to services
- Written entirely using RxJS streams

the actions$ injected into books-api.effects.ts is an observable of all the actions

avoid "quick return" for better debugging. Using an explicit return statement will point out more specific issues within your createEffect() method

```typescript
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BooksPageActions.enter),
        mergeMap(() =>
          this.booksService
            .all()
            .pipe(map(books => BooksApiActions.booksLoaded({ books })))
        )
      )
    );
...
}
```

should be

```typescript

export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BooksPageActions.enter),
        mergeMap(() =>
          this.booksService
            .all()
            .pipe(map(books => BooksApiActions.booksLoaded({ books })))
        )
      )
    });
...
}
```

> "tap()" can be a big help when debugging rxjs code since it creates side-effects (such as print statements for debugging)

You add effects to the module.ts file so they happen when a component is routed to

## Advanced Effects

mergeMap(): Subscribe immediately, never cancel or discard. Flattens inputs - has no distinct order but all will get handled (async)

concatMap(): Subscribe after the last one finished. It's like standing in line. Everything's in order. First in line gets served first, second gets served second, etc.

exhaustMap(): Discard until the last one finishes. No line will form as long as one is getting processed. "Screw this noise I'm not waiting in line". Queued are discarded.

switchMap(): Cancel the last one if it has not completed. The opposite of exhaustMap(). If there's a line the newest one elbows its way to the front and the ones it cut off go home

### Race conditions

mergeMap(), exhaustMap(), and switchMap() are highly concurrent. No guarenteed order to be had.

Because of this, concatMap() is the safest BUT there's risk of "back pressure"

#### Back Pressure

The queue builds and they can't be processed fast enough because order matters. Only one will be processed at a time.

See https://stackblitz.com/edit/angular-kbvxzz for an example of this

### When to use each

mergeMap() is good for deleting items

concatMap() is good for whenever order matters, like for updating or creating new items

exhaustMap() is good for non-parameterized queries. First in line wins is okay. If we ask for all the books, then someone else does, then just keep getting the books. Dont need to worry about their request because they're already fulfilling ours.

switchMap() is good for parameterized queries. Good for search and real-time results. We can safely discard results as the user types because the input is being updated and changes the results.

> Understanding these 4 map types are essential to understanding and mastering Effects

If done right there will be no service for "books" in the example code's books-page.component.ts. It should only dispatch actions which in turn trigger the effects, which make the calls to the services as shown in books-api.effects.ts (for branches > 09-effects)

No need to unsubscribe from instance variables in books-api.effects.ts example. We want those subscriptions open for the life of the app. NgRx will handle unsubscribing during teardown.

as of branch 10-more-effects branch books-page.component.ts is a great example of a "smart connected" or "presentational" component

> Adding "readonly", private, or public on a property in the constructor acts as a shortcut
>
>```typescript
>@Injectable()
>export class BooksApiEffects {
>
>  constructor(private actions$: Actions) {}
>
>  ...
>}
>```
>
>is the same as
>
>```typescript
>@Injectable()
>export class BooksApiEffects {
>  actions$: Actions;
>
>  constructor(actions$: Actions) {
>    this.actions$ = actions$
>  }
>
>  ...
>}
>```

Effects do not need to be from the Actions service. It can be any observable.

### @Effects annotation

Used to set Effects configurations. Defaults to empty object.

There are some cases where you dont want your effect to dispatch an action, like opening a dialog box in the browser. In that case you can use the @Effects annotation to tell the application to not listen for an action to dispatch.

```typescript
@Effect({ dispatch: false })
openUploadModal$ = this.actions$.pipe(
  ofType(BooksPageActions.openUploadModal),
  tap(() => {
    this.dialog.open(BooksCoverUploadModalComponent);
  });
);
```

## Entities

- Working with collectison should be fast
- Collections are very common
- Common set of basic state operations
- Common set of basic state derivations

Pretty much makes a dictionary out of an array. Makes O(n) matching to O(1).


