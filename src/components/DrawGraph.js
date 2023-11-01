export default function DrawGraph({ $canvas, initialState }) {
    this.ctx = $canvas.getContext('2d');
    this.state = initialState;
    this.maxValue = Math.max(...this.state.map((node) => node.value)); //y축 최댓값
    this.color = 'lightgray';
    this.padding = 30;

    // x,y축 라인 그리기
    function drawLine(ctx, startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    // bar 그리기
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
    // id,value 값 시각화
    function writeText(ctx, text, x, y, textWeight = 'bold', font = '15px') {
        ctx.save();
        ctx.font = `${textWeight} ${font} Arial`;
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    // drawLine을 통해 x,y 축 그리기
    this.drawGridLines = () => {
        const canvasHeight = $canvas.height;
        const canvasWidth = $canvas.width;
        drawLine(
            //x축
            this.ctx,
            this.padding,
            canvasHeight - this.padding,
            canvasWidth,
            canvasHeight - this.padding,
            '#000000'
        );
        drawLine(
            //y축
            this.ctx,
            this.padding,
            0,
            this.padding,
            canvasHeight - this.padding,
            '#000000'
        );

        writeText(this.ctx, this.maxValue, 0, this.padding); // 최대 value 표기
        writeText(this.ctx, 0, this.padding * 0.5, canvasHeight - this.padding); //원점 표기
    };

    // drawBar를 통해 value에 따른 bar 그리기
    this.drawBars = () => {
        const canvasHeight = $canvas.height;
        const canvasWidth = $canvas.width;

        const numberOfBars = this.state.length;
        const areaWidth = canvasWidth / numberOfBars; //각 객체가 차지하게 될  총 폭

        const boxWidth = Math.floor(areaWidth / 4); //bar의 폭

        this.state.sort((a, b) => a.id - b.id);

        this.state.forEach((node, idx) => {
            const barHeight =
                (canvasHeight - this.padding * 2) *
                (node.value / this.maxValue);
            const startX = areaWidth * idx + this.padding; //각 객체의 x축 시작 지점

            drawBar(
                this.ctx,
                startX + boxWidth, //start X
                canvasHeight - barHeight - this.padding, //start Y
                boxWidth, //width
                barHeight, //height
                this.color
            );
            writeText(
                //bar 위에 각 value 입력
                this.ctx,
                node.value,
                startX + boxWidth,
                canvasHeight - barHeight - this.padding - 5,
                'lighter',
                '12px'
            );
            writeText(
                //x축에 각 id 값 입력
                this.ctx,
                node.id,
                startX + areaWidth * 0.35,
                canvasHeight - this.padding * 0.5
            );
        });
    };

    this.draw = () => {
        this.drawGridLines();
        this.drawBars();
    };
}
