import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelope } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa'
import bg from "../assets/bg.png";
import fb from "../assets/facebook.png"
import google from "../assets/google.png"


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email, 
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <div className="ellipse-2" />
            <h3 className="login-title">LOGIN</h3>
        </section>

        <section className="loginpage" >
          <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="email form-group text-3">
                        <FaEnvelope className="icon_field"/>
                        <input type="email" className="form-control" id="email" name="email" value={email} 
                        placeholder="Enter your email" onChange={onChange}/>
                    </div>
                    <div className="password form-group text5">
                        <FaLock className="icon_field"/>
                        <input type="password" className="form-control" id="password" name="password" value={password} 
                        placeholder="Enter your password" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                    <div className="ellipse-4" />
                </form>

            </section>
          </section>
        </>
    {/*
    return <>
        <section className="heading">
          <h1>
              <FaSignInAlt /> Login
          </h1>
          <p>Login in and start setting goals</p>
        </section>
    
        <div className="loginpage">
            <img src="" />
            <p className="text-2">LOGIN</p>
            <div className="ellipse-2" />
            <div className="ellipse-3" />
            <div className="line-1" />
            <div className="line-2" />
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group text-3">
                        <input type="email" className="form-control" id="email" name="email" value={email} 
                        placeholder="Enter your email" onChange={onChange}/>
                    </div>
                    <div className="form-group text5">
                        <input type="password" className="form-control" id="password" name="password" value={password} 
                        placeholder="Enter your password" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                    <div className="ellipse-4" />
                </form>
            </section>
        </div>
    </>
    
    */}
}



export default Login