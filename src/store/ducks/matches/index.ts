import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import { gridActions, gridSelector, GridState } from "@ducks/grid";
import { isEqual } from "lodash";

//Selectors
export const matchesSelector = (state: RootState) => state.matches;

//Reducer
export type MatchesState = {
    diagonal: boolean[];
    horizontal: boolean[];
    vertical: boolean[];
    matched: number;
};

const initialState: MatchesState = {
    diagonal: [],
    horizontal: [],
    vertical: [],
    matched: 0,
};

const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {
        setOneOfState<T extends keyof MatchesState>(
            state: MatchesState,
            action: PayloadAction<{ type: T; newState: MatchesState[T] }>
        ) {
            state[action.payload.type] = action.payload.newState;
        },
        setMatched: (state, action: PayloadAction<MatchesState["matched"]>) => {
            state.matched = action.payload;
        },
        newGame: () => initialState,
    },
});

export const matchesActions = matchesSlice.actions;
export default matchesSlice.reducer;

//Utils
const verticalMatch = (grid: GridState) => {
    return grid.map((_, idx) =>
        grid.map((cell) => cell[idx]).every((item) => item.value === 1)
    );
};

const horizontalMatch = (grid: GridState) => {
    return grid.map((row) => row.every((cell) => cell.value === 1));
};

const diagonalMatch = (grid: GridState) => {
    const diagonals = [true, true];
    const matrixLength = grid.length;

    for (let i = 0; i < matrixLength; i++) {
        diagonals[0] = grid[i][i].value === 1 && diagonals[0];
        diagonals[1] =
            grid[i][matrixLength - i - 1].value === 1 && diagonals[1];
    }
    return diagonals;
};

//Thunks
export const findMatch: AppThunkAction = () => async (dispatch, getState) => {
    const State = getState();
    const GridState = gridSelector(State);
    const MatchesState = matchesSelector(State);

    const diagonal = diagonalMatch(GridState);
    const horizontal = horizontalMatch(GridState);
    const vertical = verticalMatch(GridState);

    const isDiagonalChanged = !isEqual(diagonal, MatchesState.diagonal);
    const isHorizontalChanged = !isEqual(horizontal, MatchesState.horizontal);
    const isVerticalChanged = !isEqual(vertical, MatchesState.vertical);

    if (isDiagonalChanged) {
        dispatch(
            matchesActions.setOneOfState({
                type: "diagonal",
                newState: diagonal,
            })
        );
    }

    if (isHorizontalChanged) {
        dispatch(
            matchesActions.setOneOfState({
                type: "horizontal",
                newState: horizontal,
            })
        );
    }

    if (isVerticalChanged) {
        dispatch(
            matchesActions.setOneOfState({
                type: "vertical",
                newState: vertical,
            })
        );
    }

    if (
        MatchesState.diagonal.length > 0 &&
        (isDiagonalChanged || isHorizontalChanged || isVerticalChanged)
    ) {
        const winMatrix = GridState.map((row, rowIdx) =>
            row.map((col, colIdx) => {
                const matrixLength = GridState.length;

                const isDiagonal =
                    rowIdx === colIdx || rowIdx === matrixLength - 1 - colIdx;
                const diagWinIdx = rowIdx === colIdx ? 0 : 1;

                const middleMatrixLength = Math.floor(matrixLength / 2);
                const isMiddle =
                    rowIdx === middleMatrixLength &&
                    colIdx === middleMatrixLength;

                const win =
                    horizontal[rowIdx] ||
                    vertical[colIdx] ||
                    (isDiagonal && diagonal[diagWinIdx]) ||
                    (isMiddle && diagonal.some(Boolean));

                return { ...col, win };
            })
        );

        dispatch(gridActions.setWins(winMatrix));

        const matched = [...diagonal, ...horizontal, ...vertical].filter(
            Boolean
        ).length;
        dispatch(matchesActions.setMatched(matched));
    }
};
