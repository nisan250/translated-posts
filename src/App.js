import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Button from "./components/general/Button";
import PostItem from "./components/posts/PostItem";
import PostsThumbs from "./components/posts/PostThumbs";
import AysncDataSkeleton from "./components/ui/AysncDataSkeleton";
import useHttp from "./hooks/use-http";
import usePosts from "./hooks/use-posts";
import { useIntersectionObserver } from "./hooks/useIntersectionObserverDef";

function App() {
  const {
    renderedPosts,
    votes,
    fetchOptions: { isLoading, error, refecth },
    handles: { handlePostDelete, handleVoteUp, handleVoteDown },
    pagination: { lastPage, currentPage, setCurrentPage },
    // transltions: { currentLang, handleCurrentLangChange }
  } = usePosts();

  const nextPageRef = useIntersectionObserver(
    useCallback(() => setCurrentPage((current) => current + 1), []),
    currentPage !== lastPage
  );

  // const {
  //   isLoading: isLoadinTranslation,
  //   error: errorTranslation,
  //   sendRequest: fetchTranslation,
  // } = useHttp();
  // //-----------------------------
  // useEffect(() => {
  //   console.log("ss");
  //   const transformTranslations = (translations) => {
  //     console.log(translations);
  //   };

  //   fetchTranslation(
  //     {
  //       url: "https://api.cognitive.microsofttranslator.com",
  //       headers: {
  //         "Content-Type": "charset=UTF-8",
  //         "Ocp-Apim-Subscription-Key": "083f98b1ea1e49bcbadc13de4616d9a8",
  //         location: "centralus",
  //       },
  //     },
  //     transformTranslations
  //   );
  // }, [fetchTranslation]);

  return (
    <div className="app">
      {/* <select onChange={handleCurrentLangChange} value={currentLang}>
        {options.map((option) => {
          return <option>{option}</option>;
        })}
      </select> */}
      <AysncDataSkeleton
        subject={"posts"}
        isLoading={isLoading}
        hasError={error}
        isEmpty={renderedPosts.length === 0}
        tryAgainFn={refecth}
      >
        {renderedPosts.map((post) => (
          <PostItem
            key={post.id}
            body={post.body}
            date={post.date}
            title={post.title}
            leftSide={
              <Button onClick={() => handlePostDelete(post.id)}>X</Button>
            }
            rightSide={
              <PostsThumbs
                voteUp={() => handleVoteUp(post.id)}
                voteDown={() => handleVoteDown(post.id)}
                vote={votes[post.id]}
              />
            }
          />
        ))}
      </AysncDataSkeleton>
      <div ref={nextPageRef}></div>
    </div>
  );
}

export default App;
