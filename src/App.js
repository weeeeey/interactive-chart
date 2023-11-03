import BarGraph from './BarGraph.js';
import Editor from './Editor.js';
import AddForm from './AddForm.js';
import PrimeEditor from './PrimeEditor.js';

import { scrollMove } from './action/scrollMove.js';
import { getLocalData, setLocalData } from './action/localStorage.js';

const initialItems = [
    {
        id: 0,
        value: 75,
    },
    {
        id: 1,
        value: 20,
    },
    {
        id: 2,
        value: 80,
    },
    {
        id: 3,
        value: 100,
    },
    {
        id: 4,
        value: 70,
    },
];

export default function App({ $app }) {
    this.state = {
        items: [],
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

            this.setState({
                ...this.state,
                items: newData.filter((node) => !deletedIds.includes(node.id)),
                willRemoveData: [],
            });
            window.alert('적용 되었습니다.');
            scrollMove('.BarGraphContent');
        },
    });

    // 3.값 추가
    new AddForm({
        $app,
        handleSubmit: (id, value) => {
            if (value < 0 || id < 0) {
                window.alert('양수의 값을 입력해주세요.');
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
                scrollMove('.BarGraphContent');
            }
        },
    });
    // 4. 값 고급 편집
    const primeEditor = new PrimeEditor({
        $app,
        initialState: this.state,

        handleApply: (willUpdateItems) => {
            willUpdateItems.sort((a, b) => a.id - b.id);
            this.setState({
                ...this.state,
                items: willUpdateItems,
            });
            window.alert('그래프가 수정 되었습니다.');

            scrollMove('.BarGraphContent');
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        barGraph.setState(this.state);
        editor.setState(this.state);
        primeEditor.setState(this.state);
        setLocalData(this.state.items);
    };

    this.init = () => {
        const data = getLocalData();
        if (data.length) {
            this.setState({
                ...this.state,
                items: data,
            });
        } else {
            this.setState({
                ...this.state,
                items: initialItems,
            });
        }
    };

    this.init();
}
