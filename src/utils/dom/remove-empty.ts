export default function removeEmpty($article: cheerio.Cheerio, $: cheerio.Root): cheerio.Root {
  $article.find('p').each((index, p) => {
    const $p: cheerio.Cheerio = $(p);
    if ($p.find('iframe, img').length === 0 && $p.text().trim() === '')
      $p.remove();
  });

  return $;
}
