import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        clearConnections: () => null
    }
})

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;