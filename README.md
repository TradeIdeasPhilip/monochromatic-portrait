# Monochromatic Portrait

This project was inspired by [a recent project](https://photos.app.goo.gl/N7xDnzKXNqx5dpDF6) in art class.
In class I used acrylic paints and I had to create the different regions by eye.
I decided to repeat the exercise with web tools.

I started from the same grayscale image as in art class.

I created a function `grayscaleToOrangePalette()`.
The input is a "value", the brightness of the original pixel.
If the requested value is exactly the value of orange, return orange.
If the requested value is brighter, mix orange and white to get a color with the right value.
If the requested value is darker, mix orange and black.
I created a sample with 10 specific values, which you can see at the bottom of the page.

Next I had to choose which 5 colors to use.
I considered several ways to approach this.
I eventually took the simplest path:
I chose 5 equally spaced values.
The exact values are listed near the bottom of the page.

Finally I had to select the right color for every pixel in the image.
Because I divided all of the values into 5 **equal** bins, this was easy and efficient.
There is an SVG filter element which does exactly that.
The SVG code looks ugly, but it's doing something very simple.
It divides all of the input brightnesses into exactly 5 bins.
Then it assigns a color from the previous paragraph to each bin.

I have code in a different project that will convert a list of colors into the format required by SVG.
But it was too lazy to look for it and I just asked Grok to do the conversion for me.

The process I used in art class caused the image to be flipped.
I didn't know if that was a bug or a feature.
I made the HTML version flip any time you click on it.
