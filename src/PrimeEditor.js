import ApplyButton from './components/ApplyButton.js';

export default function PrimeEditor({
    $app,
    initialState,
    isValidate,
    handleApply,
}) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'PrimeEditorContent';
    this.$target.innerHTML = `<h2>4.값 고급 편집</h2>`;
    $app.appendChild(this.$target);

    this.$primeEditor = document.createElement('div');
    this.$primeEditor.className = 'PrimeEditor';
    this.$target.appendChild(this.$primeEditor);

    new ApplyButton({ $app: this.$target });

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$primeEditor.innerHTML = `
            <textarea id="editorTextArea" cols="91" rows=${
                this.state.items.length * 6
            }>
${JSON.stringify(this.state.items, null, 4)}
            </textarea>
    `;
    };

    this.render();

    // handle Apply Button
    this.$target.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;

        const $editorTextArea = document.querySelector('#editorTextArea');
        try {
            const newItems = JSON.parse($editorTextArea.value);

            if (!isValidate(newItems)) {
                return;
            }
            handleApply(newItems);
        } catch (error) {
            window.alert('json 형태를 유지해주세요.');
        }
    });
}
