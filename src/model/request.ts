export interface IReducerAction {
    /**
     * 操作类型
     * 
    * @type {string}
     * @memberof ReducerAction
     */
    type: string,
    /**
     * 操作提供的数据
     * 
     * @type {{
     *         [key: string]: any
     *     }}
     * @memberof ReducerAction
     */
    payload: {
        [key: string]: any
    }
}

export interface IRequest<M, D> {
    (data: M, success?: Function, fail?: Function): (dispatch: D) => Promise<void>
}

export interface IRequestNoParam<D> {
    (success?: Function, fail?: Function): (dispatch: D) => Promise<void>
}

export interface IAction<D> {
    (data: any): IReducerAction
}

export interface IActionNoParam<D> {
    (): IReducerAction
}

export interface ILessonData {
    categoryId: number,
}

export interface IContentData {
    coverId: number,
}