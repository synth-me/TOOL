<img align=center src="https://github.com/user-attachments/assets/32c4f8ae-cbe4-404b-88a3-7fe0c2373f7f" width="200" height="200">

# Ramen.js 
`ramen.js` is a toolbox 🔨 to assist graphical development for EBO software.

current version: `homemade`

## Objectives:
All the features included in this library are made to simplify the process of interface design in EBO. 
I spotted that most of our programmers spent valuable time in repetitive tasks like copying and pasting code 
or even allocating memory for variables that should not exist solely because TGML Script did not have
the ergononimcs to avoid it. This libary was designed to solve this kind of problems. 

## Main Features:

1. Curried Objects
2. Simplfied Attributions of events
3. Simplfied Attribute Access
4. JS Modernized Features

------------------------------------------

## How to build ? 
For a smoother usage of the current scripts inside EBO software I created a `build.pl` file that will handle all generation of
the TGML nodes that can be copy and pasted inside any project. 
For linux users:
```perl
build
```
and for windows users with perl 
```perl
perl build.pl
```
if you're using the `release` bundle instead of cloning this repo all you need to do is run the build file inside the folder 
that is already built and it should work as expected as well. The file will generate a `/build` folder which will contain 
a TGML file with all content from the `src` scripts. 

------------------------------------------
