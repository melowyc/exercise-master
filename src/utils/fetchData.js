export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "86d58ad5famsh3e3439f46cd932cp12363bjsn4665c150c8fc",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e93ff7e78dmsh4963acbdd262c3cp1728b2jsn5b7bc90cdc3a",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
