import { IDrawer } from 'model';
const showDrawer = (isShowDrawer: IDrawer) => ({
    type: 'show_drawer',
    payload: {isShowDrawer}
});

export default {
    showDrawer
};