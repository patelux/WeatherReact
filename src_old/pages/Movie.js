// import { useParams } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Grid, Paper, Typography } from "@mui/material";
// const url = 'http://www.omdbapi.com/?apikey=88150c8c';


// export default function Movie() {
//     const params = useParams();
//     const [movie, setMovie] = useState({})

//     const getDetailedInfo = () => {
//         axios.get(`${url}&i=${params.id}`).then((response) => {
//             setMovie(response.data);
//         });
//     }

//     useEffect(() => {
//         getDetailedInfo()
//     }, []);

//     return (
//         <Container>
//             <Paper>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                         <img src={movie.Poster} alt={movie.Title} className='movie_poster' />
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                     <Typography variant="body2" color="text.secondary">
//                         {movie.Plot}
//                     </Typography>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </Container>

//     )
// }