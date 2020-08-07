---
title: State machines will simplify your code
author: Ben McHone
date: '2020-08-10'
hero: images/wikimedia-turnstile-state-machine.png
---
State machines help us manage our application state and, ultimately, reduce the number of bugs our users encounter.

Shown above is a finite state machine representing a turnstile, similar to those found in many places, such as a subway station. When the user enters the program (Approaches the turnstile), the gate is locked and no amount of pushing on the turnstile will unlock it. Only the action of inserting a coin will unlock the turnstile. Once we have inserted a coin and find ourselves in the unlocked state, no amount of coins entered will change the state back to locked. Only the action of pushing the turnstile and entering will change the state back to locked, ready for the next person.

Now you may be asking yourself: "What do I gain by setting up my project like this? I have properties that let me derive the current state! I don't need a state machine", but the benefits of a state machine are still plentiful. Let's start with an example, examining how an e-commerce merchant, such as Amazon, could use state machines to manage order status. In our example, we will have an order consisting of the following data:

```json
{
    "orderId": 1234,
    "orderPickedAt": "2020-08-01T06:37:23.000Z",
    "orderPackedAt": "2020-08-01T08:27:41.000Z",
    "orderShippedAt": "2020-08-01T13:55:47.000Z",
    "orderDeliveredAt": null,
    "trackingNumber": "T1234567890",
    "estimatedDeliveryDate": "2020-08-09"
}
```

After seeing the data, you may think that it would be easy to display this information to the user. With such a small number of variables, we can check what the current status is based on the presence of `orderPickedAt`, `orderPackedAt`, `orderShippedAt`, and `orderDeliveredAt`
