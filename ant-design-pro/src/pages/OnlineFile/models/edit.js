import { fakeEditData } from '@/services/api';

export default {
  namespace: 'edit',

  state: {
    editStateData: [],
    loading: false,
  },

  effects: {
    *fetchEditStateData(_, { call, put }) {
      const response = yield call(fakeEditData);
      yield put({
        type: 'save',
        payload: {
            editStateData: response.editStateData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
