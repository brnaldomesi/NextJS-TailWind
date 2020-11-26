import React, { useState } from 'react'

const JobInfo = (props) => {
  const [showJobDetail, setShowJobDetail] = useState(false)
  const changeJobDetailStatus = () => {
    setShowJobDetail(!showJobDetail)
  }
  const createWeeks = (created) => {
    let created_date = Date.parse(created)
    let current = Date.now()
    let diff = current - created_date
    let divideBy = { w:604800000,
      d:86400000,
      h:3600000,
      n:60000,
      s:1000 }
    let dates = Math.floor( diff/divideBy['w'])
    dates += ' weeks ago'
    return dates
  }

  return (
    <div className="border-t mx-2">
      <div className="flex py-4 px-2 flex items-center cursor-pointer" onClick={changeJobDetailStatus}>
        <div className="w-full">
          <h1 className="font-bold">{ props.jobInfo.job_title }</h1>
          <h2>{props.jobInfo.job_type} | ${props.jobInfo.salary_range[0]} - ${props.jobInfo.salary_range[1]} an hour | {props.jobInfo.city} </h2>
        </div>
        <div className="w-1/6">
          <p className="flex flex-row-reverse">{ createWeeks(props.jobInfo.created) }</p>
        </div>
      </div>
      {
        showJobDetail ?
        <div className="px-2 py-2 lg:flex">
          <div className="w-full lg:w-3/4">
            <div className="w-full lg:flex">
              <div className="w-1/2">
                <h1 className="font-bold">Department:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ props.jobInfo.department.toString() }</h1>
              </div>
            </div>
            <div className="w-full flex py-2">
              <div className="w-1/2">
                <h1 className="font-bold">Hours / shifts:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ props.jobInfo.hours } hours / Night shift</h1>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-1/2">
                <h1 className="font-bold">Summary:</h1>
              </div>
              <div className="w-1/2">
                <h1>{ props.jobInfo.description }</h1>
              </div>
            </div>
          </div>

          <div className="m-jobinfo-btn-container lg:w-1/4">
            <div className="m-jobinfo-btn-wrapper">
              <button className="m-jobinfo-detail-btn hover:bg-gray-900">
                Job details
              </button>
            </div>
            <div className="m-jobinfo-btn-wrapper">
              <button className="m-jobinfo-save-btn">
                Save job
              </button>
            </div>
          </div>
        </div>
        : <div></div>
      }
    </div>
  )
}

export default JobInfo;
