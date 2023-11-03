export default function PrimeEditor({ $app, initialState, handleApply }) {
    this.state = initialState;
    this.previousText = [];

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
    <textarea id="editorTextArea" cols="100" rows=${
        this.state.items.length * 5
    }>
${JSON.stringify(this.state.items, null, 4)}
    </textarea>
    `;
        this.previousText = JSON.stringify(this.state.items, null, 4);
    };

    this.render();

    // handle Apply
    this.$applyContent.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;
        console.log(JSON.parse(this.previousText));
        handleApply(JSON.parse(this.previousText));
    });

    // alter {id,value}
    this.$primeEditor.addEventListener('input', (e) => {
        const textarea = e.target.closest('textarea');
        if (!textarea) return;
        try {
            const newItems = JSON.parse(textarea.value);
            if (
                newItems.some(
                    (node) =>
                        JSON.stringify(Object.keys(node)) !==
                        JSON.stringify(['id', 'value'])
                )
            ) {
                window.alert('key 값 변경 금지');
                textarea.value = this.previousText;
            }
        } catch (error) {
            window.alert('json 형태를 유지하시오');
            textarea.value = this.previousText;
        } finally {
            this.previousText = textarea.value;
        }
    });
}
