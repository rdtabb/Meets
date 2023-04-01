import GeneralContext from "../../context/GeneralContext"
import { useContext } from "react"
import React, { Suspense } from "react"
import LoadingImage from "../loading/LoadingImage"
import LoadingHeader from "../loading/LoadingHeader"

const Avatar = React.lazy(() => import("./AvatarImage"))
const Heading = React.lazy(() => import("./Heading"))

type DescProps = {
  username: string
  userPicture: string
  status: string
}

const Desc = ({username, userPicture, status}: DescProps) => {

  const { handleAddPostButton, handlePopup } = useContext(GeneralContext)

  return (
    <section className="profile">
        <div className="profile__wrapper">
            <Suspense fallback={<LoadingImage />}>
              <Avatar userPicture={userPicture} />
            </Suspense>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <Suspense fallback={<LoadingHeader />}>
                      <Heading username={username}/>
                    </Suspense>
                    <button onClick={handlePopup} type="button" className="profile__edit-button"></button>
                </div>
                <p className="profile__description">{status}</p>
            </div>
        </div>
        <button onClick={handleAddPostButton} type="button" className="profile__add-button"></button>
    </section>
  )
}

export default Desc
