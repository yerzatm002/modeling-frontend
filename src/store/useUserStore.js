import { create } from "zustand";
import { getUsers, getUserById, updateUser, deleteUser } from "../api/api";

const useUserStore = create((set) => ({
  users: [],
  selectedUser: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  fetchUsers: async () => {
    try {
      const users = await getUsers();
      set({ users });
    } catch (error) {
      console.error(error);
    }
  },

  fetchUserById: async (userId) => {
    try {
      const user = await getUserById(userId);
      set({ selectedUser: user });
    } catch (error) {
      console.error(error);
    }
  },

  updateUser: async (userId, updatedData) => {
    try {
      const user = await updateUser(userId, updatedData);
      set((state) => ({
        users: state.users.map((u) => (u.id === userId ? user : u)),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await deleteUser(userId);
      set((state) => ({
        users: state.users.filter((u) => u.id !== userId),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserStore;
