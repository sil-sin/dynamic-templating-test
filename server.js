
const express = require('express');
const app = express();
require('dotenv').config();
const hbs = require('hbs');

let { students } = require('./exam-info')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// 1: in the home,list all the students who took the exam (list all the students)

app.get('/', (req, res) => {
  res.render('full-list.hbs', { students })
})

// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

app.get('/results', (req, res) => {
  let filteredPassed = students.filter((passStudent) => {
    return passStudent.hasPassed == true
  })
  let sorted = filteredPassed.sort((a, b) => { return b.score - a.score })
  res.render('results.hbs', { students: sorted })
})

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);