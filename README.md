# Guess

A simple number guessing game.
> guess a number 1 - 10 to match the monster's number

> a demonstration of simple logic flow 

- [Live Demo](http://nealcloud.github.io/guess) 

### Features
  - 3 chances to guess the number
  - css animations and text depending on choice
  
### Lessons Learned
 - how to make conditionals
 - how to animate css elements
 - using jquery to create animation orders

```javascript
  $("#tongue").show().delay(500).animate({height: "+=240px"}).delay(300).animate({height: "-=240px"});
```

### Live view
![ScreenShot](https://nealcloud.github.io/assets/img/c4.png)

### Version
1.2

### Tech
* [jQuery]

### Todos
 - [ ] make mobile friendly
 - [ ] add stats
 - [ ] return key activates guess button
 - [ ] create flags to prevent clicks

### Bugs
 - Clicking guess button before win animation finishes breaks game
 
License
----
MIT

