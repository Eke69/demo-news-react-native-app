export interface Article {
  readonly source: { id: string; name: string };
  readonly author: string | null;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly urlToImage: string;
  readonly publishedAt: string;
  readonly content: string;
}
