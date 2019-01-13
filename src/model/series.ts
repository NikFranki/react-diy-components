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