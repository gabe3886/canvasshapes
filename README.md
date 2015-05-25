# Canvas Shapes
A small library of HTML5 canvas shapes

## What is CanvasShapes
CanvasShapes is a small library of shapes brought together in a simple library to make drawing shapes easier.  It takes the hassle out of remembering to set the context in canvas, and out of setting the colours in each place you might need them setting.  Create the object with some defaults and use them throughout the canvas easily.

## What shapes are available as part of CanvasShapes
At the present time, the following shapes are available:
- Square
- Rectangle
- Circle
- Right angle triangles
- Equilateral triangles 

## How do I use CanvasShapes
Include the CanvasShapes javascript in the head of your HTML file
```
<script type="text/javascript" src="path/to/canvasshapes.js"></script>
```

Add the canvas tag to your HTML file as shown below:
```
<canvas width='400' height='400' id='canvas-identifier'></canvas>
```

You can then create your CanvasShapes using the following JavaScript
```
var cs = new CavnasShapes('canvas-identifier');
```

Any shape is then created on the canvas by then calling the relevant method.  For example a 10x10 square 20 px from the left and 50 px from the top would be drawn as follows:
```
cs.square(10, 20, 50);
```
