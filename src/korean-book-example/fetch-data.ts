import { client } from "../index";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)));

if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET)
  throw new Error("네이버 책 검색 API 호출을 위해 .env 파일을 설정해주세요.");

const myHeaders = new Headers();
myHeaders.append("X-Naver-Client-Id", process.env.NAVER_CLIENT_ID);
myHeaders.append("X-Naver-Client-Secret", process.env.NAVER_CLIENT_SECRET);

const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const title = "프로그래밍";

export interface NaverBookSearchResult {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: Item[];
}

export interface Item {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

const response = await fetch(
  `https://openapi.naver.com/v1/search/book_adv.json?d_titl=${title}&display=100`,
  requestOptions
);
const data: NaverBookSearchResult = await response.json();

fs.writeFileSync(path.join(__dirname, "books.json"), JSON.stringify(data));
