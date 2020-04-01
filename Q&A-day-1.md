# Q&A Day 1

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
