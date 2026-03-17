import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const note = action.payload;
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));

      toast.success("🦄 Successfully created the note!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    updateNote: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("🦄 Successfully updated the note!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
    resetAllNotes: (state, action) => {
      state.notes = [];
      localStorage.removeItem("notes");

      toast.success("🦄 Successfully reset the notes!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    removeNote: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);
      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));

        toast.success("🦄 Successfully removed note!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, updateNote, removeNote, resetAllNotes } =
  noteSlice.actions;

export default noteSlice.reducer;
