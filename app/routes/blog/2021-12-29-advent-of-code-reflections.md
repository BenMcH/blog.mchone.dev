---
meta:
  title: Advent of Code 2021 Reflections
  og:title: Advent of Code 2021 Reflections
  og:description: My personal ramblings regarding Advent of Code and some lessons learned along the way.
  og:image: https://blog.mchone.dev/images/advent-2021-hero.jpeg
headers:
  Cache-Control: max-age=180, s-maxage=600, stale-while-revalidate=600
author: ben-mchone
authorName: Ben McHone
date: '2021-12-29T00:00:00'
hero: /images/advent-2021-hero.jpeg
excerpt: My personal ramblings regarding Advent of Code and some lessons learned along the way.
---

# {attributes.meta.title}
{attributes.authorName} - {new Date(attributes.date).toLocaleDateString()}

<img alt="Hero Image" src={attributes.hero} />

## Introduction

[Advent of Code](https://adventofcode.com/2021) is likely my favorite code related annual holiday event, just beating out [Hacktoberfest](https://hacktoberfest.digitalocean.com/). 

If you haven't heard of Advent of Code, the idea of this yearly event is that Santa has run into a series of crazy mishaps leading up to Christmas and needs our help to save the day with our programming and mathematic abilities. This event consists of 25 themed daily challenges, each 2 parts, with increasing difficulty as we near Christmas day.

## This year's event

This year, we found ourselves helping in a variety of challenges, starting out reading the output of a sonar sweep report of the bottom of the ocean on [day 1](https://adventofcode.com/2021/day/1), and ending by [modeling the movement](https://adventofcode.com/2021/day/25) of sea cucumbers in an ocean trench. This variety of problems makes for a fun and engaging event, but not without its difficulty. 

## Lessons Learned

Advent of Code provides a playground for many to learn a new language, hone their skills with an existing language, and everything in between. Myself, I chose to work with a language that is near and dear to my heart, [Ruby](https://www.ruby-lang.org), substituting typescript in for a couple of days. 

During the first few days, problems tend to be simple, demanding little in order to come to the correct answer, but soon it became apparent that the elves had gotten themselves into quite a number of predicaments, requiring technical thought and , _gasp_, **debugging**. Because of this, the first lesson that I learned was to implement test cases as part of your script. Truthfully, I didn't start this practice until day 6 of the event this year, but after I started adding them, I was able to freely refactor my code to optimize for part 2 of the day.

The next lesson that I learned was that I could not personally pay much mind to the global leaderboard. It would only serve as discouragement to someone like me, a morning bird, when the new advent problems are released at night. Because of this, I found my drive and encouragement from using Advent of Code's private leaderboard functionality! In the end, we had about 5 individuals at work competing for the #1 position on the leaderboard. Once we submitted our solutions, we would chat about various approaches that we took to the problems in slack. This camaraderie between teammates was a blast and encouraged us all to go further than we otherwise would have.

While the code is fun and Santa needed help, the final lesson learned is that this challenge was one of my own limits. As much as it was fun to compete, there came a point where the challenges got more difficult and took too much time in the week leading up to Christmas, meaning that I still have 7 days incomplete in Advent of Code 2021. My current intentions are to return at a later date early in 2022 to complete the challenges set forth. 

## Conclusion

Being the third year that I was able to seriously participate in Advent of Code, I am still loving every minute that I get to spend on the challenges. I can confidently state that I feel the challenges force me to think outside of the box, ultimately making me a better engineer. If you haven't competed before, grab some friends, create a private leaderboard and play through a previous year! The puzzles are available year round once released. 
