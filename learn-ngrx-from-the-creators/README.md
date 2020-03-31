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


## Effects

the actions$ injected into books-api.effects.ts is an observable of all the actions

avoid "quick return" for better debugging. Using an explicit return statement will point out more specific issues within your createEffect() method

```typescript
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
```

should be

```typescript
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
```

> "tap()" can be a big help when debugging rxjs code since it creates side-effects (such as print statements)

You add effects to the module.ts file so they happen when a component is routed to

## Advanced Effects

mergeMap() has no distinct order but all will get handled (async)

concatMap() is like standing in line. Everything's in order. First in line gets served first, second gets served second, etc.

exhaustMap() no line will form as long as one is getting processed. "Screw this noise I'm not waiting in line". Queued are discarded.

switchMap() the opposite of exhaustMap(). If there's a line the newest one elbows its way to the front and the ones it cut off go home

### Race conditions

mergeMap(), exhaustMap(), and switchMap() are highly concurrent. No guarenteed order to be had.

because of this, concatMap() is the safest BUT there's risk of "back pressure"

### Back Pressure

The queue builds and they can't be processed fast enough because order matters.

See https://stackblitz.com/edit/angular-kbvxzz for an example of this

### When to use each

mergeMap() good for deleting items

concatMap() good for whenever order matters, like for updating or creating new items

exhaustMap() good for non-parameterized queries. First in line wins is okay. If we ask for all the books, then someone else does, then just keep getting the books. Dont need to worry about their request because they're already fulfilling ours.

switchMap() good for parameterized queries. Good for search and real-time results. We can safely discard results as the user types because the input is being updated and changes the results.

> Understanding these 4 map types are essential to understanding and mastering Effects

If done right there will be no service for "books" in the example code's books-page.component.ts. It should only dispatch actions which in turn trigger the effects, which make the calls to the services as shown in books-api.effects.ts (for branches > 09-effects)

No need to unsubscribe from instance variables in books-api.effects.ts example. We want those subscriptions open for the life of the app. NgRx will handle unsubscribing during teardown.

as of branch 10-more-effects branch books-page.component.ts is a great example of a "smart connected" or "presentational" component

> Adding "readonly", private, or public on a property in the constructor acts as a shortcut

```typescript
@Injectable()
export class BooksApiEffects {

  constructor(private actions$: Actions) {}

  ...

}
```

is the same as

```typescript
@Injectable()
export class BooksApiEffects {
  actions$: Actions;

  constructor(actions$: Actions) {
    this.actions$ = actions$
  }

  ...
  
}
```

Effects do not need to be from the Actions service. It can be any observable. look at @Effects annotation

## Entities

- Working with collectison should be fast
- Collections are very common
- Common set of basic state operations
- Common set of basic state derivations

Pretty much makes a disctionary out of an array. Makes O(n) matching to O(1) (?)


