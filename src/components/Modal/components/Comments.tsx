import { useRef, memo, useEffect } from "react";
import { Comment } from "../../../types/Types";

type CommentsSectionProps = {
  comments: Comment[] | undefined;
};

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <>
      {comments?.map((comment) => (
        <li key={comment.id} className="comment">
          <img className="comment__icon" src={comment.img} alt="" />
          <article>
            <div className="comment__info">
              <p className="comment__creator">{comment.creator}</p>
              <p className="comment__date">{comment.createdAt}</p>
            </div>
            <p className="comment__message">{comment.message}</p>
          </article>
        </li>
      ))}
      <div ref={scrollRef}></div>
    </>
  );
};

export default memo(CommentsSection);
