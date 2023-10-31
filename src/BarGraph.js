import DrawGraph from './DrawGraph.js';

export default function BarGraph({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'BarGraphContent';
    this.$target.innerHTML = `<h2>1. 그래프</h2>`;

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$target.innerHTML = ``;
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = 800;
        this.$canvas.height = 600;

        this.$target.appendChild(this.$canvas);

        new DrawGraph({
            $canvas: this.$canvas,

            initialState: this.state.items,
        }).draw();
    };

    this.render();
}
