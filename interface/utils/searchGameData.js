export async function searchGameData(keyword, controller) {
  try {
    const query = await fetch(
      `https://boardgamegeek.com/xmlapi2/search?query=${keyword}&type=boardgame&exact=0`,
      { signal: controller.signal },
    );
    const response = await query.text();

    let parser = new DOMParser();
    let xml = parser.parseFromString(response, 'text/xml');

    const itemElements = xml.getElementsByTagName('item');

    const filteredResults = Array.from(itemElements).map((itemElement) => {
      const nameElement = itemElement.getElementsByTagName('name')[0];
      const name = nameElement.getAttribute('value');
      const id = itemElement.getAttribute('id');
      const yearPublished =
        itemElement.getElementsByTagName('yearpublished')[0];
      const year = yearPublished ? yearPublished.getAttribute('value') : null;

      const boardgameResult = {
        name: name,
        id: id,
        year: year ?? null,
      };

      return boardgameResult;
    });

    return filteredResults;
  } catch (error) {
    console.error('Error while search data.');
    throw error;
  }
}
