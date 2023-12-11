// import "./App.css";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// export const App = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:3000/", data);

//       console.log("Form submitted ", response.data);
//     } catch (error) {
//       console.error("Error submitting the form data:", error);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <div className="title"> Form</div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="form">
//           <div className="inputfield">
//             <label> Name</label>
//             <input
//               {...register("name")}
//               className="input"
//               type="text"
//               placeholder="Enter Your name"
//             />
//           </div>
//           <div className="inputfield">
//             <label htmlFor="age">Age</label>
//             <input
//               {...register("age")}
//               type="number"
//               name="age"
//               className="input"
//               placeholder="Enter your age"
//             />
//           </div>
//           <div className="inputfield">
//             <label htmlFor="email">Email </label>
//             <input
//               {...register("email")}
//               type="text"
//               className="input"
//               placeholder="Enter your email"
//             />
//           </div>
//           <p id="message"></p>
//           <div className="inputfield">
//             <label htmlFor="phonenumber">Phone Number</label>
//             <input
//               {...register("phonenumber")}
//               type="tel"
//               className="input"
//               placeholder="91-xxxxxxxxxx"
//             />
//           </div>
//           <div className="inputfield btns" id="btn">
//             <button type="submit" name="submit" value="submit" className="btn">
//               Submit
//             </button>
//             <button type="reset" value="Reset" className="btn">
//               Reset
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* <div>
//         <h2>Submitted Form Data</h2>
//         <pre>{JSON.stringify(formData, null, 2)}</pre>
//       </div> */}
//     </div>
//   );
// };
