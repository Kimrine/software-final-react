import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";

const EditProfile = () => {
    const {username} = useParams();
    const [profile, setProfile] = useState({});
    const [updateUser,setUpdateUser] = useState({});
    const navigate = useNavigate();

    const imageData = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleProfilePhoto = async (event) => {
        const file = event.target.files[0]
        const img = await imageData(file)
        setUpdateUser({...updateUser,
                          profilePhoto: img})
    }

    const handleHeaderPhoto = async (event) => {
        const file = event.target.files[0]
        const img = await imageData(file)
        setUpdateUser({...updateUser,
                          headerImage: img})
    }


    useEffect(async () => {
        try {
            let user = await authService.profile();
            if(user.dateOfBirth!==undefined){
                user.dateOfBirth = user.dateOfBirth.substring(0,10).toString();
            }
            setUpdateUser(user);
            setProfile(user);
        } catch (e) {
        }
    }, []);

    const editProfile = () => {
        authService.update(updateUser)
            .then(() =>
                navigate(`/login`))
            .catch(e=>alert(e));
    }

    return(
      <div className="ttr-edit-profile">
          <div className="border border-bottom-0">
              <Link to={`/profile/${profile.username}`} className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                  <i className="fa fa-close"></i>
              </Link>
              <button className="btn btn-dark rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2" onClick={editProfile}>
                  Save
              </button>
              <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
              <div className="mb-5 position-relative">
                  <img className="w-100 pf-header-image" src={profile.headerImage===undefined?"../images/nasa-profile-header.jpg":`${profile.headerImage}`}/>
                  <div className="bottom-0 left-0 position-absolute">
                      <div className="position-relative">
                          <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px pf-profile-image"
                               src={`${profile.profilePhoto}`}/>
                      </div>
                  </div>
              </div>
          </div>
          <form action="profile.html">
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="username">Username</label>
              <input id="username" title="Username" readOnly
                     className="p-0 form-control border-0"
                     value={`${profile.username}`}/>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="first-name">First name</label>
              <input id="first-name"
                     className="p-0 form-control border-0"
                     onChange={(e)=>
                        setUpdateUser({...updateUser,firstName: e.target.value})}
                     defaultValue={profile.firstName===undefined?``:`${profile.firstName}`}
                       />
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="last-name">Last name</label>
              <input id="last-name"
                     className="p-0 form-control border-0"
                     onChange={(e)=>
                         setUpdateUser({...updateUser,lastName: e.target.value})}
                     defaultValue={profile.lastName===undefined?``:`${profile.lastName}`}
                        />
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="p-0 form-control border-0" id="bio"
                onChange={(e)=>
                    setUpdateUser({...updateUser,biography: e.target.value})}
                defaultValue={profile.biography===undefined?``:`${profile.biography}`}>
              </textarea>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="date-of-birth">Date of birth</label>
              <input id="date-of-birth"
                     className="p-0 form-control border-0"
                     onChange={(e) =>
                         setUpdateUser({...updateUser,dateOfBirth: e.target.value})}
                     type="date"
                     defaultValue={profile.dateOfBirth===undefined?"1998-09-28":`${profile.dateOfBirth}`}
                     required="required"/>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="email">Email</label>
              <input id="email" placeholder={`${profile.email}`}
                     className="p-0 form-control border-0"
                     type="email"/>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label htmlFor="password">Reset password</label>
              <input id="password"
                     className="p-0 form-control border-0"
                     type="password"
                     onChange={(e) =>
                         setUpdateUser({...updateUser,password: e.target.value})}/>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label for="photo">Profile photo</label>
              <input id="photo"
                     className="p-0 form-control border-0"
                     onChange={e=> handleProfilePhoto(e)}
                     type="file" name="myImage" accept="image/png, image/jpg"
              />
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label for="header">Header image</label>
              <input id="header"
                     className="p-0 form-control border-0"
                     onChange={e=> handleHeaderPhoto(e)}
                     type="file" name="myImage" accept="image/png, image/jpg"/>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              <label for="account">Select account</label>
              <select
                className="p-0 form-control border-0"
                id="account" >
                  <option>Personal account</option>
                  <option selected>Academic account</option>
              </select>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              Marital status
              <input id="married"
                     type="radio" name="marital"/>
              <label for="married">Married</label>
              <input id="single" type="radio"
                     checked name="marital"/>
              <label for="single">Single</label>
            </div>
            <div className="border border-secondary rounded-3 p-2 mb-3">
              Topics of interest
              <input id="space" type="checkbox"
                     checked name="topics"/>
              <label for="space">Space</label>
              <input id="energy" type="checkbox" checked
                     name="topics"/>
              <label for="energy">Energy</label>
              <input id="politics" type="checkbox"
                     name="topics"/>
              <label for="politics">Politics</label>
            </div>
        </form></div>
    );
};

export default EditProfile;