export default function JsonViewer({ $app, initialState, handleApply }) {
    this.state = initialState;
    this.willUpdata = {};
    this.$target = document.createElement('div');
    this.$target.className = 'JsonViewerContent';
    this.$target.innerHTML = `<h2>4.값 고급 편집</h2>`;
    $app.appendChild(this.$target);

    this.$jsonViewer = document.createElement('div');
    this.$jsonViewer.className = 'JsonViewer';
    this.$target.appendChild(this.$jsonViewer);

    this.$applyContent = document.createElement('div');
    this.$applyContent.className = 'ApplyContent';
    this.$applyContent.innerHTML = `
            <button class="ApplyButton">Apply</button>
        `;
    this.$target.appendChild(this.$applyContent);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$jsonViewer.innerHTML = `
        <pre>
        
    [
        ${this.state.items
            .map(
                (node, idx) => `
            {
                "id": <input class="ViewerInput id" data-id=${idx} value=${node.id} type="number" />
                "value": <input class="ViewerInput value" data-id=${idx} value=${node.value} type="number" />
            },
        `
            )
            .join('')}
    ]

        </pre>
        `;
    };
    this.render();

    this.$applyContent.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;
        handleApply(this.willUpdata);
        this.willUpdata = {};
    });
    this.$jsonViewer.addEventListener('input', (e) => {
        const key = e.target.className.split(' ')[1]; //id 값인지 value 값인지 구분
        const { id: index } = e.target.dataset; //items의 인덱스
        const data = parseInt(e.target.value); //새로 입력 된 input 값
        const { id, value } = this.state.items[index];

        if (this.willUpdata[index] === undefined) {
            this.willUpdata[index] = {
                id,
                value,
            };
        }
        this.willUpdata[index] = {
            ...this.willUpdata[index],
            [key]: data,
        };
    });
}
