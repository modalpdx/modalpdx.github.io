  export const pagePostsLoader = () => {
    return fetch("/posts.json").then((res) => res.json());
  }