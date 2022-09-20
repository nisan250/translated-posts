import { useEffect, useMemo, useState } from "react";
import useHttp from "./use-http";

const data = [
  {
    id: 1,
    title: "one",
    body: "test one",
    date: new Date(),
  },
  {
    id: 2,
    title: "two",
    body: "test two",
    date: new Date(),
  },
  {
    id: 3,
    title: "three",
    body: "test three",
    date: new Date(),
  },
  {
    id: 4,
    title: "four",
    body: "test four",
    date: new Date(),
  },
  {
    id: 5,
    title: "five",
    body: "test one",
    date: new Date(),
  },
  {
    id: 6,
    title: "six",
    body: "test two",
    date: new Date(),
  },
  {
    id: 7,
    title: "seven",
    body: "test three",
    date: new Date(),
  },
  {
    id: 8,
    title: "eight",
    body: "test four",
    date: new Date(),
  },
  {
    id: 9,
    title: "nine",
    body: "test one",
    date: new Date(),
  },
  {
    id: 10,
    title: "Ten",
    body: "test two",
    date: new Date(),
  },
  {
    id: 11,
    title: "eleven",
    body: "test three",
    date: new Date(),
  },
  {
    id: 12,
    title: "Twelve",
    body: "test four",
    date: new Date(),
  },
];

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [votes, setVotes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [currentLang, setCurrentLang] = useState("en");

  const { isLoading, error, sendRequest: fetchPosts } = useHttp();

  const handlePostDelete = (id) => {
    setPosts((current) => current.filter((post) => post.id !== id));
  };

  const handleVoteUp = (id) => {
    setVotes((current) => ({ ...current, [id]: current[id] + 1 }));
  };

  const handleVoteDown = (id) => {
    setVotes((current) => ({ ...current, [id]: current[id] - 1 }));
  };

  const handleCurrentLangChange = (lang) => {
    // Fetch the new API
    setCurrentLang(lang);
  };

  //-----------------------------
  useEffect(() => {
    const temp = () => {
      const postsVotes = {};

      for (const post of data) {
        postsVotes[post.id] = 0;
      }

      setPosts(data);
      setVotes(postsVotes);
      //setTranslatedPosts(postsVotes);
    };
    temp();
  }, []);

  const lastPage = Math.ceil(posts.length / 5) || 1;
  // const renderedPosts = posts.slice(0, currentPage * 5), [];
  const renderedPosts = useMemo(
    () => posts.slice(0, currentPage * 5),
    [currentPage, posts]
  );
  //-----------------------------
  // useEffect(() => {
  //   const transformPosts = (posts) => {
  //     const postsVotes = {};

  //     for (const post in posts) {
  //       postsVotes[post.id] = {id: post.id, vote: 0};
  //     }

  //     setPosts(posts);
  //     setVotes(postsVotes);
  // Fetch the new API

  //   };

  //   fetchPosts(
  //     { url: 'https://my.api.mockaroo.com/posts', headers: {'X-API-Key': 'ad43d380'} },
  //     transformPosts
  //   );
  // }, [fetchPosts]);

  return {
    // posts: translatedPosts,
    renderedPosts,
    votes,
    fetchOptions: {
      isLoading,
      error,
      refecth: fetchPosts,
    },
    translations: {
      currentLang,
      handleCurrentLangChange,
    },
    handles: {
      handlePostDelete,
      handleVoteUp,
      handleVoteDown,
    },
    pagination: {
      lastPage,
      currentPage,
      setCurrentPage,
    },
  };
}
