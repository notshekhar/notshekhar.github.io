---
title: "Hello TensorFlow.js"
date: 2018-12-25
excerpt: "An introduction to machine learning with TensorFlow.js - learning from data to make predictions without the matrix math headache."
tags: ["machine-learning", "tensorflow", "javascript"]
---

**Machine Learning (ML)** is the dope new thing that everyone's talking about, because it's really good at learning from data so that it can predict similar things in the future. Doing ML by hand is pretty annoying since it usually involves matrix math which is zero fun in JavaScript (or if you ask me: anywhere 😅).

Thankfully, [TensorFlow.js](https://js.tensorflow.org) is here to help! It's an open source library that has a lot of built-in Machine Learning-y things like models and algorithms so that you don't have to write them from scratch.

## How it works

Most machine learning algorithms follow this pattern:

- We have to figure out the **"features"** of the secret formula that generated the data we were given, so that we can learn them. In my opinion, this is like 80% of the complexity of solving an ML problem. In this example, we were told the shape of the secret formula (it's a cubic!), so the features we have to learn are the coefficients in the polynomial. For something more complex like the "is this a dog or a blueberry muffin" problem, we'd have to look at pixels and colours and formations and what makes a dog a dog and not a muffin.

- Once we figure out these features (in our case, those a,b,c,d coefficients), we initialize them to some random values. We could now use them to make predictions, but they would be teeeeeerrible because they're just random.

- (I'm just going to use our actual example from now on and not dogs)

- We start looking at every piece (x,y) of training data we were given. We take the x value, and based on these coefficients we have estimated, we predict what the y value would be. We then look at the correct y value from the original training data, calculate the difference between the two, and then adjust our coefficients so that our predicted value gets closer to the correct one.

- (this, with more math sprinkled in is called "stochastic gradient descent". "Stochastic" means probabilistic, and "gradient descent" should make you think of walking down a hill, towards a sink hole – the higher the hill, the bigger the prediction error, which is why you want to descend towards the error-free hole.)

- This part of code is actually pretty messy (because matrices and derivatives), and TensorFlow does this for us!

- We keep doing this until we use up all the data, and then repeat the entire process so that we iterate over the same data over and over again until at the end we've pretty much learnt the coefficients!

## The Code

You can look at the code for the demo [on GitHub](https://www.github.com/notshekhar/convolutionalNeuralNetwork).

I tried to comment most lines of the code with either what the algorithm or TensorFlow are doing (especially when TensorFlow is actually doing a looooot of heavy lifting behind the scenes). I hope it helps!

**THANK YOU FOR READING ❤︎**