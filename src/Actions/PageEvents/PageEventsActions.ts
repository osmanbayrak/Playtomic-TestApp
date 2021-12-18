import { Dispatch } from 'react';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';

export const toggleCollapse = (collapsed: boolean) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            type: PageEventActionTypes.CollapseToggle,
            data: collapsed,
        });
    };
};

export const toggleLoading = (loading: boolean) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            type: PageEventActionTypes.Loading,
            data: loading,
        });
    };
};

export interface PageEventActionsDeclerations {
    toggleCollapse(collapsed: boolean): any;
    toggleLoading(loading: boolean): any;
}