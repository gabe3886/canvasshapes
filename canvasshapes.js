/**
 * The CanvasShapes class
 * @author Gary Bell
 * @param string canvasID - the HTML ID attribute of the canvas
 * @param object defaults (optional) - a list of defaults for the canvas to have which will be used until overridden
 * 		- lineWidth : the width of the line around the shapes.  Defaults to 1
 * 		- lineColor : the default color for the lines around shapes to have.  Defaults to black
 * 		- fillColor : the default color the shapes are to be filled with.  Defaults to white.
 */
function CanvasShapes(canvasID, defaults) {
	this.canvasId = canvasID;
	this.canvas = document.getElementById(this.canvasId);
	this.context = this.canvas.getContext('2d');

	/***************************************************************************************
	 * Setters and getters for the colors of the fill and lines as well as line thickness *
	 ***************************************************************************************/

	/**
	 * Get the version of the CanvasShapes implementation
	 * @return string - the version of the CanvasShapes library
	 */
	this.version = function() {
		return "0.1";
	};

	/**
	 * Set the line width for the canvas shape
	 * @param int - the width to set the line
	 */
	this.setLineWidth = function(width) {
		this.lineWidth = width;
		this.context.lineWidth = this.lineWidth;
	};

	/**
	 * Get the line width as set in the prototype
	 * @return string - the height of the lines
	 */
	this.getLineWidth = function() {
		return this.lineWidth;
	};

	/**
	 * Set the color of the line the canvas shapes will have.
	 * This does not require the # at the start of the color
	 * @param string - The color of the line as a hex value
	 */
	this.setLineColor = function(color) {
		if (color.substr(0, 1) !== '#') {
			this.lineColor = '#' + color;
		} else {
			this.lineColor = color;
		}
		// set it on the context now
		this.context.strokeStyle = this.lineColor;
	};

	/**
	 * Get the line color which the canvas shapes are given
	 * @return string - the color of the canvas shape line
	 */
	this.getLineColor = function() {
		return this.lineColor;
	};

	/**
	 * Set the color to use when filling the canvas shapes
	 * @param string - the color to use to fill the canvas shapes with
	 */
	this.setFillColor = function(color) {
		if (color.substr(0, 1) !== '#') {
			this.fillColor = '#' + color;
		} else {
			this.fillColor = color;
		}
		this.context.fillStyle = this.fillColor;
	};

	/**
	 * Get the color which the canvas shapes are filled with
	 * @return string - the color of the canvas shape line
	 */
	this.getFillColor = function() {
		return this.fillColor;
	};

	this.setLinesAndFill = function(lineWidth, lineColor, fillColor) {
		this.setLineWidth(lineWidth);
		this.setLineColor(lineColor);
		this.setFillColor(fillColor);
	};
	
	/**
	 * Clear the canvas and start with a blank
	 */
	this.clear = function() {
		this.canvas.width = this.canvas.width;
	};

	/********************
	 * Make some shapes *
	 ********************/

	/**
	 * Draw a square shape on the canvas
	 * @param sideLength - the length of the sides in px
	 * @param leftPosition - the position from the left hand side of the canvas in px
	 * @param topPosition - the position from the top of the canvas in px
	 */
	this.square = function(sideLength, leftPosition, topPosition) {
		this.rectangle(sideLength, sideLength, leftPosition, topPosition);
	};
	
	/**
	 * Draw a rectangle on the canvas
	 * @param width - the width of the rectangle in px
	 * @param height - the height of the rectangle in px
	 * @param leftPosition - the position from the left hand side of the canvas in px
	 * @param topPosition - the position from the top of the canvas in px
	 */
	this.rectangle = function(width, height, leftPosition, topPosition) {
		this.context.beginPath();
		this.context.rect(leftPosition, topPosition, width, height);
		this.context.fill();
		// only draw a line if we want one.
		if (this.lineWidth > 0)
		{
			this.context.stroke();
		}	
	};
	
	/**
	 * Draw a circle on the canvas
	 * @param radius - the width of the circle in px
	 * @param centreLeft - the position of the centre point from the left of the canvas in px
	 * @param centreTop - the position of the centre point from the top of the canvas in px
	 */
	this.circle = function(radius, centreLeft, centreTop) {
		this.context.beginPath();
		this.context.arc(centreLeft, centreTop, radius, 0, 2 * Math.PI, false);
		this.context.fill();
		// only draw a line if we want one.
		if (this.lineWidth > 0)
		{
			this.context.stroke();
		}		
	};

    /**
     * Draw a right angled triangle
     * @param width - the width of the triangle in px
     * @param height - the height of the triangle in px
     * @param leftPosition - the position of the corner of the right angle from the left of the canvas in px
     * @param topPosition - the position of the corner of the right angle from the left of the canvas in px
     * @param rightToLeft - does the triangle go from right to left from the right angle (default false)
     */
    this.rightAngletriangle = function(width, height, leftPosition, topPosition, rightToLeft) {
        this.context.beginPath();
        this.context.moveTo(leftPosition, topPosition); // the point on the corner of the right angle.

        // draw the bottom line
        if (rightToLeft !== undefined && rightToLeft === true)
        {
            // have the right angle at the bottom right
            this.context.lineTo(parseInt(leftPosition) - parseInt(width), topPosition);
        }
        else
        {
            // the right angle is the bottom left
            this.context.lineTo(parseInt(leftPosition) + parseInt(width), topPosition);
        }

        // draw the hypotenuse
        this.context.lineTo(leftPosition, parseInt(topPosition) - parseInt(height));
        this.context.lineTo(leftPosition, topPosition);

        this.context.fill();

        if (this.lineWidth > 0)
        {
            this.context.stroke();
        }

    };

    this.equilateralTriangle = function(length, leftPosition, topPosition)
    {
        this.context.beginPath();
        this.context.moveTo(leftPosition, topPosition);

        // Work out where the bottom right point needs to be
        var opposite = length / 2;
        var adjacentSquare = (length * length) - (opposite * opposite);
        var adjacent = Math.sqrt(adjacentSquare);

        this.context.lineTo(leftPosition + opposite, topPosition + adjacent);
        this.context.lineTo(leftPosition - opposite, topPosition + adjacent);
        this.context.lineTo(leftPosition, topPosition);

        this.context.fill();

        if (this.lineWidth > 0)
        {
            this.context.stroke();
        }


    }
	
	/*******************************
	 * Set defaults for the canvas *
	 *******************************/
	
	if (defaults !== undefined)
	{
		// set the line width
		if (defaults.lineWidth !== undefined)
		{
			this.setLineWidth(defaults.lineWidth);
		}
		else
		{
			this.setLineWidth(1); // thin line
		}
		
		// set the line color
		if (defaults.lineColor !== undefined)
		{
			this.setLineColor(defaults.lineColor);
		}
		else
		{
			this.setLineColor('#000');	// black line	
		}
		
		// set the fill color
		if (defaults.fillColor !== undefined)
		{
			this.setFillColor(defaults.fillColor);
		}
		else
		{
			this.setFillColor('#fff');	// white fill	
		}
	}
	else
	{
		this.setLineWidth(1); // thin line	
		this.setLineColor('#000');	// black line
		this.setFillColor('#fff');	// white fill
	}
	
}