import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getDates, getHistory, getMonths } from '../API/apiCalls';
import Navbars from './Navbars';
import '../CSS/navdash.css'
import { Button, Card, Container, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Dashboard() {
  const [data, setData] = useState('')
  const [all, setAll] = useState()
  const [current, setCurrent] = useState([])
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const [filter, setFilter] = useState();
  const [flag, setFlag] = useState(0);
  const [dateFlag, setDateFlag] = useState(0);
  const [dates, setDates] = useState([])
  let bookings = []
  useEffect(() => {
    if (localStorage.getItem("_token")) {
      let token = localStorage.getItem('_token');
      let decode = jwtDecode(token);
      setData(decode)
      let present = [];
      let past = [];
      let tomm = [];
      getHistory({ id: decode.id }).then((res => {
        if (res.data != "null") {
          setAll(res.data)
          for (let i = 0; i < res.data.bookings.length; i++) {
            let dbDate = new Date(res.data.date[i])
            let todayDate = new Date()
            console.log(todayDate.getMonth())
            let dbsDate = new Date(dbDate.getFullYear(), dbDate.getMonth(), dbDate.getDate())
            let todaysDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
            if (dbsDate > todaysDate) {
              tomm.push({ location: res.data.location[i], fromTime: res.data.fromTime[i], toTime: res.data.toTime[i], date: res.data.date[i], vehicle: res.data.vehicle[i], bookings: res.data.bookings[i] })
            }
            else if (dbsDate < todaysDate) {
              past.push({ location: res.data.location[i], fromTime: res.data.fromTime[i], toTime: res.data.toTime[i], date: res.data.date[i], vehicle: res.data.vehicle[i], bookings: res.data.bookings[i] })
            }
            else {
              present.push({ location: res.data.location[i], fromTime: res.data.fromTime[i], toTime: res.data.toTime[i], date: res.data.date[i], vehicle: res.data.vehicle[i], bookings: res.data.bookings[i] })
            }
          }
          setCurrent(present);
          setHistory(past);
          setFuture(tomm)
        }
      }))

    }

  }, []);

  const monthHandler = (event) => {
    getMonths({ month: event.target.value, id: data.id }).then((res) => {
      setFilter(res.data)
      setFlag(1)
    })
  }

  const dateHandler = () => {
    let arr = []
    getHistory({ id: data.id }).then((res => {
      if (res.data != "null") {
        for (let i = 0; i < res.data.bookings.length; i++) {
          let dbDate = new Date(res.data.date[i]);
          let userDate = new Date(document.getElementById("dates").value);

          if (dbDate.getDate() == userDate.getDate() && dbDate.getMonth() == userDate.getMonth() && dbDate.getFullYear() == userDate.getFullYear()) {
            console.log("dates")
            arr.push({ location: res.data.location[i], fromTime: res.data.fromTime[i], toTime: res.data.toTime[i], date: res.data.date[i], vehicle: res.data.vehicle[i], bookings: res.data.bookings[i] })
          }
        }
        setDates(arr)
      }
    }))
    setDateFlag(1)
  }

  return <div>
    <Navbars />
    <div className='mainImage'>
      <h1 className='text-white'>Welcome to Parking Stars</h1>
      <Card className="mx-auto mt-5 dashboardCard" style={{background: "none" }}>
        <Card.Body>
          <h1 className="mb-4 text-white display-4 fw-bold">Book a Slot</h1>
          <h5 className='text-white fw-bold h5 mb-5'>
            We know you face issues everyday while parking so book your parking slot earlier and be free !
          </h5>
          <Link to="/book"><Button variant='warning' className="fw-bold">Book a Slot</Button></Link>
          <p className='text-white h5 mt-3'>Fill the form and get your booking ready!</p>
        </Card.Body>
      </Card>
    </div>
      <h2 className='mt-3'>Hey {data.firstName} Have a look on your bookings till now !</h2>
    <Container className='dashboardContainer mb-5 mt-3'>
<Container>
      <Card  className="mx-auto bg-warning mt-3 detailsCard">
        <Card.Body>
          <Card.Title>Bookings Till Now !!!</Card.Title>
          <Card.Text>
            {
              all != undefined ?
                <h3>Total no of bookings till now is {all.bookings.length}</h3>
                :
                <h3>Total no of bookings till now is 0</h3>
            }
            {/* {
              future != undefined &&
              <h3>Total no of bookings  in future is {future.length}</h3>
            } */}
            {
              history != undefined &&
              <h3>Total no of bookings in past is {history.length}</h3>
            }
            {
              current != undefined &&
              <h3>Total no of bookings in present is {current.length}</h3>
            }
          </Card.Text>
          <Link to='/book'><Button variant="primary">Book Again</Button></Link>
        </Card.Body>
      </Card>
      </Container>
      <Container className='mt-5'>
        <h1>Filter Some Data?</h1>
        <Form.Label className='text-dark mt-2 fw-bold h4'>Booking Month:</Form.Label>
      <Form.Select aria-label="Default select example" className="mb-2" onChange={monthHandler}>
        <option selected value=''>Select month</option>
        <option  value='0'>Janaury</option>
        <option value='1'>February</option>
        <option value='2'>March</option>
        <option value='3'>April</option>
        <option value='4'>May</option>
        <option value='5'>June</option>
        <option value='6'>July</option>
        <option value='7'>August</option>
        <option value='8'>September</option>
        <option value='9'>October</option>
        <option value='10'>November</option>
        <option value='11'>December</option>
      </Form.Select>
      {flag == 1 &&
        <>
          <h1>Total number of bookings in this month are {filter.length}</h1>
          <Button variant="danger" onClick={() => setFlag(0)}>Close this</Button>
          <Table striped bordered hover className="bg-dark text-white mt-3">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Location</th>
                <th>Date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Slot Number</th>
              </tr>

            </thead>
            {filter != undefined &&
              filter.map((e, index) =>
                <>
                  <tbody >
                    <tr>
                      <td className='text-white'>{index + 1}</td>
                      <td className='text-white'>{e.location}</td>
                      <td className='text-white'>{e.date}</td>
                      <td className='text-white'>{e.fromTime}</td>
                      <td className='text-white'>{e.toTime}</td>
                      <td className='text-white'>{e.bookings}</td>
                    </tr>
                  </tbody>

                </>
              )
            }
          </Table>
        </>
      }

      <Form.Group className="mb-5" >
        <Form.Label className='text-dark mt-5 fw-bold h4'>Booking Date:</Form.Label>
        <Form.Control type="date" id="dates" name="date" onChange={dateHandler} />
      </Form.Group>

      {dateFlag == 1 &&
        <>
          <h1>Total number of bookings in this date are {dates.length}</h1>
          <Button variant="danger" onClick={() => setDateFlag(0)}>Close this</Button>
          <Table striped bordered hover className="bg-dark text-white mt-3">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Location</th>
                <th>Date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Slot Number</th>
              </tr>

            </thead>
            {dates != undefined &&
              dates.map((e, index) =>
                <>
                  <tbody>
                    <tr>
                      <td className='text-white'>{index + 1}</td>
                      <td className='text-white'>{e.location}</td>
                      <td className='text-white'>{e.date}</td>
                      <td className='text-white'>{e.fromTime}</td>
                      <td className='text-white'>{e.toTime}</td>
                      <td className='text-white'>{e.bookings}</td>
                    </tr>
                  </tbody>

                </>
              )
            }
          </Table>
        </>
      }

    </Container>
    </Container>
    <Footer />
  </div>;
}

export default Dashboard;
