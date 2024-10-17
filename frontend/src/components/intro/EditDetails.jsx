import React, { useRef } from 'react'
import Details from './Details'
import UseclickOutside from '../../helpers/clickOutside'

const EditDetails = ({details ,updateDetails ,handleBioChange ,infos ,setVisible}) => {
    const model =useRef(null)
    UseclickOutside(model ,() =>setVisible(false))

  return (
   
    <div className="blur">
    <div className="postBox infosBox" ref={model}>
      <div className="box_header">
        <div className="small_circle" onClick={() => setVisible(false)}>
          <i className="exit_icon"></i>
        </div>
        <span>Edit Details</span>
      </div>
      <div className="details_wrapper scrollbar">
        <div className="details_col">
          <span>Customize Your Intro</span>
          <span>Details you select will be public</span>
        </div>

        <div className="details_header">Other Name</div>
        <Details
          value={details?.otherName}
          img="studies"
          placeholder="Add other name"
          name="otherName"
          text="other Name"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <div className="details_header">Work</div>
        <Details
          value={details?.job}
          img="job"
          placeholder="Add job title"
          name="job"
          text="a job"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <Details
          value={details?.workplace}
          img="job"
          placeholder="Add a workplace"
          name="workplace"
          text="workplace"
          handleBioChange={handleBioChange}          
          updateDetails={updateDetails}
          infos={infos}
        />
        <div className="details_header">Education</div>
        <Details
          value={details?.highSchool}
          img="studies"
          placeholder="Add a high school"
          name="highSchool"
          text="a high school"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <Details
          value={details?.college}
          img="studies"
          placeholder="Add a college"
          name="college"
          text="college"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <div className="details_header">Current City</div>
        <Details
          value={details?.currentCity}
          img="home"
          placeholder="Add a current city"
          name="currentCity"
          text="a current city"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <div className="details_header">Hometown</div>
        <Details
          value={details?.hometown}
          img="home"
          placeholder="Add hometown"
          name="hometown"
          text="hometown"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
        <div className="details_header">Relationship</div>
        <Details
          value={details?.relationShip}
          img="relationship"
          placeholder="Add instagram"
          name="relationShip"
          text="relationship"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
          rel
        />
        <div className="details_header">Instagram</div>
        <Details
          value={details?.instagram}
          img="home"
          placeholder="Add instagram"
          name="instagram"
          text="instagram"
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
          infos={infos}
        />
      </div>
    </div>
  </div>

  )
}

export default EditDetails