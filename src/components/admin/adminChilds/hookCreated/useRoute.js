const useRoute = (location) => {
  const href = location.pathname.split("/");
  href.shift();
  let path = "";
  let route = [];

  for (let i = 0; i < href.length; i++) {
    path += "/" + href[i];
    const item = { title: href[i], path: path };
    route.push(item);
  }

  return [route];
};

export default useRoute;
