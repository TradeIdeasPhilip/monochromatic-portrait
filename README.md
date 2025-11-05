# Monochromatic Portrait

This project was inspired by [a recent project](https://photos.app.goo.gl/N7xDnzKXNqx5dpDF6) in art class.
In class I used acrylic paints and I had to create the different regions by eye.
I decided to repeat the exercise with web tools.

I started from the same grayscale image as in art class.

I created a function `grayscaleToPalette()`.
The first input is the "value".
That's the brightness of the original pixel and of the color that we are creating.
The second input is the base color used to create the monochromatic pallette.  
If the requested value exactly matches the values of the base color, return that color.
If the requested value is brighter, mix the base color with white to get a color with the right value.
If the requested value is darker, mix the base color with black.
I created a sample with 10 specific values, which you can see at the bottom of the page.

Next I had to choose which 5 colors to use.
I considered several ways to approach this.
I eventually took the simplest path:
I chose 5 equally spaced values.
The exact values are listed near the bottom of the page.

Finally I had to select the right color for every pixel in the image.
Because I divided all of the values into 5 **equal** bins, this was easy and efficient.
There is an SVG filter element which does exactly that.
It divides all of the input brightnesses into exactly 5 bins.
Then it assigns a color from the previous paragraph to each bin.

The SVG code for that last bit looks ugly, but it doesn't matter.
I have code that converts a list of colors into this odd format.

The process I used in art class caused the image to be flipped.
I didn't know if that was a bug or a feature.
I made the HTML version flip any time you click on it.

[See it for yourself.](https://tradeideasphilip.github.io/monochromatic-portrait/)
Adjust the settings and watch the results.
