import { getColor } from '../action/getColor.js';

export default function DrawGraph({ $canvas, initialState }) {
    this.ctx = $canvas.getContext('2d');
    this.state = initialState;
    this.data = JSON.stringify(this.state);
    this.maxValue = Math.max(...this.state.map((node) => node.value));
    this.maxId = Math.max(...this.state.map((node) => node.id));
    this.colors = [];

    for (let i = 0; i < this.state.length; i++) {
        this.colors.push(getColor());
    }

    function drawLine(ctx, startX, startY, endX, endY, color, lineWidth) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
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

    this.drawBars = () => {
        const canvasActualHeight = $canvas.height;
        const canvasActualWidth = $canvas.width;

        const numberOfBars = this.state.length;
        const oneBlockWidth = canvasActualWidth / numberOfBars;
        const boxWidth = Math.floor(oneBlockWidth / 4);
        this.state.forEach((node, idx) => {
            const barHeight = Math.round(
                (canvasActualHeight * node.value) / this.maxValue
            );
            const boxSize = oneBlockWidth * idx;
            console.log('=======');
            console.log(idx);
            console.log(boxSize + boxWidth, 'start');
            console.log(boxSize + boxWidth * 2, 'end');
            drawBar(
                this.ctx,
                boxSize + boxWidth,
                canvasActualHeight - barHeight,
                boxSize + boxWidth * 2,
                barHeight,
                this.colors[idx]
            );
        });
    };

    this.drawGridLines = () => {
        const canvasActualHeight = $canvas.height;
        const canvasActualWidth = $canvas.width;
        drawLine(
            this.ctx,
            30,
            canvasActualHeight,
            canvasActualWidth,
            canvasActualHeight,
            '#000000',
            2
        );
        drawLine(this.ctx, 30, 0, 30, canvasActualHeight, '#000000', 1);

        let gridY =
            canvasActualHeight * (1 - this.maxValue / (this.maxValue + 10));

        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.textBaseline = 'bottom';
        this.ctx.font = 'bold 15px Arial';
        this.ctx.fillText(this.maxValue, 0, gridY - 2);
        this.ctx.fillText(`   0`, 0, canvasActualHeight - 2);
        this.ctx.restore();
    };

    this.draw = () => {
        this.drawGridLines();
        this.drawBars();
    };
}
