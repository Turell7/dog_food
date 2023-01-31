import { useState } from 'react'
import { EditUserAvatar } from './EditUserAvatar'
import { EditUserData } from './EditUserData'

export function EditProfile({ submitAdditionAction, user }) {
  const [edit, setEdit] = useState(true)
  return (
    <div className="hero bg-base-200">

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Profile</h1>
          <p className="py-6">{edit ? 'Edit profile:' : 'Edit Avatar:'}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          { edit
            ? (
              <EditUserData
                change={setEdit}
                submitAdditionAction={submitAdditionAction}
                user={user}
              />
            )
            : (
              <EditUserAvatar
                change={setEdit}
                submitAdditionAction={submitAdditionAction}
                user={user}
              />
            ) }
        </div>
      </div>
    </div>
  )
}
