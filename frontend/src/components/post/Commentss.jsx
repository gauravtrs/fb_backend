import Moment from "react-moment";

export default function Commentss({ comment }) {

    
    return (
        <div className="comment">
          <img src={comment.commentedBy.picture} alt="" className="comment_img" />
          <div className="comment_col">
            <div className="comment_wrap">
              <div className="comment_name">
                {comment.commentedBy.first_name} {comment?.commentedBy?.last_name}
              </div>
              <div className="comment_text">{comment.comment}</div>
            </div>
            {comment.image && (
              <img src={comment.image} alt="" className="comment_image" />
            )}
            <div className="comment_actions">
              <span>Like</span>
              <span>Reply</span>
              <span>
                <Moment fromNow interval={30}>
                  {comment.commentedAt}
                </Moment>
              </span>
            </div>
          </div>
        </div>
      );
    }
    