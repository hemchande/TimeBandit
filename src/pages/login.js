import * as React from 'react';
import { useState,useEffect } from "react";
import {useAuth} from '../components/firebase/AuthContext'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import Character_Cover1 from '../components/Character_Cover1.png'
import {
    TextField,
    Button,MenuItem,Select
  } from "@material-ui/core";


  function getStartOfWeek(date) {
    var currentDate = new Date(date);
    var dayOfWeek = currentDate.getDay();
    
    // Move the date back to the start of the week (Sunday)
    currentDate.setDate(currentDate.getDate() - dayOfWeek);
    
    return currentDate;
  }

  


function getPreviousWeekStartDate(date) {
    const currentDate = new Date(date);
    const previousWeekStartDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting 7 days in milliseconds
  
    const previousWeekStart = getStartOfWeek(previousWeekStartDate);
    return previousWeekStart;
  }

function createData(habit, type, mon, tues, wed,thurs,fri,sat,sun, date) {
    return { "habit": habit, "type" : type, "mon": mon, "tues": tues, "wed":wed,"thurs": thurs,"fri": fri,"sat": sat,"sun":sun, "date": date };
  }

const rows = [
  createData('Walking the dog', 'Personal', "false", "false", "false", "false", "true","true", "false", new Date().toDateString()),
  createData('Morning yoga', 'Personal', "false", "false", "false", "false", "true","true", "false", new Date().toDateString()),
  createData('Investing reading', 'Hobby', "false", "false", "false", "false", "true","true", "false", new Date().toDateString()),
  createData('Make Presentation', 'Work', "false", "false", "false", "false", "true","true", "false", new Date().toDateString()),
  createData('Make Salad', 'Personal', "false", "false", "false", "false", "true","true", "false", new Date().toDateString()),
];

// Retrieve the array from local storage
var items = JSON.parse(localStorage.getItem('itemKeys')) || [];

items.push(7)
items.push(3)

// Store the modified array back to local storage
localStorage.setItem('myArrayKey', JSON.stringify(items));






  




