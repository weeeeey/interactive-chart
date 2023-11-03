export default function Editor({ $app, initialState, addDelete, handleApply }) {
    this.state = initialState;
    this.editedValues = {};
    this.deletedIds = [];

    this.$target = document.createElement('div');
    this.$target.className = 'EditorContent';
    this.$target.innerHTML = `<h2>2.값 편집</h2>`;

    $app.appendChild(this.$target);

    this.$table = document.createElement('table');
    this.$target.appendChild(this.$table);

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
        this.$table.innerHTML = `
        <tr>
            <th class="th-table heading">ID</th>
            <th class="th-table heading">값</th>
            <th class="th-table heading"></th>
        </tr>
        
        ${this.state.items
            .map((node) => {
                if (this.state.willRemoveData.includes(node.id)) {
                    return;
                }
                return `
                    <tr>
                        <td>${node.id}</td>
                        <td style="padding-left: 150px;">
                            <input class="EditInput value" data-id=${node.id} value=${node.value} type="number" />
                        </td>
                        <td class="Delete" data-id=${node.id} style="color: rgb(255, 0, 0)">삭제</td>
                    </tr>
                `;
            })
            .join('')}
        `;
    };
    this.render();

    this.$target.addEventListener('click', (e) => {
        const td = e.target.closest('.Delete');
        if (!td) return;
        const { id } = e.target.dataset;
        addDelete(parseInt(id)); //willRemoveData에 추가
        this.deletedIds.push(parseInt(id));
    });

    this.$table.addEventListener('input', (e) => {
        const { id: itemId } = e.target.dataset; //items.id
        const data = e.target.value === '' ? 0 : parseInt(e.target.value); //새로 입력 된 input 값
        this.editedValues[itemId] = data;
    });

    this.$applyContent.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;
        handleApply(this.editedValues, this.deletedIds);
        this.editedValues = {};
        this.deletedIds = [];
    });
}
