export async function fetchGameData(itemId) {
  try {
    const query = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${itemId}`,
    );
    const response = await query.text();
    let parser = new DOMParser();
    let xml = parser.parseFromString(response, "text/xml");

    const designers = Array.from(
      xml.querySelectorAll("link[type=boardgamedesigner]"),
    ).map((designer) => designer.getAttribute("value"));

    const data = {
      name: xml.getElementsByTagName("name")[0].getAttribute("value"),
      image: xml.getElementsByTagName("image")[0].textContent ?? null,
      year:
        xml.getElementsByTagName("yearpublished")[0].getAttribute("value") ??
        null,
      description:
        xml.getElementsByTagName("description")[0].textContent ?? null,
      designers: designers ?? null,
    };

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
}
