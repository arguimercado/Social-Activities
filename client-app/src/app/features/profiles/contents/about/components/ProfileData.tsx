import { useStore } from '../../../../../stores/store'



const ProfileData = () => {
  
  const {profileStore: {profile}} = useStore();

  return (
   <>
    <p>
      {profile?.bio}
    </p>
   </>
  )
}

export default ProfileData