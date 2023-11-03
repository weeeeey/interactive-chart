import ApplyButton from './components/ApplyButton.js';

export default function Editor({ $app, initialState, handleApply }) {
    this.state = initialState;
    this.editedValues = {};
    this.deletedIds = [];

    this.$target = document.createElement('div');
    this.$target.className = 'EditorContent';
    this.$target.innerHTML = `<h2>2.값 편집</h2>`;

    $app.appendChild(this.$target);

    this.$table = document.createElement('table');
    this.$target.appendChild(this.$table);

    new ApplyButton({ $app: this.$target });

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$table.innerHTML = `
        <tr>
            <th class="th-table heading">ID</th>
            <th class="th-table heading">값</th>
            <th class="th-table heading"></th>
        </tr>
        
        ${this.state.items
            .map((node) => {
                if (this.deletedIds.includes(node.id)) {
                    return;
                }
                return `
                    <tr>
                        <td>${node.id}</td>
                        <td style="padding-left: 150px;">
                            <input class="EditInput value" data-id=${
                                node.id
                            } value=${
                    this.editedValues[node.id]
                        ? this.editedValues[node.id]
                        : node.value
                } type="number" />
                        </td>
                        <td class="Delete" data-id=${
                            node.id
                        } style="color: rgb(255, 0, 0)">삭제</td>
                    </tr>
                `;
            })
            .join('')}
        `;
    };
    this.render();

    // delete {Id,value}
    this.$target.addEventListener('click', (e) => {
        const td = e.target.closest('.Delete');
        if (!td) return;
        const { id } = e.target.dataset;
        this.deletedIds.push(parseInt(id));
        this.render();
    });
    // alter value
    this.$table.addEventListener('input', (e) => {
        const { id: itemId } = e.target.dataset; //items.id
        const data = e.target.value === '' ? 0 : parseInt(e.target.value); //새로 입력 된 input 값
        if (data < 0) {
            window.alert('양수의 값을 입력해주세요.');
            e.target.value = 0;
            return;
        }
        this.editedValues[itemId] = data;
    });

    //handle Apply
    this.$target.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;
        handleApply(this.editedValues, this.deletedIds);
        this.editedValues = {};
        this.deletedIds = [];
    });
}
