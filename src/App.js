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
                value: 1,
            },
            {
                id: 5,
                value: 80,
            },
        ],
        willDraw: [
            {
                id: 0,
                value: 100,
            },
            {
                id: 1,
                value: 1,
            },
            {
                id: 2,
                value: 2,
            },
            {
                id: 5,
                value: 80,
            },
        ],
        willRemoveData: [],
    };

    //  1.그래프
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

    //  2.값 편집
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
            if (!this.state.willRemoveData.length) {
                window.alert('삭제 한 컨텐츠가 없습니다.');
                return;
            }
            this.setState({
                ...this.state,
                items: this.state.items.filter(
                    (node) => !this.state.willRemoveData.includes(node.id)
                ),
                willRemoveData: [],
            });
            window.alert('적용 되었습니다.');
        },
    });

    // 3.값 추가
    new ValueForm({
        $app,
        handleSubmit: (id, value) => {
            if (value < 0) {
                window.alert('양수의 값을 입력해주세요.');
                return;
            }
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
                window.alert('적용 되었습니다.');
            }
        },
    });
    // 4. 값 고급 편집
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
                willDraw: this.state.items,
            });
            window.alert('그래프가 수정 되었습니다.');

            document.querySelector('.BarGraphContent').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
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
