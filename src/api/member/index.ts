import { MemberEntity, Sery } from 'model';
import { members, series } from './mockData';

const baseURL = 'https://api.github.com/orgs/lemoncode';

const fetchMembers = (): Promise<MemberEntity[]> => {
  return Promise.resolve(members);
};

const fetchSeries = (): Promise<Sery[]> => {
    return Promise.resolve(series);
}

const fetchMembersAsync = (): Promise<MemberEntity[]> => {
    const membersURL = `${baseURL}/members`;

    return fetch(membersURL)
      .then((response) => (response.json()))
      .then(mapToMembers);
};

const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
    return githubMembers.map(mapToMember);
};

const mapToMember = (githubMember: any): MemberEntity => {
    return {
        id: githubMember.id,
        login: githubMember.login,
        avatar_url: githubMember.avatar_url,
    };
};

export const memberAPI = {
    fetchMembers,
    fetchSeries,
    fetchMembersAsync
};