import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackgrounds = ({ text, setText, user  ,type2}) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef =useRef(null)

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emojiobject) => {
    const ref = textRef.current;
    let emoji = emojiobject.emoji;

    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  console.log(text);

  return (
     
    <div className={type2 ? "images_input" :''}>
             <div className={!type2 ? "flex_center" :''}>
                <textarea
                  ref={textRef}
                  maxLength="100"
                  value={text}
                  placeholder={`What's on your mind, ${user.first_name}`}
                  className={`post_input ${type2 ? "input2" :''}`}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>

    <div className={!type2 ? "post_emojis_wrap" :''}>
      {picker && (
        <div className={`comment_emoji_picker ${
            type2 ? "movepicker2" : "rlmove"
          }`}>
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
       {!type2 && <img src="../../../icons/colorful.png" alt="" /> }
      
       <i className={`emoji_icon_large ${type2 ? "moveleft" :''}`}
        onClick={() => {
          setPicker((prev) => !prev);
        }}

      ></i>
    </div>
    </div>
  );
};

export default EmojiPickerBackgrounds;
