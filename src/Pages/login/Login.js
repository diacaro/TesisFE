import React,{ useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

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
  const { setToken, setAuth , auth } = React.useContext(AppContext);
  // const [alerta, setAlerta] = useState({})

  const [showPassword, setShowPassword] = useState(false);
   
const handleClick = () => {

  // login( {
  //   email,
  //   password,

  // }).then(resp=>{ 
  //   console.log(resp)
  //   document.cookie = `token=${resp.token};max-age=${60 * 60 * 3}; "path=/"; samesite=strict`
  //             const cokieActual = document.cookie; 
  //             console.log(cokieActual)             
  //             setToken(cokieActual)
  //             getUser(jwt(cokieActual.replace('token=','')).sub)
  //             .then(respuser =>{                    
  //             setAuth(respuser)
  //           }
  //           )
  //         })
          
          
  //     navigate('/'); 

};



const  formik  = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  
  validationSchema: Yup.object({
    email: Yup.string().email('Correo incorrecto')
    .required('El mail es obligatorio'),
    password: Yup.string().required("Contraseña incorrecta"),
    
    
  }),
  
  onSubmit : (values) => {
        
        login( {
          email : values.email,
          password : values.password,
          
        }).then(resp=>{ 
          console.log(auth)
          if (auth) {
          console.log(resp)
          document.cookie = `token=${resp.token};max-age=${60 * 60 * 3}; "path=/"; samesite=strict`
                    const cokieActual = document.cookie; 
                    console.log(cokieActual)             
                    setToken(cokieActual)
                    getUser(jwt(cokieActual.replace('token=','')).sub)
                    .then(respuser =>{                    
                    setAuth(respuser);
                    localStorage.setItem("access","ADMIN");
                    navigate('/'); 
                    }
                    )
                  }
                  else {
                    <Navigate to="/login" />
                    
                  }
                  })
                  
                

        
      }
     
  });


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
        onSubmit={formik.handleSubmit}
        className={styles.login_form}
        >

            <input 
            type="text" 
            placeholder='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            // helperText={formik.errors.email}
            />

            <input 
             placeholder='Password'
             type={'Password'}
             name='password'
             value={formik.values.password}
             onChange={formik.handleChange}     
             error={formik.errors.password}
            //  helperText={formik.errors.password}  
            />
              <Button  type="submit" variant="contained"  onSubmit={formik.handleSubmit}>
              Iniciar Sesión
              </Button> 

        </form>
    </div>
  </div>

);
}
