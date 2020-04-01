# Day 1 notes

*These are my preliminary notes. A lot of cleanup to come as I review sessions and slides over the next few days*

---

## What's new in v9 (keynote)

Official first stable release was 2/6/2020, v9.1 came out 3/25/2020

Ivy's big goals were:

- Reduce bundle size
- Everything faster
- Simpler in general

### Smaller bundles -

1. Tree shaking - remove unused code paths
2. Less generated code - made more processing at runtime to accomplish this. Could either do this or generate more code and have less processing at runtime.

Able to save ~30% generated code for each component. 

Total bundle size saving is the most for small and large apps. Not a huge difference for medium size app (in most cases).


### Faster builds

1. Introduced ngcc for separate dependency compilation  and not for core code
2. No JSON conversion - the old compiler had 2 sources of data with 2 different formats: TS (code) and JSON (metadata.json)

Lead to 40% reduction in build time

ng serve now has build aot compilation so you get hte same errors as production code when developing

Smarter recompilation model. Faster between each ng serve compilation.

40-50% faster ng serve time

### Simpler in general

Easier to debug. The stacktrace has been completely redone.

> ctx in chrome debugger to get context for errors like ExpressionChangedAfterItHasBeenCheckedError

You can actually grab components in the console now with

```typescript
const el = $0

const comp = ng.getComponent(el)

//comp is the component and you can now manipulate it in real time in the component.
```

### Style precedence

[class.highlighted] > [class]

### Module definitions

They're doing away with entryComponents in module.ts files. Just need to use delcarations.

- Over 100 bug fixes/features resolved
- Comprehensive accoutning for edge cases
- Mass addition of tests
- Tech debt removal

Typescript 3.7 and 3.8 now supported 

(has optional chaining)
`const result = some?.property?.that?.could().be?.optional?`;

### Testing

Component Test Harnesses (Angular Material). Added Google Maps and Youtube 

### How to update

Update CLI, then update core.

https://update.angular.io may take care of one of our PI goals of continuous upgrades for Angular.

## Http Interceptors: The Room Where It Happens

1. take the request
2. do your thing
3. pass request to handle() and return result

returns Observable response

HttpInterceptors are injectable services
needs to be injected at the same level as httpclientmodule (app.module.ts)

`{ provide: HTTP_INTERCEPTORS, useClass: LoggingHttpinterceptor, multi: true }`

For spinner on load you need to show it on first request and go away at last request. You only want 1 but there may be many http requests. You do this by using an observable. 

use finalize() to kill spinner

```typescript
@Injectable() //no provided in root because it's multi
```

interceptors execute in order for requests and respones

ReadOnlyHttpInterceptor - interrupting the flow

```
exprt class Readonlhyintercptor implements httpinterceptor {
  constructor(private sessionservice: private loggerservice)

  intercept(req: httpreq<any>, next: httphandler) observable<httpevent<any>> {
    const readonly = this .sessionservice.readyonly

    if(!readonly || okifreadonly(req)) {
      return next.handle(req)
    } else{
      const msg = `error: cannot ${req.method} $req.url} when read only`;
      this.loger.error(msg)
    }
  }
}
```

put interceptors in a barrel (index.ts file) and order them how you want providers property of module.ts file

request object is immutable, but you can make a clone of it

custom rxjs operator
any method that takes an observable and returns one
take the input observable and pipe onto it, do your thing, then return result

this.route.naviate([authFailRoute]) navigate away if auth fails

if no error return EMPTY. 

HttpBackend is the last interceptor no matter what. XHR call is done with it.

## How Ivy will improve your application architecture

- Easier lazy loading
- Partial hydration

## Deep dive into CLI Builders

Not something we interact with directly, the CLI does.

`ng build` runs Browser builder from ng-devkit
`ng serve` runs Dev-server builder
`ng test` runs karma builder by default

The "builders" are actually just a go-between from command to actual builders listed above.

It's possible to create your own custom builder. See Mike Hartington slides.

## A Philosophy for Designing Components with Composition

WAI-ARIA (Web Accessibility Iniative - Accessible Rich Internet Applications)

Talking about interaction patterns and how they're defined for ARIA, screen readers, and other accessilibity tools

`role=""` directive is for ARIA. There are around 70 of them.

Some are really straight forward while others less so.

We should really know the following:

- listbox
- combobox
- grid
- dialog
- menu
- tablist

Making the styling of your component easy to override can be done with parameterized Sass mixins.



## Angular Universal & Our New Prerenderer

Script for "first contentful paint" can be added to app.component.html
https://web.dev/fcp/

Prerendering good for SEO and for those who need to be able to save static pages.

## Why Should You Care About RxJS Higher-order Mapping Operators

### First order vs HIgher order mapping

First order mapping transforms each emiitted value and emits a result

`map()`

hi9gher order mapping transforms each emiiteed value into an obvservable

`switchMap(id => this.http.get(...));`

```
map(p => { ...p, profite: p.price -p.cose }) as Product
```

> You need to subscribe to an observable or the stream just doesn't go. This is true with http requests.


#### Higher-order mapping operators

- Family of operators: xxxMap()
- Map each value

- Automatically sub and unsub from inner obs

mergeMap (also known as flatMap) 
item is mapped to the inner obs
subscribe sto that inner obs
inner bos emissios concatenated to the output stream
unsubs from that inner obs

When to use mergeMap()

- To process items in parallel
- When order doesn't matter
- Examples: Witha s et of supllier ids, get each supploier for a product (order doesn't matter)


concatMap queues items before it maps to the inner obs, sub to inner obs, then waits for each call to complete, inner obs emissions concat to output stream, unsubs from that inner obs








## Monorepo tools

Bazel is really good once we get to 50+ packages that need to be managed together






