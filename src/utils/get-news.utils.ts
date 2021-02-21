const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=dafa84ee37ad4d3c82f990667ad595cd";

export async function getNews() {
  let result = await fetch(url).then((response) => response.json());
  return result.articles;
}
