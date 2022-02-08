const express = require("express");
const app = express.Router();
const fixArrayId = require('../helpers');


let testimonials = [
  {
    id: 1,
    fname: "Alex",
    lname: "Sexwale",
    img: "https://i.postimg.cc/XqDWGgWk/alex.jpg",
    status: "Lecturer",
    text: "Ntombizanele is vigilent and takes pride in her work she is a go getter.",
  },
  {
    id: 2,
    fname: "Bongani",
    lname: "Nomangola",
    img: "https://i.postimg.cc/yYtB7nvV/Bongani3.jpg",
    status: "Colleague",
    text: "Zanele is an energetic person with a lot of humor and a lot of love.She sympathizes with the people around,determined and dedicated to what is given to her.",
  },
  {
    id: 3,
    fname: "Muneeb",
    lname: "Davids",
    img: "https://i.postimg.cc/NFLqcrX9/muneeb2.jpg",
    status: "Colleague",
    text: "Great humor and a fun person to be around with as well as smart and intelligent.",
  },
  {
    id: 4,
    fname: "Unathi",
    lname: "Qolweni",
    img: "https://i.postimg.cc/TYz8z131/unathi.jpg",
    status: "Colleague",
    text: " Ntombizanele pays attention to improve the aesthetics of the site as well as the functionality. Throughout the entire  process she is responsive, and willing to work through issues  as they arise. It is obvious she takes tremendous pride in her work, and I would not hesitate to recommend or work with her",
  },

  {
    id: 5,
    fname: "Emihle",
    lname: "Cebisa",
    img: "https://i.postimg.cc/d0JfFyPs/emihle4.jpg",
    status: "Colleague",
    text: "zanele is goal driven person that does not give up easily she is dedicated to her work and she is also a people`s person",
  },
  {
    id: 6,
    fname: "Mugamad",
    lname: "Breda",
    img: "https://i.postimg.cc/qRNHf3yt/breda-y1-min.jpg",
    status: "Colleague",
    text: "Zanele is hard working and she is always willing to learn",
  },
];
app.get("/", (req, res) => {
     res.send(testimonials);
});
   
   //GET 1 TESTIMONINAL
app.get('/:id', (req, res) => {
    const testimonial = testimonials.find(testimonial => testimonial.id == req.params.id)
    if (!testimonial) res.status(404).send({ msg: 'Testimonial not found' });
    res.send(testimonial);
});

//CREATE A PROJECT
app.post('/', (req, res) => {
    let { fname, lname,img,status,text } = req.body;
    if (!fname || !lname || !img ||!status ||!text)
        res.status(400).send({ msg: 'Not all information sent' });
    let newTestimonial = {
        id: testimonials.length + 1,
        fname, 
        lname,
        img,
        status,
        text
  };
    testimonials.push(newTestimonial);
    res.send(newTestimonial);
});

//UPDATE A TESTIMONIAL(update item in array)
app.put('/:id', (req, res) => {
    //FIND TESTIMOIAL INDEX IN TESTIMONIALS
    let testimonial = testimonials.find((testimonial) => testimonial.id == req.params.id); 

    //IF NO TESTIMONIAL FOUND SEND ERROR
    if (!testimonial) res.status(404).send({ msg: 'Testimoial not found' });
    
    //GET DATA FROM REQUEST BODY
    let { fname,lname, img, status,text} = req.body;
      
    //WRITE DETAILS TO TESTIMONIAL
    if (fname) testimonial.fname = fname;
    if (lname) testimonial.lname = lname;
    if (img) testimonial.img = img;
    if (status) testimonial.status = status;
    if (text) testimonial.text = text;

           
    res.send(testimonial);
});


//DELETE A PROJECT (remove from array)
app.delete('/:id', (req, res) => {
    testimonials = testimonials.filter((testimonial) => testimonial.id != req.params.id);
    fixArrayId(testimonials);
    res.send({ msg: 'item removed' });
});

module.exports = app;