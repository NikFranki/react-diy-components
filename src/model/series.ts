export interface ISery {
    categoryName: string,
    id: number,
}

export interface ILesson {
    coverName: string,
    coverUrl: string,
    id: number,
    mblockFile: string
}

export interface IContent {
    type: string,
    content: string,
}
export interface IContentListData {
    contentTitle: string,
    contents: IContent[],
    id: number,
}