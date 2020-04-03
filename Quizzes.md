# Session 1 Kahoots Quesitons

**Why does Ivy allow lazy components?**

Because it follows the locality prinicipal

**Which two rendering phases can an Ivy based template function react upon?**

Create and Update

**How to create a dynamic Ivy component using private APIs?**

Create a class and assign static meta data properties

**How does an Ivy based component know its “neighborhood” (components, it can call in its template)?**

They are registered with its component metadata

**What’s a higher order component?**

A component operating on other components

**What are Angular Builders?**

Low level task runners

**What makes up a Builder definition?**

Implementation, schema, description

**What default function from a builder is called?**

createBuilder

**What arguments are given to a builder?**

options, context, transforms

**Where are most utilities for builders location?**

in @angular-devkit

**Do you have to be an RxJS Expert to write Interceptors?**

No just some things like pipe()

**The next.handle() method...**

Is how I pass the request on to the next interceptor

**To add a header to the request:**

Clone the request first (optionally set headers in the clone() method)
