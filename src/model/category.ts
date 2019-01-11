import { MemberEntity } from './memberEntity';

export interface Category {
    category: string;
    num: number;
    members: MemberEntity[]
}