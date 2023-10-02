import { client } from "../index";

const keyword = "osdar";

await client.index("movies").updateTypoTolerance({
  enabled: false,
});

console.log(
  `오타 허용하지 않을 때, ${keyword} 검색 결과:\n`,
  (await client.index("movies").search(keyword)).estimatedTotalHits
);

await client.index("movies").updateTypoTolerance({
  enabled: true,
  minWordSizeForTypos: {
    oneTypo: 2,
    twoTypos: 4,
  },
});

const resultAfterTypoSetting = await client.index("movies").search(keyword);
console.log(
  `오타 허용 후, ${keyword} 검색 결과:\n`,
  resultAfterTypoSetting.estimatedTotalHits,
  resultAfterTypoSetting.hits.map((v) => v.title)
);
