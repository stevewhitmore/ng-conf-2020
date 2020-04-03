# Q&A Days 1-3

*Some of the questions and answers that stood out to me. More to come later as I review.*

---
**Are there any tools showing component usage in monorepo?**

Not yet

**For an enterprise strategy does it make sense to upgrade Angular versions yearly? And if so, should one stay away from dot zero releases?**

They test the dickens out of each release, so keep up with each fresh new release every 6 months. Give it a try and if a bug does arise the Angular team will be on high alert shortly after the release and are likely to fix asap.

**How do you handle shared code if two preloaded routes use the same components/services. Won't they be downloaded twice?**

CLI uses Webpack adn will put the common stuff in a "commons" chunk, so the framework is smart enough to only download once.

**With entryComponents being deprecated, does that mean when we upgrade from 8 to 9, we'd have to manually remove current usages? or will the upgrade command automatically handle removing of the usage lines?**

The upgrade turns entryComponents into frivilous metadata that gets ignored if you dont remove it.

**How is `EMPTY` different than `of(null)`?**

Preloading context EMPTY vs of(null) is unclear.
In Observable context EMPTY is an that observable never emits anything while of(null) emits null.

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
