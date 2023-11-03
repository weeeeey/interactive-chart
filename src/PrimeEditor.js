export default function PrimeEditor({ $app, initialState, handleApply }) {
    this.state = initialState;
    this.willUpdata = {};
    this.$target = document.createElement('div');
    this.$target.className = 'PrimeEditorContent';
    this.$target.innerHTML = `<h2>4.값 고급 편집</h2>`;
    $app.appendChild(this.$target);

    this.$primeEditor = document.createElement('div');
    this.$primeEditor.className = 'PrimeEditor';
    this.$target.appendChild(this.$primeEditor);

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
        this.$primeEditor.innerHTML = `
        <pre>
        
    [
        ${this.state.items
            .map(
                (node, idx) => `
            {
                "id": ${node.id}
                "value": <input class="EditInput value" data-id=${idx} value=${node.value} type="number" />
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

    this.$primeEditor.addEventListener('input', (e) => {
        const key = e.target.className.split(' ')[1]; // value 가 맞는지 체크
        const { id: index } = e.target.dataset; //items의 인덱스
        const data = e.target.value === '' ? 0 : parseInt(e.target.value); //새로 입력 된 input 값
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
