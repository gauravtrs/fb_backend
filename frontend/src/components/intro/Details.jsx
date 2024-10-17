import { useState } from "react";
import Bio from "./Bio";

export default function Detail({  img, value, placeholder, name ,updateDetails ,handleBioChange 
    ,infos ,setVisible,text ,rel}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="add_details_flex " onClick={() =>setShow(true)}>
        {value ? (
          <div className="info_profile ">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {show && <Bio placeholder={placeholder} name={name}  
      updateDetails={updateDetails} handleBioChange={handleBioChange} infos={infos} detail setShow={setShow} rel={rel}/>}
    </div>
  );
}
