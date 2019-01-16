import { Sery, MemberEntity, ISery, ILesson, IContentListData } from 'model';

export interface Tutorial {
    category: string,
    members: MemberEntity[],
    series: Sery[],
    cursery: string,
    curlesson: string,
    curstep: string,
    curseryId: number,
    curlessonId: number,
    curtitle: string,
    serylist: ISery[],
    lessonlist: ILesson[],
    contentlist: IContentListData[],
}