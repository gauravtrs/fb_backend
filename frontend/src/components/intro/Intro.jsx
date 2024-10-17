import { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";
export default function Intro({ detailss, visitor , setOthername }) {

  


  useEffect(()=>{
    setDetails(detailss)
    setInfos(detailss)
  },[detailss])

  const initial = {
    bio: detailss?.bio ? detailss.bio : "",
    otherName: detailss?.otherName ? detailss.otherName : "",
    job: detailss?.job ? detailss.job : "",
    workplace: detailss?.workplace ? detailss.workplace : "",
    highSchool: detailss?.highSchool ? detailss.highSchool : "",
    college: detailss?.college ? detailss.college : "",
    currentCity: detailss?.currentCity ? detailss.currentCity : "",
    hometown: detailss?.hometown ? detailss.hometown : "",
    relationShip: detailss?.relationShip ? detailss.relationShip : "",
    instagram: detailss?.instagram ? detailss.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);



  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const handleBioChange = (e) => {
    const {name ,value} =e.target
    setInfos({ ...infos,[name]:value });
    setMax(100 - e.target.value.length);
  };

const updateDetails =async() => {

  try {
    console.log("sent");
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
      {
        infos,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setShowBio(false);
    setDetails(data);
    setOthername(data.otherName);

  } catch (error) {
    console.log(error.response.data.message);
  }
};





  return (

    <div className="profile_card">
    <div className="profile_card_header">Intro</div>
    {details?.bio && !showBio && (
      <div className="info_col">
        <span className="info_text">{details?.bio}</span>
        {!visitor && (
          <button
            className="gray_btn hover1"
            onClick={() => setShowBio(true)}
          >
            Edit Bio
          </button>
        )}
      </div>
    )}
    {!details?.bio && !showBio && !visitor && (
      <button
        className="gray_btn hover1 w100"
        onClick={() => setShowBio(true)}
      >
        Add Bio
      </button>
    )}


      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleBioChange={handleBioChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationShip && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details?.relationShip}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100" onClick={()=>setVisible(true)}>Edit Details</button>
      )}
      {visible && !visitor && <EditDetails details={details}
       updateDetails={updateDetails} handleBioChange={handleBioChange} infos={infos} setVisible={setVisible}/>}

      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
}
