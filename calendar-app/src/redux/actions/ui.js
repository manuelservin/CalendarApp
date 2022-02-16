import { types } from "../types";

export const openModal = () => ({
  type: types.uiOpenModal,
});

export const closeModal = () => ({
  type: types.uiCloseModal,
});
