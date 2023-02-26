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
  const [user, setUser] = useState(null);
  const { setToken } = React.useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {

    login( {
      email:"luis@mail.com",
      password:"luis"
  
    }).then(resp=>{ 
      document.cookie = `token=${resp.token};max-age=${60 * 60 * 3}; path=/; samesite=strict`
                const cokieActual = document.cookie; 
                console.log(cokieActual)             
                setToken(cokieActual)
                getUser(jwt(cokieActual.replace('token=','')).sub)
                .then(respuser =>                    
                setUser(respuser.role)
                )
              })

    localStorage.setItem("acces", "true")

    navigate('/', { replace: true });
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

  return (
    
  <div className={styles.body}>  

    <div className={styles.form_body}>

    <img src="logo-mediano.png" alt="logo" className="" />

        <p className={styles.text}>Bienvenido Mundiflora</p>

        <form className={styles.login_form}>

            <input 
            type="text" 
            placeholder='Email'
            name='email'
            />

            <input 
             placeholder='Password'
             type={showPassword ? 'text' : 'password'}
             InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => setShowPassword(!showPassword)} edge="end">
  
                  </Button>
                </InputAdornment>
              ),
            }}
            />
              <Button  type="submit" variant="contained" onClick={handleClick}>
              Iniciar Sesión
              </Button> 

            </form>
    </div>
  </div>

);
}
