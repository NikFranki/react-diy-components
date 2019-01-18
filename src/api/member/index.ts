import { ISery, ILesson, IContentListData } from 'model';
import { serylist, lessonlist, contentlist } from './mockData';

const fetchSerylist = (): Promise<ISery[]> => {
    return Promise.resolve(serylist);
}

const fetchLessonlist = (): Promise<ILesson[]> => {
    return Promise.resolve(lessonlist);
};

const fetchContentlist = (): Promise<IContentListData[]> => {
    return Promise.resolve(contentlist);
};


export const memberAPI = {
    fetchSerylist,
    fetchLessonlist,
    fetchContentlist
};