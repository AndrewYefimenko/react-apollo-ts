import casual from 'casual';

casual.seed(123);

export const fakeRepo = (index: number) => ({
  "id": casual.uuid + index,
  "nameWithOwner": casual.title,
  "description": casual.text,
  "url": casual.url,
  "__typename": "repository"
});

export const fakeRepos = (n: number) => Array(n).fill(null).map((_, i) => fakeRepo(i));