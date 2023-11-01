export default function Table({ $app, initialState, addDelete, handleDelete }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'TableContent';
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
                    <tr style="text-align: center; ">
                        <td>${node.id}</td>
                        <td>${node.value}</td>
                        <td class="Delete" id=${node.id} style="color: rgb(255, 0, 0)">삭제</td>
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
        addDelete(parseInt(td.id)); //willRemoveData에 추가
    });

    this.$applyContent.addEventListener('click', (e) => {
        const button = e.target.closest('.ApplyButton');
        if (!button) return;
        handleDelete();
    });
}
