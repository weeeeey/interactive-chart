import BarGraph from './BarGraph.js';
import Table from './Table.js';
import ValueForm from './ValueForm.js';
import JsonViewer from './JsonViewer.js';

export default function App({ $app }) {
    this.state = {
        items: [
            {
                id: 0,
                value: 100,
            },
            {
                id: 1,
                value: 50,
            },
            {
                id: 2,
                value: 70,
            },
            {
                id: 5,
                value: 80,
            },
        ],
        willRemoveData: [],
        isDraw: false,
    };

    const barGraph = new BarGraph({
        $app,
        initialState: this.state,
        showGraph: () => {
            this.setState({
                ...this.state,
                isDraw: false,
            });
        },
    });

    const table = new Table({
        $app,
        initialState: this.state,
        addDelete: (id) => {
            this.setState({
                ...this.state,
                willRemoveData: [...this.state.willRemoveData, id],
            });
        },
        handleDelete: () => {
            this.setState({
                ...this.state,
                items: this.state.items.filter(
                    (node) => !this.state.willRemoveData.includes(node.id)
                ),
                willRemoveData: [],
            });
        },
    });

    new ValueForm({
        $app,
        handleSubmit: (id, value) => {
            if (this.state.willRemoveData.length) {
                window.alert(
                    '2번 편집 작업이 진행 중입니다. 적용 후 값을 추가해주세요.'
                );
                return;
            }
            if (this.state.items.some((node) => node.id === id)) {
                window.alert('중복 된 id 값입니다. 수정해주세요.');
                return;
            } else {
                const idx = this.state.items.findIndex((node) => node.id > id);
                const newData = [...this.state.items];
                if (idx === -1) newData.push({ id, value });
                else newData.splice(idx, 0, { id, value });

                this.setState({
                    ...this.state,
                    items: newData,
                });
            }
        },
    });

    const jsonViewer = new JsonViewer({
        $app,
        initialState: this.state,
        handleApply: () => {
            if (this.state.willRemoveData.length) {
                window.alert(
                    '2번 편집 작업이 진행 중입니다. 적용 후 값을 추가해주세요.'
                );
                return;
            }
            this.setState({
                ...this.state,
                isDraw: true,
            });
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        barGraph.setState(this.state);
        table.setState(this.state);
        jsonViewer.setState(this.state);
    };
}
