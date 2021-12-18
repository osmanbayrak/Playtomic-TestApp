import { AnyAction } from "redux";

export interface pageEventState {
    collapsed: boolean;
    loading: boolean;
};

export const initialState = {
    collapsed: false,
    loading: false,
};

export default function (state = initialState, action: AnyAction) {

    switch (action.type) {
        case PageEventActionTypes.CollapseToggle:
            return { ...state, collapsed: action.data };
        case PageEventActionTypes.Loading:
            return { ...state, loading: action.data };
        default:
            return state;
    }
}

export enum PageEventActionTypes {
    CollapseToggle = 'CollapseToggle',
    Loading = 'Loading',
}