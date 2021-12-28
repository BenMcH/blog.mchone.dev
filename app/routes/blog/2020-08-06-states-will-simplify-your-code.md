---
meta:
  title: States will simplify your code
headers:
  Cache-Control: max-age=180, s-maxage=600, stale-while-revalidate=600
author: ben-mchone
date: '2020-08-31'
hero: /images/wikimedia-turnstile-state-machine.png
excerpt: State machines help us manage our application state and, ultimately, reduce the number of bugs our users encounter.
---
# States will simplify your code

![Hero Image](/images/wikimedia-turnstile-state-machine.png)
State machines help us manage our application state and, ultimately, reduce the number of bugs our users encounter.

Shown above is a finite state machine representing a turnstile, similar to those found in many places, such as a subway station. When the user enters the program (Approaches the turnstile), the gate is locked and no amount of pushing on the turnstile will unlock it. Only the action of inserting a coin will unlock the turnstile. Once we have inserted a coin and find ourselves in the unlocked state, no amount of coins entered will change the state back to locked. Only the action of pushing the turnstile and entering will change the state back to locked, ready for the next person.

This blog post will be about the benefits of states instead of deriving the current state based upon other factors. State machines themselves will be saved for a future blog post. 

Now you may be asking yourself: "What do I gain by setting up my project with states? I have properties that let me derive the current state! I don't need a status", but the benefits of an explicit status or state field are still plentiful. Let's start with an example, examining how an e-commerce merchant, such as Amazon, could use state machines to manage order status. In our example, we will have an order consisting of the following data:

```json
{
    "orderId": 1234,
    "orderedAt": "2020-08-09T04:00:00.000Z",
    "orderPickedAt": "2020-08-09T06:37:23.000Z",
    "orderPackedAt": "2020-08-09T08:27:41.000Z",
    "orderShippedAt": "2020-08-09T13:55:47.000Z",
    "orderDeliveredAt": null,
    "trackingNumber": "T1234567890",
    "estimatedDeliveryDate": "2020-08-21"
}
```

After seeing the data, you may think that it would be easy to display this information to the user. With such a small number of variables, we can check what the current status is based on the presence of `orderedAt`, `orderPickedAt`, `orderPackedAt`, `orderShippedAt`, and `orderDeliveredAt`.

Let's start here with an example to show how this may naively be displayed to the user.

```Javascript
function getOrderMessage(order) {
    if (order.orderPickedAt) {
        return "Your order has been picked and is on its way to be packed!";
    }
    if (order.orderPackedAt) {
        return "Your order is waiting to be shipped!";
    }
    if (order.orderShippedAt) {
        return "Your order is on the way!";
    }
    if (order.orderDeliveredAt) {
        return "Your order was delivered!";
    }

    return "We're working on your order";
}

```

This example code is easy to read and appears to work correctly, but there is still a problem. What if a data point doesn't get updated? Let's say that the order picker forgets to tell our ficticious system that they picked an item from the warehouse and sent it to shipping. After the order is shipped to the customer, our data will look like this:

```json
{
    "orderId": 1234,
    "orderedAt": "2020-08-09T04:00:00.000Z",
    "orderPickedAt": null,
    "orderPackedAt": "2020-08-09T08:27:41.000Z",
    "orderShippedAt": "2020-08-09T13:55:47.000Z",
    "orderDeliveredAt": null,
    "trackingNumber": "T1234567890",
    "estimatedDeliveryDate": "2020-08-21"
}
```

Running the above `getOrderMessage` is returning `Your order has been picked and is on its way to be packed!` and the user doesn't know that it was shipped. What gives? Our disperate state fell over and we were unable to correctly convey this information.  
  
Now, imagine another scenario where instead of entering a date, our employees change an order status directly. Our new data model will only require one more attribute, `status`.

```json
{
    "orderId": 1234,
    "orderedAt": "2020-08-09T04:00:00.000Z",
    "orderPickedAt": null,
    "orderPackedAt": "2020-08-09T08:27:41.000Z",
    "orderShippedAt": "2020-08-09T13:55:47.000Z",
    "orderDeliveredAt": null,
    "trackingNumber": "T1234567890",
    "estimatedDeliveryDate": "2020-08-21",
    "orderStatus": "SHIPPED"
}
```
This status field can take on one of a few different statuses. Here is an example definition of the possible statuses:

```json
const statuses = {
    ORDERED: "ORDERED",
    PICKED: "PICKED",
    PACKED: "PACKED",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED"
}
```

Additionally, our `getOrderMessage` function can now be redefined to be a bit easier to understand:

```javascript
function getOrderMessage(order) {
    switch (order.status) {
        case statuses.PICKED:
            return "Your order has been picked and is on its way to be packed!";
        case statuses.PACKED:
            return "Your order is waiting to be shipped!";
        case statuses.SHIPPED:
            return "Your order is on the way!";
        case statuses.DELIVERED:
            return "Your order was delivered!";
        default:
            return "We're working on your order";
    }
}
```

Now, with the introduction of a status field, our function only has to look at one piece of data to properly show the user where their order is at in the process, the status. An `orderPackedAt` data point missing will not leave the order in an incorrect "packing" state for all of eternity, but instead the shipping or delivery status update will eventually come along and correct the current state of the order. 
This is the idea of eventual consistency between our program and the real world. We've now built in fail-safes for correcting missed work without introducing any extra work in cases where that data is missed.

My hope is that the benefit of a status and the simplicity that it brings were made clear through this simple example.
