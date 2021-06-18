import { useAuth } from '../contexts/AuthContext'
import api from '../network/axios'

const Test = () => {

  const { login, logout, signup, currentUser } = useAuth()

  const handleLogin = async () => {
    //Get mail and pass from form
    const mockEmail = "test@test.com"
    const mockPassword = "12345678"

    const res = await login(mockEmail, mockPassword) //login against firebase
    const token = await res.user.getIdToken(); 
    localStorage.setItem("token", token) // save id token in localStorage
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleServerTest = async () => {
    const res = await api.get('/pets')
    console.log(res)
  }

  const handleSignup = async () => {
    const mockEmail = "test@test.com"
    const mockPassword = "12345678"
    const values = {
      email: mockEmail
    } //TODO: other user info
    try {
      const res = await signup(mockEmail, mockPassword) //login against firebase
      const token = await res.user.getIdToken(); 
      localStorage.setItem("token", token) //save id token in localStorage

      //Send user info to server (not the password)
      await api.post('/auth/signup', values)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      { currentUser ? (
        <div>
          <h1>{currentUser.email}</h1>
          <button onClick={handleLogout}>
            Log out  
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>
            Log In
          </button>
          <button onClick={handleSignup} style={{marginLeft: "10%"}}>
            Sign Up
          </button>
        </div>
      )}
      <div>
        <button onClick={handleServerTest} style={{marginTop: "10%"}}>
          Test Server
        </button>
      </div>
    </div>
  )
}

export default Test