import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Formik & yup------------------------------------------------
import {useFormik} from 'formik'
import * as Yup from 'yup';

// ------------------------------------------------------------
// @mui
import {InputAdornment,Checkbox, Button } from '@mui/material';
import styles from "./Login.module.css";
import { login, getUser } from '../../Services/userService';
import jwt from 'jwt-decode';
import { AppContext } from "../../Context/AppContext";

// components


// ----------------------------------------------------------------------

export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setAuth } = React.useContext(AppContext);
  // const [alerta, setAlerta] = useState({})

  const [showPassword, setShowPassword] = useState(false);
   
const handleClick = () => {

  login( {
    email,
    password,

  }).then(resp=>{ 
    console.log(resp)
    document.cookie = `token=${resp.token};max-age=${60 * 60 * 3}; "path=/"; samesite=strict`
              const cokieActual = document.cookie; 
              console.log(cokieActual)             
              setToken(cokieActual)
              getUser(jwt(cokieActual.replace('token=','')).sub)
              .then(respuser =>{                    
              setAuth(respuser)
            }
            )
          })
          
          
      navigate('/'); 

};




  // const  formik  = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },

  //   validationSchema: Yup.object({
  //     email: Yup.email().required('Correo incorrecto'),
  //     password: Yup.password().required("Contraseña incorrecta"),

      
  //     }),
    
  // });


  const onChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);

  };

  return (
    
  <div className={styles.body}>  

    <div className={styles.form_body}>

    <img src="logo-mediano.png" alt="logo" className="" />

        <p className={styles.text}>Bienvenido Mundiflora</p>

        <form 
        className={styles.login_form}
        >

            <input 
            type="text" 
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            />

            <input 
             placeholder='Password'
             type={'Password'}
             name='password'
             value={password}
             onChange={onChange}       
            />
              <Button  type="submit" variant="contained" onClick={handleClick}>
              Iniciar Sesión
              </Button> 

        </form>
    </div>
  </div>

);
}
