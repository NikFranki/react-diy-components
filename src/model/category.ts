import { Sery } from './series';
import { MemberEntity } from './memberEntity';

export interface Category {
    category: string,
    num: number,
    members: MemberEntity[],
    series: Sery[]
}