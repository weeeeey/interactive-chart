export default function ValueForm({ $app, initialState, handleSubmit }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'ValueFormContent';
    this.$target.innerHTML = `<h2>3.값 추가</h2>`;

    $app.appendChild(this.$target);

    this.$form = document.createElement('form');
    this.$target.appendChild(this.$form);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$form.innerHTML = `
            <input name="id" placeholder="ID" type="number"  required />
            <input name="value" placeholder="VALUE" style="width: 70%;" type="number" required />
            <button class="InputAddButton" >Add</button>
        `;
        this.$form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = e.target['id'].value;
            const value = e.target['value'].value;
            handleSubmit(parseInt(id), parseInt(value));

            e.target['id'].value = '';
            e.target['value'].value = '';
        });
    };
    this.render();
}
