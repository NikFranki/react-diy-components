export interface Media {
    type: string,
    url: string,
}

export interface StepContent {
    title: string,
    media: Media,
    explain: string,
}

export interface Step {
    stepName: string,
    content: StepContent[],
}

export interface Lesson {
    lessonName: string,
    steps: Step[],
}

export interface Sery {
    tutorialName: string,
    lessons: Lesson[],
}

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