import { registerUser } from "../services/userService"
import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify"

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const signup = async (event) => {
        if(email == '')
            toast.warn('email must be entered')
        else if(password == '')
            toast.warn('password must be entered')
        else if(role == '')
            toast.warn('Please select a role')
        else{
            try {
                const result = await registerUser(email, password, role)
                if (result.status === 'success') {
                    toast.success('User registered successfully.')
                    navigate('/') // Redirect to login page
                } else {
                    toast.error(result.error || 'Registration failed')
                }
            } catch (error) {
                toast.error("An unexpected error occurred.")
            }
        }
    }

    return (
        <div className="container w-50">
            <h2 className="mb-4 mt-3">Register</h2>

            <div className="mt-3 mb-3">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="inputRole" className="form-label">Role</label>
                <select 
                    id="inputRole" 
                    className="form-select" 
                    value={role}
                    onChange={event => setRole(event.target.value)}
                >
                    <option value="">-- Select Role --</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>Signup</button>
            </div>

            <div>
                Already have an account? then to login <Link to="/">Click here</Link>
            </div>
        </div>
    )
}

export default Register