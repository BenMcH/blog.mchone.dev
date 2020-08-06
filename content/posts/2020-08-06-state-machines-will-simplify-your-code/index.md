---
title: State machines will simplify your code
author: Ben McHone
date: '2020-08-10'
hero: images/wikimedia-turnstile-state-machine.png
---
State machines help us manage our application state and, ultimately, reduce the number of bugs our users encounter.

Shown above is a finite state machine representing a turnstile, similar to those found in many places, such as a subway station. When the user enters the program (Approaches the turnstile), the gate is locked and no amount of pushing on the turnstile will unlock it. Only the action of inserting a coin will unlock the turnstile. Once we have inserted a coin and find ourselves in the unlocked state, no amount of coins entered will change the state back to locked. Only the action of pushing the turnstile and entering will change the state back to locked, ready for another user.
