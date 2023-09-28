import { ExtendedRecordMap } from 'notion-types';

interface IPost {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    createTime: string;
    cover: string;
    thumbnail: string;
    [key: string]: string | string[];
}

declare const fetchPages: (databaseID: string) => Promise<IPost[] | null>;

declare const fetchPage: (pageID: string) => Promise<{
    info: IPost;
    recordMap: ExtendedRecordMap;
} | undefined>;

export { fetchPage, fetchPages };
