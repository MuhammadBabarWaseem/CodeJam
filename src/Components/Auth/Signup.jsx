import React , {useState} from 'react'
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth } from '../Utils/Firebase';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
 
function Signup() {

    const defaultFormField = {
        firstName : '',
        lastName : '',
        email: '',
        password: '',
    }

    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormField);
    const { firstName, lastName, email, password } = formFields;

    const resetFormFields = () => { setFormFields(defaultFormField) }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { firstName , lastName})
            swal("Hurrah!", "User Created Successfully", "success");
            resetFormFields()
            navigate('/signin')

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                resetFormFields()
            }
            swal("Oops!", "Email Already In Use", "warning");
        //    alert("Email already in use" , error)
        }   

    }
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 grid text-center g-col-6">
                    <label htmlFor="exampleInputEmail2" className="form-label">First Name</label>
                    <input autoComplete='off' type="text" className="form-control 1" name="firstName" value={firstName} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} id="exampleInputEmail2 b" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 grid text-center g-col-6">
                    <label htmlFor="exampleInputEmail2" className="form-label">Last Name</label>
                    <input autoComplete='off' type="text" className="form-control 2" name="lastName" value={lastName} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} id="exampleInputEmail2 c" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 grid text-center g-col-6">
                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                    <input autoComplete='off' type="email" className="form-control 3" id="exampleInputEmail2 d" name="email" value={email} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                    <input autoComplete='off' type="password" className="form-control 4" name="password" value={password} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} id="exampleInputPassword2 e" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;