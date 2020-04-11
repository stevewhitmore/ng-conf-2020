**My team and I seem to have a lot of trouble with keeping a flat folder structure for our projects and tend to nest components really deeply (up to 5 levels in some cases). Any advice on how we can combat that?**

Some ideas:

1. 
a direction some people prefer: use --flat when generating 

single file component - put it all in a single file like Vue

2. if super nested once past 3 levels
flatten it out at components level
do something like
  | components
  | services
  | pipes
  | etc


**I would like to add some data validation at the class level.  good idea? bad idea?  With that, I am wondering about using data anotations with typescript... also, somtimes when there is invalid data, I would like to notify the user... is it bad form to call toast service from a class?**

This okay but is kinda opinion based. Maybe keep it decoupled from the class in a service.

**Can you explain the difference between "detectChanges()" and "markForCheck()".**

this.changeDetectorRef.detectChanges() is useful if something happens outside the bounds of Angular. In most cases you should not need to use it so either something's not set up right or we need to intentionally go outside the framework for something.

**Does using OnPush in an application drastically improve performance or only for very large-scale applications?**

Not really. It's more for controlling events more granuarly. Not a big boost to performance in general

if child has onpush then doesn't run change detection unless parent pushes it something

**With a reactive approach will you still recommed using input/outputs and having some dumb components just display data? How do you handle passing data to deeply nested components?**

If you have state at the 1st level and 3rd level, then input/output properties dont really make sense anymore. Will be very hard to maintain and be very tightly coupled/rigid.
Better to have input/output for 2 levels at most, MAYBE 3. It's okay to have smart container components a few levels deep that subscribes to an obs. Loosens the coupling.

**you mentioned making an npm package... if I use an npm package and another package that I use includes that same npm package, when I compile my code, is that package included twice or once?**

Tree shaking is good about getting rid of duplicates in the bundle if they're the same version. Some issues can arise if they're different versions of the same package

**Adding few http interceptors does it gives extra performance to API calls or do you think so minor that it doesn't matter?**
Really minor

Unit tests should really only cover typescript code. Use integration tests through an automation framework like selinium or cypress, or you  might have manual testing from QA. Dont bother with testing the DOM in your unit tests or at the very least put very little emphasis on it.

**If your component template uses "myFunObservable$ | async" multiple times in the template, what are some tips to keep this as one subscription? Is it bad to have multiple subscriptions to the same observable in your template? Performance issues?**
Yes, don't do that. You can alias.

```html
<div *ngIf="(customer$ | async) as customer">
{{ customer.firstName }}
<ol *ngFor="let order of customer.orders">
```

`data:text/html, <html contenteditable>` lets you in-browser edit