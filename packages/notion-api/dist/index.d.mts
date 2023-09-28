import * as _notionhq_client_build_src_api_endpoints from '@notionhq/client/build/src/api-endpoints';
import { ExtendedRecordMap } from 'notion-types';

interface IPost {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    createTime: string;
    cover: string;
    [key: string]: string | string[];
}
type IExtraPage = "EXPERIENCE";

declare const fetchPostRecordMap: (pageID: string) => Promise<{
    postInfo: IPost;
    postRecordMap: ExtendedRecordMap;
} | undefined>;
declare const fetchPosts: () => Promise<IPost[] | null>;
declare const fetchRawPosts: () => Promise<_notionhq_client_build_src_api_endpoints.QueryDatabaseResponse | null>;
declare const fetchPageByID: (page: IExtraPage) => Promise<ExtendedRecordMap | undefined>;

export { fetchPageByID, fetchPostRecordMap, fetchPosts, fetchRawPosts };
