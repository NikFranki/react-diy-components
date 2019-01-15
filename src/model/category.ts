import { Sery, MemberEntity, ISery } from 'model';

export interface Tutorial {
    category: string,
    members: MemberEntity[],
    series: Sery[],
    cursery: string,
    curlesson: string,
    curstep: string,
    curtitle: string,
    serylist: ISery[]
}