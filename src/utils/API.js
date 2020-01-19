import axios from "axios";
import Auth from "./auth";

export default {
  
  // Saves a employee to the employee database
  saveEmployee: function(employeeData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/employees", employeeData,{headers:{token:Auth.getToken()}});
  },
  // Gets ALLLLLL employee info
  getEmployees: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/employees",{headers:{token:Auth.getToken()}});
  },
  getEmployeesCust: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custEmployee",{headers:{token:Auth.getToken()}});
  },
  // Gets employee info
  getEmployee: function(id) {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/employees/" + id,{headers:{token:Auth.getToken()}});
  },
  // delete employee info
  deleteEmployee: function(id) {
    return axios.delete("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/employees/" + id,{headers:{token:Auth.getToken()}});
  },

    // Saves an employee day off to database
    saveDayOff: function(daysOffData) {
      
      return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/daysOff", daysOffData,{headers:{token:Auth.getToken()}});
    },
   // Gets ALLLLLL requested daysOff 
   getDaysOff: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/daysOff",{headers:{token:Auth.getToken()}});
  },
    // Gets ALLLLLL requested daysOff 
    getDaysOffCust: function() {
      return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custDaysOff",{headers:{token:Auth.getToken()}});
    },
  // delete day off where id
  deleteDaysOff : function(id) {
    return axios.delete("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/daysOff/"+id,{headers:{token:Auth.getToken()}});
  },
  
  //saves customer if doesn't exists and creates appointment
  saveCustomerNoSign: function(customerData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/noSign", customerData,{headers:{token:Auth.getToken()}});
  },
    //saves customer if doesn't exists and creates appointment customer page
    saveCustomerNoSignCust: function(customerData) {
      return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custNoSign/noSign", customerData);
    },
  // Saves a customer to the database
  saveCustomer: function(customerData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers", customerData,{headers:{token:Auth.getToken()}});
  },
  // Gets info of Customer
  getCustomers: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers",{headers:{token:Auth.getToken()}});
  },
  getCustomersWhere: function(customerData) {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/where/"+customerData,{headers:{token:Auth.getToken()}});
    
  },
  getAllCustomersWhere: function(Data) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/all/where", Data,{headers:{token:Auth.getToken()}});
    
  },
  // sends updated customer data and corresponding appointment data. must update both customer and appointment
  updateCustomer: function(id, customerData) {
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/" + id, customerData,{headers:{token:Auth.getToken()}});
  },
  // get the customers comments on click of comment button in appointment card
  findCustComments: function(custId){
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/where/findCustComments/"+custId,{headers:{token:Auth.getToken()}})

  },
  saveCustComments: function(custId,commentData){
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/customers/where/findCustComments/"+custId, commentData,{headers:{token:Auth.getToken()}})

  },
  // made post for employee page to delete existing appt and create new ones
  updateAppointment: function( appointmentData) {
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/appointments/" , appointmentData,{headers:{token:Auth.getToken()}});
  },
  // Saves an appointment to the database
  saveAppointment: function(appointmentData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/appointments", appointmentData,{headers:{token:Auth.getToken()}});
  },
  // Gets all appointments
  getAppointments: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/appointments",{headers:{token:Auth.getToken()}});
  },
   // Gets all appointments
   getAppointmentsCust: function() {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custAppt",{headers:{token:Auth.getToken()}});
  },
  //gets appointments where matching employee id
   getAppointmentsById: function(id) {
    return axios.get("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/appointments/" + id,{headers:{token:Auth.getToken()}});
  },
  //deletes an appointment with a given id
  deleteAppointment: function(id,appointmentData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/appointments/" + id, appointmentData,{headers:{token:Auth.getToken()}});
  },
  sendEmail: function(emailData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custNodeMailer/incoming", emailData,{headers:{token:Auth.getToken()}});
  },
  sendConfirmationEmail: function(emailData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/sendEmail/confirmation", emailData,{headers:{token:Auth.getToken()}});
  },
  // customer send sendConfirmationEmail
  sendConfirmationEmailCust: function(emailData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/cust/custNodeMailer/confirmation", emailData,{headers:{token:Auth.getToken()}});
  },
  sendConfirmationEmailSignedIn: function(emailData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/sendEmail/confirmation/SignedIn", emailData,{headers:{token:Auth.getToken()}});
  },
  sendCancellationEmail: function(emailData) {
    return axios.post("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/sendEmail/cancellation", emailData,{headers:{token:Auth.getToken()}});
  },

  // Updates day to true or false
  changeDayOn: function(id,Day, dayData) {
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/days/"+Day+"/on/" + id, dayData,{headers:{token:Auth.getToken()}});
  },
  changeDayOff: function(id,Day, dayData) {
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/days/"+Day+"/off/" + id, dayData,{headers:{token:Auth.getToken()}});
  },
  updateEmployee: function(id, employeeData) {
    return axios.put("https://ec2-18-219-209-228.us-east-2.compute.amazonaws.com:9000/api/employees/" + id, employeeData,{headers:{token:Auth.getToken()}});
  },
 
  
};
