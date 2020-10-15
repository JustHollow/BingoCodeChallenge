import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import Answers from "./answers.json";
import getRandomWithRange from "@src/utils/randomWithRange";
//Selectors
export const gridSelector = (state: RootState) => state.grid;

//Reducer
export type GridItem = {
    win: boolean;
    value: 0 | 1;
    text: string;
    place: { row: number; col: number };
};
export type GridState = GridItem[][];

const findMiddle = (size: number) => {
    const mid = [Math.floor(size / 2)];

    const isEven = size % 2 === 0;
    isEven && mid.push(mid[0] - 1);

    return mid;
};

type IsInMiddleArgs = { row: number; col: number; size: number };
export const isInMiddle = ({ row, col, size }: IsInMiddleArgs) => {
    const mid = findMiddle(size);
    return mid.includes(col) && mid.includes(row);
};

const createGrid = (size: number): GridState => {
    const answersClone = [...Answers];

    return Array.from<[], GridItem[]>({ length: size }, (_, rowIdx) =>
        Array.from<[], GridItem>({ length: size }, (_, colIdx) => {
            const randAnswerPos = getRandomWithRange(0, answersClone.length);
            return {
                win: false,
                value: isInMiddle({ col: colIdx, row: rowIdx, size: size })
                    ? 1
                    : 0,
                text: answersClone.splice(randAnswerPos, 1)[0]?.text,
                place: { row: rowIdx, col: colIdx },
            };
        })
    );
};

const initialState: GridState = createGrid(5);

const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        toggleCell: (
            state,
            action: PayloadAction<{ row: number; col: number }>
        ) => {
            const { row, col } = action.payload;
            const mid = findMiddle(state.length);
            if (!(mid.includes(row) && mid.includes(col)))
                state[row][col].value = (state[row][col].value ^
                    1) as GridItem["value"];
        },
        setWins: (_state, action: PayloadAction<GridState>) => action.payload,
        newGame: () => createGrid(5),
    },
});

export const gridActions = gridSlice.actions;
export default gridSlice.reducer;
