import { ISery, ILesson, IContentListData } from 'model';

export const serylist: ISery[] = [
    {id: 5, categoryName: "测试"},
    {id: 7, categoryName: "测试1"},
    {id: 8, categoryName: "测试2"},
    {id: 9, categoryName: "测试3"},
];

export const lessonlist: ILesson[] = [{
    coverName: "封面1",
    coverUrl: "",
    id: 3,
    mblockFile: "http://mblock-how-tos.oss-cn-shenzhen.aliyuncs.com/25e203a018bf11e99c7ebd3fdbe1fdfb?type="
}];

export const contentlist: IContentListData[] = [
    {id: 8, contentTitle: "内容标题", contents: [{content: "", type: "image"}, {content: "123", type: "text"}]},
    {id: 15, contentTitle: "dfdasf", contents: [{content: "", type: "image"}, {content: "456", type: "text"}]}
];