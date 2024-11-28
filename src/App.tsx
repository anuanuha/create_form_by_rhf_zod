import React from 'react';
import './App.css';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
 
type formtype = {
  firstname:string;
  lastname:string;
  age:number;
  email:string;
  password:string;
  confirmpassword:string
}

function App() {
   const schema:ZodType<formtype>=z.object({
    firstname:z.string().min(5).max(20),
    lastname:z.string().min(5).max(20),
    age:z.number().min(18).max(70),
    email:z.string().email(),
    password:z.string().min(8).max(10),
    confirmpassword:z.string().min(10).max(10)
   }).refine((data)=>data.password===data.confirmpassword,{
    message:"passwords do not match",
    path:["confirmpassword"],
   })
   const {handleSubmit, register, formState:{errors}}=useForm<formtype>({resolver:zodResolver(schema)})
   const sumbit =(data:formtype)=>{
    console.log("data",data);
    
   }
  return (
    <div className="App">
      <form className='form' onSubmit={handleSubmit(sumbit)}>
        <label>firstname:</label>
        <input type='text' {...register("firstname")}></input>
        {errors.firstname && <span>{errors.firstname?.message}</span>}
        <label>lastname:</label>
        <input type='text' {...register("lastname")}></input>
        {errors.lastname && <span>{errors.lastname?.message}</span>}
        <label>age:</label>
        <input type='text' {...register("age",{valueAsNumber:true})}></input>
        {errors.age && <span>{errors.age?.message}</span>}
        <label>email:</label>
        <input type='text' {...register("email")}></input>
        {errors.email && <span>{errors.email?.message}</span>}
        <label>password:</label>
        <input type='text' {...register("password")}></input>
        {errors.password && <span>{errors.password?.message}</span>}
        <label>confirm password:</label>
        <input type='text' {...register("confirmpassword")}></input>
        {<span>{errors.confirmpassword?.message}</span>}
        <input type='submit'/>
      </form>
    </div>
  );
}
export default App;


