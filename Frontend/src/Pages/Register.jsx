import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const createCustomTheme = (primaryColor) =>
  createTheme({
    palette: {
      primary: {
        main: primaryColor || '#1a73e8',
      },
    },
  });

const theme = createCustomTheme('#dd223f');

export default function Register() {
	
	const [data,setData]=useState({});
	const {setAuthUser}=useAuthContext();

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.id || e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			  });
			  const resData = await res.json();
	
			  if(res.status===201){
				localStorage.setItem("user",JSON.stringify(resData.userData))
				setAuthUser(resData.userData);
				}
	
			  else toast.error(resData.message);
			
		} catch (error) {
			toast.error(error.message);
		}
    }


    return (
		<>
			<Toaster />
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						minHeight: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'transparent',
					}}
				>
					<Box
						sx={{
							backgroundColor: 'transparent',
							opacity: '0.7',
							p: 4,
							borderRadius: 1,
							width: 360,
						}}
					>
					<div className="text-2xl text-center mb-2 font-pacifico font-bold">ChatterBox</div>

						<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
							<TextField
								id="name"
								label="Name"
								variant="outlined"
								margin="normal"
								fullWidth
								required
								onChange={handleChange}
								InputLabelProps={{
									style: { color: ' ' },
									required: false,
								}}
								InputProps={{
									style: { color: ' ' },
									sx: {
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
											},
											'&:hover fieldset': {
												borderColor: 'white',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'white',
											},
										},
									},
								}}
							/>
							<TextField
								id="username"
								label="Username"
								variant="outlined"
								margin="normal"
								fullWidth
								required
								onChange={handleChange}
								InputLabelProps={{
									style: { color: ' ' },
									required: false,
								}}
								InputProps={{
									style: { color: ' ' },
									sx: {
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
											},
											'&:hover fieldset': {
												borderColor: 'white',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'white',
											},
										},
									},
								}}
							/>
							<TextField
								id="password"
								label="Password"
								type="password"
								variant="outlined"
								margin="normal"
								fullWidth
								required
								onChange={handleChange}
								InputLabelProps={{
									style: { color: ' ' },
									required: false,
								}}
								InputProps={{
									style: { color: ' ' },
									sx: {
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: 'white',
											},
											'&:hover fieldset': {
												borderColor: 'white',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'white',
											},
										},
									},
								}}
							/>
							<FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
								<InputLabel id="gender-label">Gender</InputLabel>
								<Select
									id="gender"
									name="gender"
									label="Gender"
									defaultValue=""
									required
									onChange={handleChange}
								>
									<MenuItem value="male">Male</MenuItem>
									<MenuItem value="female">Female</MenuItem>
								</Select>
							</FormControl>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								sx={{ mt: 3, mb: 2 }}
							>
								Register
							</Button>
						</Box>
						<Typography variant="body2" textAlign="center" color="#000000">
							Already have an account?{' '}
							<Link component={RouterLink} to="/login" color="primary">
								Login
							</Link>
						</Typography>
					</Box>
				</Box>
			</ThemeProvider>
		</>
    );
}