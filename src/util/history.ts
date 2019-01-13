import createHashHistory from 'history/createHashHistory';

const History = createHashHistory();

export const goBack = () => {
    History.goBack();
}

export const push = (path: string) => {
    History.push(path);
}

export const replace = (path: string) => {
    History.replace(path);
}

export const go = (num: number) => {
    History.go(num);
}

export const goForward = () => {
    History.goForward();
}

export default History;