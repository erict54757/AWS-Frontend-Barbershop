import axios from "axios";
import Auth from "./auth";

export default {
  
  // Saves a employee to the employee database
  saveEmployee: function(employeeData) {
    return axios.post("/api/employees", employeeData,{headers:{token:Auth.getToken()}});
  },
  // Gets ALLLLLL employee info
  getEmployees: function() {
    return axios.get("/api/employees",{headers:{token:Auth.getToken()}});
  },
  getEmployeesCust: function() {
    return axios.get("/cust/custEmployee",{headers:{token:Auth.getToken()}});
  },
  // Gets employee info
  getEmployee: function(id) {
    return axios.get("/api/employees/" + id,{headers:{token:Auth.getToken()}});
  },
  // delete employee info
  deleteEmployee: function(id) {
    return axios.delete("/api/employees/" + id,{headers:{token:Auth.getToken()}});
  },

    // Saves an employee day off to database
    saveDayOff: function(daysOffData) {
      
      return axios.post("/api/daysOff", daysOffData,{headers:{token:Auth.getToken()}});
    },
   // Gets ALLLLLL requested daysOff 
   getDaysOff: function() {
    return axios.get("/api/daysOff",{headers:{token:Auth.getToken()}});
  },
    // Gets ALLLLLL requested daysOff 
    getDaysOffCust: function() {
      return axios.get("/cust/custDaysOff",{headers:{token:Auth.getToken()}});
    },
  // delete day off where id
  deleteDaysOff : function(id) {
    return axios.delete("/api/daysOff/"+id,{headers:{token:Auth.getToken()}});
  },
  
  //saves customer if doesn't exists and creates appointment
  saveCustomerNoSign: function(customerData) {
    return axios.post("/api/customers/noSign", customerData,{headers:{token:Auth.getToken()}});
  },
    //saves customer if doesn't exists and creates appointment customer page
    saveCustomerNoSignCust: function(customerData) {
      return axios.post("/cust/custNoSign/noSign", customerData);
    },
  // Saves a customer to the database
  saveCustomer: function(customerData) {
    return axios.post("/api/customers", customerData,{headers:{token:Auth.getToken()}});
  },
  // Gets info of Customer
  getCustomers: function() {
    return axios.get("/api/customers",{headers:{token:Auth.getToken()}});
  },
  getCustomersWhere: function(customerData) {
    return axios.get("/api/customers/where/"+customerData,{headers:{token:Auth.getToken()}});
    
  },
  getAllCustomersWhere: function(Data) {
    return axios.post("/api/customers/all/where", Data,{headers:{token:Auth.getToken()}});
    
  },
  // sends updated customer data and corresponding appointment data. must update both customer and appointment
  updateCustomer: function(id, customerData) {
    return axios.put("/api/customers/" + id, customerData,{headers:{token:Auth.getToken()}});
  },
  // get the customers comments on click of comment button in appointment card
  findCustComments: function(custId){
    return axios.get("/api/customers/where/findCustComments/"+custId,{headers:{token:Auth.getToken()}})

  },
  saveCustComments: function(custId,commentData){
    return axios.put("/api/customers/where/findCustComments/"+custId, commentData,{headers:{token:Auth.getToken()}})

  },
  // made post for employee page to delete existing appt and create new ones
  updateAppointment: function( appointmentData) {
    return axios.put("/api/appointments/" , appointmentData,{headers:{token:Auth.getToken()}});
  },
  // Saves an appointment to the database
  saveAppointment: function(appointmentData) {
    return axios.post("/api/appointments", appointmentData,{headers:{token:Auth.getToken()}});
  },
  // Gets all appointments
  getAppointments: function() {
    return axios.get("/api/appointments",{headers:{token:Auth.getToken()}});
  },
   // Gets all appointments
   getAppointmentsCust: function() {
    return axios.get("/cust/custAppt",{headers:{token:Auth.getToken()}});
  },
  //gets appointments where matching employee id
   getAppointmentsById: function(id) {
    return axios.get("/api/appointments/" + id,{headers:{token:Auth.getToken()}});
  },
  //deletes an appointment with a given id
  deleteAppointment: function(id,appointmentData) {
    return axios.post("/api/appointments/" + id, appointmentData,{headers:{token:Auth.getToken()}});
  },
  sendEmail: function(emailData) {
    return axios.post("/cust/custNodeMailer/incoming", emailData,{headers:{token:Auth.getToken()}});
  },
  sendConfirmationEmail: function(emailData) {
    return axios.post("/api/sendEmail/confirmation", emailData,{headers:{token:Auth.getToken()}});
  },
  // customer send sendConfirmationEmail
  sendConfirmationEmailCust: function(emailData) {
    return axios.post("/cust/custNodeMailer/confirmation", emailData,{headers:{token:Auth.getToken()}});
  },
  sendConfirmationEmailSignedIn: function(emailData) {
    return axios.post("/api/sendEmail/confirmation/SignedIn", emailData,{headers:{token:Auth.getToken()}});
  },
  sendCancellationEmail: function(emailData) {
    return axios.post("/api/sendEmail/cancellation", emailData,{headers:{token:Auth.getToken()}});
  },

  // Updates day to true or false
  changeDayOn: function(id,Day, dayData) {
    return axios.put("/api/days/"+Day+"/on/" + id, dayData,{headers:{token:Auth.getToken()}});
  },
  changeDayOff: function(id,Day, dayData) {
    return axios.put("/api/days/"+Day+"/off/" + id, dayData,{headers:{token:Auth.getToken()}});
  },
  updateEmployee: function(id, employeeData) {
    return axios.put("/api/employees/" + id, employeeData,{headers:{token:Auth.getToken()}});
  },
 
  
};
