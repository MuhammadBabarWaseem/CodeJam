import React , {useState} from 'react'
import { signInAuthUserWithEmailAndPassword } from '../Utils/Firebase'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
 

const defaultFormField = {
    email: '',
    password: '',
}

function Login() {

    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;

    const resetFormFields = () => { setFormFields(defaultFormField) }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields()
            swal("Hurrah!", "Login Successful","success");
            navigate('/homepage')
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    swal("Oops!", "Incorrect password for Email","warning");
                    break;
                case 'auth/user-not-found':
                    swal("Oops!", "User not found / Exist","warning");
                    break;
                default:
                    console.log(error)
            }
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
                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                    <input type="email" autoComplete='off' required className="form-control" name="email" value={email} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} id="exampleInputEmail2" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                    <input type="password" autoComplete='off' required className="form-control" name="password" value={password} onChange={handleChange} onFocus={(e) => e.target.placeholder = ''} id="exampleInputPassword2"/>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    )
}

export default Login;