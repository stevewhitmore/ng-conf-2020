# Angular for Architects: Data Patterns

## Resources

- Workshop setup: https://jpapa.me/aaseries
- Slides: https://jpapa.me/afa-1
- Demo projects: https://github.com/DanWahlin/angular-architecture
- Labs: https://labs.codewithdan.com/angular-architecture-workshop
- Typescript to JS preview: https://www.typescriptlang.org/play/index.html
- Instantly create interface from JSON data (there's also a VSCode extension for this): https://www.jsontots.com

They're opening up the resources for Day 2 and 3 for those of us who only signed up for Day 1.

## Agenda

- Interfaces, Classes, and Types
- Component View Models
- HttpClient and RxJS Operators
- RxJS Subjects
- State Patterns
  - Observable Store
  - NgRx Data

## Interfaces, Classes, and Types

**Interface:** defines the shape of the data
**Class:** create an instance

Interfaces are really for really big apps. Keeps code concise, clean, and enables intellisense/code help.

Have 0 footprint on bundle size where as Classes do.

> There is no "correct way" to name interfaces. "Correct" is whatever your team collectively agrees to use and defines in their team style guide.

*We need to lay off the "any" type and rely more on interfaces/classes. We're creating ambiguous and difficult to maintain code by abusing "any".*

Our data doesn't change much so we should make an interface for the incoming data from GET request (we do in a lot of cases). This is different for frequently changing data or those who are using GraphQL.

Good to put expected type directly in http call -

```typescript
getCustomers(): Observable<Customer[]> {
  return this.http.get<Customer[]>(...);
}
```

### Working with Enums

They generate a fair amount of code. It's not a JS thing so it needs to be transpiled to something that works in the browser. Better to try and use them though instead of strings because strings are too arbitrary. 

const enum is great for simple comparisons between string and numbers, etc.

Can create a set of string literals to enforce properties to have certain values:

```typescript
type Pet = 'dog' | 'cat' | 'bird';

let myPet: Pet;

myPet = 'foo'; // invalid. Will create compiler error for typescript
```

### Types

`ReadOnly<T>` - Creates compile errors if you try to change values. 

`Partial<T>` - really helpful for when you want to pass a subset of a type. Removes the need to give it dummy values or create new types. Can pass in Interface or Class.

> Every team should have a style guide

## Component View Models

If you put a model inside a view the entire model is exposed.

Two-way binding are often too tightly coupled. We may not want to display what's being entered immediately like say when creating a new customer.

```typescript
this.selectedCustomer = { ...customer } // This is a shallow clone. Nested objects can be cloned with libraries if needed
```

ViewModels do add to the bundle size but it's negligible.

### What about connected models

Models should be single responsibility: customers, orders, line items, products, etc)
ViewModels combine the models to create the shape the views need them to be.

