const express = require("express");
const app = express();
const projectRoutes = require('./Routes/projectsRoutes')
const testimonialRoutes = require('./Routes/testimonialRoutes')

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ msg: "Welcome to Zanele's Backend" })
});




app.use('/projects', projectRoutes);
app.use('/testimonials',testimonialRoutes)
app.listen(5000);