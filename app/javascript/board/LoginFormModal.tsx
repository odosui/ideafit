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
      <div className="login-form">
        <h1>Sign in to post and vote</h1>
        <form className="login-form" method="POST" action="/sign_in">
          <label className="field">
            Your Email
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              required
              autoFocus
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            Email me a sign-in link
          </button>
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
