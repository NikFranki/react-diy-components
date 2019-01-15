import { Sery } from './series';
import { MemberEntity } from './memberEntity';

export interface Category {
    category: string,
    members: MemberEntity[],
    series: Sery[],
    cursery: string,
    curlesson: string,
    curstep: string,
    curtitle: string
}