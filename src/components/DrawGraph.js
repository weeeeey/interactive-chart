export default function DrawGraph({ $canvas, initialState }) {
    this.ctx = $canvas.getContext('2d');
    this.state = initialState;
    this.data = JSON.stringify(this.state);
    this.maxValue = Math.max(...this.state.map((node) => node.value));
    this.maxId = Math.max(...this.state.map((node) => node.id));
    this.color = 'lightgray';
    this.padding = 30;

    function drawLine(ctx, startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    function drawBar(
        ctx,
        upperLeftCornerX,
        upperLeftCornerY,
        width,
        height,
        color
    ) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        ctx.restore();
    }

    function writeText(ctx, text, x, y) {
        ctx.save();
        ctx.font = 'bold 15px Arial';
        ctx.fillText(text, x, y);
        ctx.restore();
    }
    this.drawBars = () => {
        const canvasHeight = $canvas.height;
        const canvasWidth = $canvas.width;

        const numberOfBars = this.state.length;
        const areaWidth = canvasWidth / numberOfBars;

        const boxWidth = Math.floor(areaWidth / 4);

        this.state.forEach((node, idx) => {
            const height =
                canvasHeight * (node.value / (this.maxValue + this.padding));
            const startX = areaWidth * idx + this.padding;

            drawBar(
                this.ctx,
                startX + boxWidth,
                canvasHeight - height,
                boxWidth,
                height - this.padding,
                this.color
            );
            writeText(this.ctx, node.id, startX + boxWidth * 1.4, canvasHeight);
        });
    };

    this.drawGridLines = () => {
        const canvasHeight = $canvas.height;
        const canvasWidth = $canvas.width;
        drawLine(
            this.ctx,
            this.padding,
            canvasHeight - this.padding,
            canvasWidth,
            canvasHeight - this.padding,
            '#000000'
        );
        drawLine(
            this.ctx,
            this.padding,
            0,
            this.padding,
            canvasHeight - this.padding,
            '#000000'
        );

        let gridY =
            canvasHeight * (1 - this.maxValue / (this.maxValue + this.padding));

        writeText(this.ctx, this.maxValue, 0, gridY);
        writeText(this.ctx, `   0`, 0, canvasHeight - this.padding);
    };

    this.draw = () => {
        this.drawGridLines();
        this.drawBars();
    };
}
