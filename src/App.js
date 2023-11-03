import BarGraph from './BarGraph.js';
import Editor from './Editor.js';
import AddForm from './AddForm.js';
import PrimeEditor from './PrimeEditor.js';

import { scrollMove } from './action/scrollMove.js';

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
                value: 10,
            },
            {
                id: 3,
                value: 0,
            },
            {
                id: 4,
                value: 30,
            },
        ],
        willRemoveData: [],
        isDrawing: true,
    };

    //  1.그래프
    const barGraph = new BarGraph({
        $app,
        initialState: this.state,
    });

    //  2.값 편집
    const editor = new Editor({
        $app,
        initialState: this.state,
        addDelete: (id) => {
            this.setState({
                ...this.state,
                willRemoveData: [...this.state.willRemoveData, id],
            });
        },
        handleApply: (editedValues, deletedIds) => {
            let newData = this.state.items.map((node) => {
                const value =
                    editedValues[node.id] === undefined
                        ? node.value
                        : editedValues[node.id];
                return {
                    id: node.id,
                    value,
                };
            });
            if (deletedIds.length > 0) {
                newData = this.state.items.filter(
                    (node) => !deletedIds.includes(node.id)
                );
            }
            this.setState({
                ...this.state,
                items: newData,
                willRemoveData: [],
            });
            window.alert('적용 되었습니다.');
            scrollMove('.PrimeEditorContent');
        },
    });

    // 3.값 추가
    new AddForm({
        $app,
        handleSubmit: (id, value) => {
            if (value < 0) {
                window.alert('양수의 값을 입력해주세요.');
                return;
            }
            if (this.state.willRemoveData.length > 0) {
                window.alert(
                    '2번 작업이 진행 중입니다. 적용 후 값을 추가해주세요. '
                );
                scrollMove('.EditorContent');
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
                scrollMove('.PrimeEditorContent');
            }
        },
    });
    // 4. 값 고급 편집
    const primeEditor = new PrimeEditor({
        $app,
        initialState: this.state,

        handleApply: (willUpdateItems) => {
            const keys = Object.keys(willUpdateItems);
            if (this.state.willRemoveData.length) {
                window.alert(
                    '2번 작업이 진행 중입니다. 적용 후 값을 추가해주세요.'
                );
                return;
            }
            if (keys.length) {
                this.setState({
                    ...this.state,
                    items: this.state.items.map((node, idx) => {
                        if (keys.includes(idx + '')) {
                            const { id, value } = willUpdateItems[idx + ''];
                            return {
                                id,
                                value,
                            };
                        } else {
                            return node;
                        }
                    }),
                });
            }

            this.setState({
                ...this.state,
                isDrawing: true,
            });
            window.alert('그래프가 수정 되었습니다.');

            scrollMove('.BarGraphContent');
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        // isDrawing=true 일 경우에만 그래프 그려지게 설정
        if (this.state.isDrawing) {
            barGraph.setState(this.state);
            this.setState({
                ...this.state,
                isDrawing: false,
            });
        }
        editor.setState(this.state);
        primeEditor.setState(this.state);
    };
}
