# Day 3 Notes

## (keynote)

`ng new` has been improved

fast iteration cycle
build-time checks

iterations have --prod making bundles smaller and smaller by orders of magnitude.

> We should turn on sourceMaps in prod builds

npm i -D source-mapexplorer
ng config
projects.<projectId>.architect.build.configurations.prdocution.sourcmapTrue
ng build --prod
$(npm bin) .................................

!!!!!!!!!!!!!!!!!!!!! rewatch this. He's talking about how to reduce bundle size

Ivy will take care of the build time issue we're facing

3rd party libraries can be the cause of a lot of problems. Be aware of what you're importing into your project as a dependency.
If the library ships with commonJS or AMD format dont use it. Slows junk down. Use ES Module format instead.

Lazy load as much as you can.

`<img loading="lazy">`

### Tip #4 Stay up-to-date

Future goals

- Better (stricter) defaults
- First-class support for (dyanmic) component lazy-loading
- Warnings or errors when common performance issues are detected
- Under the hood cleanup\

## The Role of Effects in NgRx Authentication

## Stepping Up: Observable Services to Observable Store

Big fan of KISS (Keep it simple, stupid)

`npm i @codewithdan/observable-store`

it's really small package - ~250 lines of code, just needs RxJS

Define Store Interface

Derive from Observable store

## State of RxJS

Version 7 Beta just released

- Improved stability. Partnered with Google to ensure smooth releases
- Inferring N-args is much better

`const result: Observable<A | B | C | d>`

- Fixed bad types - old typing issues that would break in v6

Can make animations now 

- Better handling of emtpy observables



## NgRx

Has 3 areas of concentration: state management, reactive data, and pushing things to the view

View - component/router