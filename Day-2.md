# Day 2 Notes

## Domain-Driven Design and Angular

How to create **sustainable** angular achitectures with **ideas from DDD**?

### DDD in a nutshell

2 strategies

strategic and tactical design

stratigic is more the smaller parts (decomposing a system) while tactical is design patterns and practices

Avoid intermingling - makes things way less maintainable, like a bundle of cords.

Break things up into subdomains and keep them as independant as possible.

Request product -> specify order -> approve order -> send order
employee        -> IT-expert     -> manager       -> buying agent

### Monorepos

>*This is what we're doing with SBS Angular Libraries. We could potentially do the same with all of our Angular apps*

Pros

- No version conflicts
- No burden with distrubting libs

Look into Nx when working with monorepos. Suppliments Angular CLI for monorepos.

`npm init nx-workspace myworkspace`

isloate your domain

domain -> application - use case specific facades, state management (optional)
          domain model - entities, biz logic
          infrastructure - data access

Aternative stolayering:

- hexagonal architchture
- clean architecture

### Main take aways

- Slicing into sub-domains
- Slicing into Layers
- 

## Stronger Type-Checking in Templates with Ivy

- Strongest type-checkign in templates
- Similar to Typescript `strict` tag

### Why use it

- Detect bugs faster
- Fewer runtime glitches
- More meaningful tests

Available in Angular v8

- Basic Mode that's default without any flags set
- fullTemplateTypeCheck Mode

fullTemplateTypeCheck will check

- *ngFor loop variables
- Bindings to @Inputs
- $event type
- Safe navigation

## Bazel + Angular Today

Works on all major OS's

Bazel is a fork of Blaze, the tool Google uses.

## Debugging Like a Boss with Angular 9

Difficulty debugging can lead to catastrophe.

We can use the same API that Ivy uses when we debug in Angular v9

$0 is the most recent selection from the Elements Inspector or from using Inspect Element

ng.getComponent - retrieves the component from an HTML element. Gets instance of a component.

ng.applyChanges triggers change detection for the component or directive

ng.getOwningComponent - returns parent component for the HTML element

ng.getContext - returns the context of an *ngIf or *ngFor for the HTML element

ng.getDirectives - 
ng.getListeners

### What these APIs wont do

- Replace using breakpoints in Chrome (they're an addition to this)
- Debug interactions between components
- Debug complex state issues with Observables and NgRx
- Magically fix every problem in your app

This is a WIP project aimed to replace ng.probe and take it way further

https://angular.io/api/core/global for more info

