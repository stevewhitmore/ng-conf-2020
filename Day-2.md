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

---

**Manfred: Is there an easy way to manage angular.json in a monorepo when there are multiple apps and libs? Any plans for angular to split anglar.json per app/ lib?**

Nope. Suggested submitting a feature request.

**Learna vs Nx**

Nx is more light wieght. Learna manages many projects while Nx has everything in 1.

**How to structure project so only part of checkout**

Not really, Google has their own in-house thing but nothing they know of that's open-source
Maybe `git submodule` with Nx but nothing prepackaged or streamlined

**Feature toggles (on-off switch) for new features. Do you remove them later ? is it not too many if-elses in code?**

Take advantage of Angular's DI to try and reduce the oversaturation of if-else blocks. Typically wait for new feature to be 100% stable then take out code for old flow.

**Do you have any recommended strategies to slowly move towards a clean architecture when your dep-graph already looks like your tangled cord analogy?**

When it starts to cause a lot of pain it's time to quickly change architecture types. Set up a new repo and do it on the side during mainstream development. You should be able to do it in 1 sprint.



**How do you use http interceptors with angular fire? I tried a couple of times but it doesn't fire angular interceptors**

Not going to work because they go over a socket connection instead of classic http traffic.

**Any plans to add support for route aliases? (Adding a name to the route so that I don't have to hardcode paths in my app)**

Not at the moment

**Great presentation. What are the upcoming prebuilt machine learning models in tensorflow.js**

Dunno

**In ML, what's the difference between accuracy and loss? Are they just opposites or do they measure different concepts?**

**what's the hardest thing about getting started with TensorFlow.js? thanks!**

Installing it. Lots of dependencies.

**is <ngrx-router> a new component? or was that sudo code of some sort???**

It's a legit thing

**is the ng debugging API only meant for ad-hoc testing, or can it be used in unit testing as well?**

If not in prod mode it's available ot use

**How are types differente than classes**
Types somethign compile time

Classe sgo wit hsomething ############### rewatch

---







