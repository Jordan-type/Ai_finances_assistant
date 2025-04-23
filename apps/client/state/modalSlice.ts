// state/modalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { isProjectModalOpen: false },
  reducers: {
    openProjectModal: (state) => { state.isProjectModalOpen = true },
    closeProjectModal: (state) => { state.isProjectModalOpen = false },
  },
});

export const { openProjectModal, closeProjectModal } = modalSlice.actions;
export default modalSlice.reducer;
