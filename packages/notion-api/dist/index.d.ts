import { ExtendedRecordMap } from 'notion-types';

interface NotionCodeBlock {
    block: {
        properties: {
            title: string[][];
            language: string[][];
            caption: string[][];
        };
    };
}
interface NotionPage {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    createTime: string;
    cover: string;
    thumbnail: string;
    [key: string]: string | string[];
}

declare const fetchPages: (databaseID: string) => Promise<NotionPage[] | {
    blurDataURL: string | undefined;
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    createTime: string;
    cover: string;
    thumbnail: string;
}[] | null>;

declare const fetchPage: (pageID: string) => Promise<{
    info: NotionPage;
    recordMap: ExtendedRecordMap;
} | undefined>;

export { NotionCodeBlock, NotionPage, fetchPage, fetchPages };
