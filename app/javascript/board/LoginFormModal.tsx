import * as React from 'react'
import { useContext } from 'react'
import GenericModal from '../shared/GenericModal'
import csrfToken from '../shared/csrfToken'
import { returnToHere } from '../shared/authPaths'
import { StateContext } from './StateProvider'

function LoginFormModal() {
  const {
    ui: {
      data: { loginFormVisible },
      actions: { hideLoginForm },
    },
  } = useContext(StateContext)

  return (
    <GenericModal
      isOpen={loginFormVisible}
      onRequestClose={hideLoginForm}
      title=""
    >
      <div className="login-popup-form">
        <h1>Sign in to post and vote</h1>
        <form method="POST" action="/sign_in">
          <div className="form-item">
            <label>
              Your Email
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                autoFocus
              />
            </label>
          </div>
          <div className="form-item">
            <button type="submit" className="btn primary">
              Email me a sign-in link
            </button>
          </div>
          <input type="hidden" name="return_to" value={returnToHere()} />
          <input
            type="hidden"
            name="authenticity_token"
            value={csrfToken()}
          />
        </form>
      </div>
    </GenericModal>
  )
}

export default LoginFormModal
