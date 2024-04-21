"use client"
import * as React from "react"
import logo from "../../components/assets/period-cal.jpg";
import { Calendar } from "../../components/ui/calendar";

export default function Tracker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <>
      <div className="flex px-10 bg-purple-100">
        <div className="px-10 py-5 mt-20 mb-10">
          <div className="flex px-10">
            <h1 className='font-bold text-4xl'>Period calculator: Predict when your next period will arrive</h1>
          </div>
          <p className="flex px-10 mt-5">Being able to predict when your next period will arrive can save you a lot of hassle and help you to understand your own menstrual cycle. Predict your next period now with Menstruease easy-to-use period calculator.</p>
        </div>

        <div className="px-10 mt-20 mb-10">
          <img src={logo} alt="period-cal" width={850} height={850} className='rounded-xl'/>
        </div>
      </div>

      <div className='px-5 py-10 flex items-center justify-center gap-8'>
        <div className = "">
          <h2 className='font-semibold text-2xl'>When did your period start?</h2>
          <Calendar 
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"/>
        </div>
        <div>
          <h2 className='font-semibold text-2xl'>How long does a period last?</h2>
        </div>
        <div>
          <h2 className='font-semibold text-2xl'>How long is your cycle?</h2>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn btn-primary bg-emerald-400 hover:bg-emerald-500 hover:shadow-md px-10 py-2 mb-10 rounded-2xl font-semibold text-xl w-full md:w-auto">
          Track
        </button>
      </div>
    </>
  );
}
