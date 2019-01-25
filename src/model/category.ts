import { ISery, ILesson, IContentListData } from 'model';

export interface Tutorial {
    cursery: string,
    curlesson: string,
    curstep: string,
    curseryId: number,
    curlessonId: number,
    serylist: ISery[],
    lessonlist: ILesson[],
    contentlist: IContentListData[],
    isShowDrawer: boolean
}