export default function DenseTable(){

    const { currentUser } = useAuth();
    const uid = currentUser ? currentUser.uid : null;

    const [curWeek, setcurWeek] = useState(null);
    const [prevWeek, setprevWeek] = useState(null)
    const [id, setId] = useState(8)//3
    const[habitValue, setnewHabitValue] = useState(null)
    const [typeValue, setnewTypeValue] = useState(null)
    //setting habits in use effect 
    const [habits, setHabits] = useState(null)
    const [habitData, setHabitData] = useState(null)
    const [habit, setnewHabit] = useState({
        habit: "",
        type: "",
        monday: false,
        tuesday: false,
        wednsday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        date: new Date().toDateString(),
        attachments: "",
      });


      const buttonStyle = {
        position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#fff',
    color: '#000',
    border: '2px solid #000', 
    borderRadius: '2px',
    cursor: 'pointer',
    fontFamily: 'Comic Sans MS, cursive',
      };


      const buttonStyle1 = {
        padding: '10px 10px',
        fontSize: '12px',
        backgroundColor: '#fff',
        color: '#000',
        border: '2px solid #000',
        borderRadius: '2px',
        cursor: 'pointer',
        fontFamily: 'Comic Sans MS, cursive',
      };
    


    //const { currentUser } = useAuth();
    //const uid = currentUser ? currentUser.uid : null;
    console.log(uid);
    //setId(uid)





      


      
      


    const handleAddHabit = (event) => {
      console.log(habitData.length+1)
      if (habitData.length + 1 > 7) {
        alert("Only 7 habits");
        return;
      }
      var currentDate1 = new Date();
      let weekStart = getStartOfWeek(currentDate1);
      console.log(weekStart);
    
      setnewHabit({
        name: habitValue,
        type: typeValue,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        date: new Date().toDateString(),
        attachments: "",
      });
    
      let weekContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + weekStart.toDateString()));
    
      if (!weekContents) {
        weekContents = {};

      }
    
      weekContents[habitValue] = {
        type: typeValue,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        date: new Date().toDateString(),
        attachments: "",
      };

      console.log(weekContents)
    
      localStorage.setItem("" + id.toString() + "" + weekStart.toDateString(), JSON.stringify(weekContents));
    
      console.log(localStorage);
    
      changeHabits();
    
      setnewHabitValue(null);
      setnewTypeValue(null);
    };
    


      useEffect(() => {


        //console.log(uid.toString())


        const get_habits = () => {


        var currentDate = new Date();

        var currentDay = currentDate.getDay();

        console.log(currentDate.getDay())


        var keys = Object.keys(localStorage);
        console.log(keys);


        var ids = localStorage.getItem('itemKeys')
        console.log(ids)




      

        


        if (currentDay == 0 ){

          console.log(currentDay)

          console.log(localStorage)

        
         
          //var currentDate = new Date();
          
  
        const previousWeekStartDate = getPreviousWeekStartDate(currentDate);
        let prevWeek = getStartOfWeek(previousWeekStartDate);
        let curWeek = getStartOfWeek(currentDate);
  
        console.log(prevWeek.toDateString())
        setprevWeek(prevWeek.toDateString());
        console.log(curWeek.toDateString())
        setcurWeek(curWeek.toDateString())

        const weekContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek.toDateString()))

        const weekContents1 = JSON.parse(localStorage.getItem("" + id.toString() + "" + prevWeek.toDateString()))


        //console.log(weekContents)


        if(!weekContents && !weekContents1){


          setHabits([])
          setHabitData([])

          return
          //add logic for this to get prev week habits 
        } 
        if(!weekContents && weekContents1){

          let prevkeys = Object.keys(weekContents1)

          let prevValues = Object.values(weekContents1)


          let obj = {}

          setHabits(prevkeys)

          for(let k = 0 ;k < prevkeys.length; k++){

            let type = weekContents1[prevkeys[k]].type

            obj[prevkeys[k]] = {
              type: type,
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
              date: new Date().toDateString(),
              attachments: "",

            }
            //console.log(prevkeys[k])
  
  
  
          }

          localStorage.setItem("" + id.toString() + "" + curWeek.toDateString(), JSON.stringify(obj))




          setHabitData(obj)


          return 

          







        }
          



        
        else{
          console.log(weekContents)
        console.log(weekContents1)


        

        console.log(curWeek)

        let curkeys = Object.keys(weekContents)

        console.log(curkeys)

        
  

        let prevkeys = Object.keys(weekContents1)

        console.log(prevkeys)

        //let prevValues = Object.values(weekContents1)

        //let finalHabits = curkeys.concat(prevkeys)

        setHabits(curkeys)

        setHabitData(Object.values(weekContents))



        //let obj = weekContents;

        

        

        //console.log(obj)


        //localStorage.setItem("" + id.toString() + "" + curWeek.toDateString(), JSON.stringify(obj))

        //console.log(JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek.toDateString())));


        //const jsonStorage = JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek.toDateString()))

        //console.log(jsonStorage)

        //console.log(Object.values(jsonStorage))

        //console.log(habits)


        return


       

        }



        




        }else{
          const previousWeekStartDate = getPreviousWeekStartDate(currentDate);
        let prevWeek = getStartOfWeek(previousWeekStartDate);
        let curWeek = getStartOfWeek(currentDate);
  
        console.log(prevWeek.toDateString())
        setprevWeek(prevWeek.toDateString());
        console.log(curWeek.toDateString())
        setcurWeek(curWeek.toDateString())

        const weekContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek.toDateString()))

        const weekContents1 = JSON.parse(localStorage.getItem("" + id.toString() + "" + prevWeek.toDateString()))


        console.log(weekContents1)


        if(!weekContents && !weekContents1){
          setHabits([]);

          setHabitData([]);

          return

        }

        if(!weekContents && weekContents1){

          let prevkeys = Object.keys(weekContents1)

          let prevValues = Object.values(weekContents1)


          let obj = {}

          setHabits(prevkeys)

          for(let k = 0 ;k < prevkeys.length; k++){

            let type = weekContents1[prevkeys[k]].type

            obj[prevkeys[k]] = {
              type: type,
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
              date: new Date().toDateString(),
              attachments: "",

            }
            //console.log(prevkeys[k])
  
  
  
          }

          localStorage.setItem("" + id.toString() + "" + curWeek.toDateString(), JSON.stringify(obj))




          setHabitData(obj)


          return 

          







        }

       
        
        
        else{

        //console.log(weekContents)
        //console.log(weekContents1)

        //let obj = weekContents;

        //let pastKeys = Object.keys(weekContents1)


          //console.log(prevkeys[k])
         
          




    



        

        console.log(curWeek)

        let curkeys = Object.keys(weekContents)

        let curVals = Object.values(weekContents)

        console.log(curkeys)

        setHabits(curkeys);

        setHabitData(curVals);


        return 



        }




        
  

        



       

        






        }


        

      }

      if(habits == null && habitData == null){

        get_habits();

        console.log(true)


      }

      

  





  
  
  
  
  
  
  
  
  
  
  
  
  
      }, [])


      const checkHabitData = () => {

        let data = []

        if(habitData != null){

          for (let i = 0; i < habitData.length ; i ++){
            data.push(habitData[i].monday)

          }

        console.log(data)
        }





      };




      const changeHabits = () => {

        //call within handleChangeInput and rerender 

        checkHabitData();

        var currentDate1 = new Date();

        let weekStart = getStartOfWeek(currentDate1)
    
        console.log(weekStart)
  
        const newContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + weekStart.toDateString()))
  
        console.log(newContents)
  
  
        let keys = Object.keys(newContents);
  
  
        let vals = Object.values(newContents);
  
  
        setHabits(keys)
        setHabitData(vals)
  
  
  
  
  
  
  
  
      }

      const handleInputChange1 = (event, habit, idx) => {
        const habitString = habit;
        const day = event.target.id;
        setHabitData(prevState => {
          const habitObj = { ...prevState[idx] };
          habitObj[day] = !event.target.checked;
          const newState = [...prevState];
          newState[idx] = habitObj;
          return newState;
        });
        const currentDate = new Date();
        const curWeek = getStartOfWeek(currentDate);
        const jsonContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek.toDateString()));
        console.log(jsonContents)
        console.log(event.target.checked)
        jsonContents[habitString][day] = event.target.checked;
        localStorage.setItem("" + id.toString() + "" + curWeek.toDateString(), JSON.stringify(jsonContents));
        changeHabits();
      };



      const handledelete = (event) => {

        const habit = event.target.id;

        console.log(habit)

        var currentDate1 = new Date();

        let weekStart = getStartOfWeek(currentDate1)

        let jsonContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + weekStart.toDateString()))

        console.log(jsonContents)

        delete jsonContents[habit]; 

        console.log(jsonContents)

        let stringJSON = JSON.stringify(jsonContents)

        console.log(stringJSON)

        localStorage.setItem("" + id.toString() + "" + weekStart.toDateString(), stringJSON)

        changeHabits()











        
      }

      const handleInputChange = (event) => {

        console.log(habits)

        const habitstring = event.target.id;


        console.log(habitstring)



        const date = event.target.value;

        const day = event.target.name;

        var currentDate = new Date();
       
        //var currentDate = new Date();
        //let curWeek = getStartOfWeek(currentDate);

        console.log(localStorage);

        console.log(currentDate.getDay());
        console.log(curWeek)
        //console.log(curWeek.toDateString());
    
  


        const jsonContents = JSON.parse(localStorage.getItem("" + id.toString() + "" + curWeek))

        console.log(jsonContents)

        //set the habits to the hbaits state variable 


        jsonContents[habitstring][day] = true;


        localStorage.setItem("" + id.toString() + "" + curWeek, JSON.stringify(jsonContents))

        



        changeHabits();





    };




  


      

  





    
     
  
      
  
  
  
  


  













  return (


    <>
    <img src={Character_Cover1} alt="My Image" style={{ position: 'absolute',width: '90px', top: 0, left: 0 }} /> {/* Include the image here */}
    <a href="https://www.coteriesolutions.com/time-bandit">
      <button style={buttonStyle}>Visit Coterie</button>
    </a>

    <h1> Time Bandit Habits </h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Habit</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Monday</TableCell>
            <TableCell align="right">Tuesday</TableCell>
            <TableCell align="right">Wednesday</TableCell>
            <TableCell align="right">Thursday</TableCell>
            <TableCell align="right">Friday</TableCell>
            <TableCell align="right">Saturday</TableCell>
            <TableCell align="right">Sunday</TableCell>
            <TableCell align="right">Date</TableCell>
           
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { habits && habitData && habitData.length > 0 && habitData.map((habit, index) => (
           
            <TableRow
              key={habits[index]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {habits[index]}
              </TableCell>
              <TableCell align="right">
                {habit.type}</TableCell>
              <TableCell align="right"><input type="checkbox"  id = "monday" checked={habit.monday} onChange={(e) => handleInputChange1(e, habits[index],index)}  />
  </TableCell>
              <TableCell align="right"><input type="checkbox"  id = "tuesday" checked={habit.tuesday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"><input type="checkbox"  id = "wednesday" checked={habit.wednesday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"><input type="checkbox"  id = "thursday" checked={habit.thursday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"><input type="checkbox"  id = "friday" checked={habit.friday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"><input type="checkbox"  id = "saturday" checked={habit.saturday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"><input type="checkbox"  id = "saturday" checked={habit.sunday} onChange={(e) => handleInputChange1(e, habits[index],index)}/></TableCell>
              <TableCell align="right"> {habit.date}</TableCell>
              
              <TableCell align="right">
    <button className="delete-button" onClick = {handledelete} id = {habits[index]}>x</button>
  </TableCell>
             
            </TableRow>
            
           
          
          ))}
           <TableRow>
            <TableCell>
            <div style={{ display: 'flex' }}>
              <TextField
                name="habit"
                value={habitValue}
                onChange={(event) =>
                  setnewHabitValue(event.target.value)}
                multiline
          rows={4}
          style={{ flex: 3,
            width: '200px', 
            fontFamily: 'Comic Sans MS',
            backgroundColor: 'white', // Set a background color
            borderRadius: '4px', // Add some border radius
            padding: '8px' }}
              />
               </div>
            </TableCell>
            <TableCell>
              
        <Select
          name="type"
          onChange={(event) =>
            setnewTypeValue(event.target.value)}
        >
          <MenuItem value="">--Select a type--</MenuItem>
          <MenuItem value="work">Work</MenuItem>
          <MenuItem value="personal">Personal</MenuItem>
          <MenuItem value="hobby">Hobby</MenuItem>
        </Select>
        
      </TableCell>
            









           
            <TableCell>
            <Tooltip title="Add a new habit" arrow>
              <Button variant="contained" onClick={handleAddHabit} className="custom-button" style={buttonStyle1}>
                Add
              </Button>
             </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    </>
   
  )
}



