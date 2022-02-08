const express = require('express');
const app = express.Router()
const fixArrayId = require('../helpers')
let projects = [
    {
        id: 1,
        img_url: "https://i.postimg.cc/GpSmqxQP/BMI.png",
        title: "BMI",
        github: "https://github.com/ZaneleMoni/myBMI",
        netlify: "https://elastic-elion-ea2d66.netlify.app",
    },
    {
        id: 2,
        img_url: "https://i.postimg.cc/tgFqyGtT/timerproject.png",
        title: "Timer-Game",
        github: "https://github.com/ZaneleMoni/reaction-timer-game",
        netlify: "",
    },
    {
        id: 3,
        img_url: "https://i.postimg.cc/nzmWjnw8/e-commerce.png",
        title: "E-commerce",
        github: "https://github.com/ZaneleMoni/My-POS",
        netlify: "https://zanele-pos.netlify.app",
    },

    {
        id: 4,
        img_url: "https://i.postimg.cc/WbsJHXVg/calculator.png",
        title: "Calculator",
        github: "https://github.com/ZaneleMoni/vue-calculator",
        netlify: "",
    },
];
 //GET ALL PROJECTS
   app.get("/", (req, res) => {
     res.send(projects);
   });

   //GET 1 PROJECT
app.get('/:id', (req, res) => {
    const project = projects.find(project => project.id == req.params.id)
    if (!project) res.status(404).send({ msg: 'Project not found' });
    res.send(project);
});

//CREATE A PROJECT
app.post('/', (req, res) => {
    let { img_url, title, github, netlify } = req.body;
    if (!img_url || !title || !github || !netlify)
        res.status(400).send({ msg: 'Not all information sent' });
    let newProject = {
        id: projects.length + 1,
        img_url,
        title,
        github,
        netlify
    };
    projects.push(newProject);
    res.send(newProject);
});

//UPDATE A PROJECT(update item in array)
app.put('/:id', (req, res) => {
    //FIND PROJECT INDEX IN PROJECTS
    let project = projects.find((project) => project.id == req.params.id); 

    //IF NO PROJECT FOUND SEND ERROR
    if (!project) res.status(404).send({ msg: 'Project not found' });
    
    //GET DATA FROM REQUEST BODY
    let { img_url, title, github, netlify } = req.body;
      
    //WRITE DETAILS TO PROJECT
    if (img_url) project.img_url = img_url;
    if (title) project.title = title;
    if (github) project.github = github;
    if (netlify) project.netlify = netlify;
           
    res.send(project);
});



//DELETE A PROJECT (remove from array)
app.delete('/:id', (req, res) => {
    projects = projects.filter((project) => project.id != req.params.id);
    fixArrayId(projects);
    res.send({ msg: 'item removed' });
});

module.exports = app;