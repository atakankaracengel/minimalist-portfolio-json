async function fetchData(url, retryCount = 3, delay = 1000) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    if (retryCount > 0) {
      console.warn(`Retrying ${url} (${retryCount} attempts left)...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchData(url, retryCount - 1, delay);
    } else {
      throw error;
    }
  }
}
