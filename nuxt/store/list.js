export const state = () => ({
  today: "",
  lists: []
});

export const mutations = {
  syncListData(state, { today, selected }) {
    // listが今日のものか確認
    if (state.today === today) {
      state.lists = selected;
    } else {
      state.today = today;
      state.lists = [];
    }
  }
};
