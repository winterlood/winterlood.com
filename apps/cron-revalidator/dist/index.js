"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sitemapper_1 = __importDefault(require("sitemapper"));
const BASE_URL = "https://winterlood.com";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sitemap = new sitemapper_1.default({});
        const sites = yield sitemap
            .fetch(`${BASE_URL}/sitemap.xml`)
            .then(({ sites }) => sites);
        const paths = sites.map((site) => {
            return site.split(BASE_URL)[1];
        });
        for (let path of paths) {
            const res = yield fetch(`${BASE_URL}/api/revalidate?path=${path}`);
            if (res.ok) {
                const resJson = yield res.json();
                console.log(Object.assign({ path }, resJson));
            }
            else {
                console.error({ path, status: res.status });
            }
        }
    });
}
main();
