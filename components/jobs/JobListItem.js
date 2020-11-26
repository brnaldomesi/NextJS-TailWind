import React, { useState } from 'react'
import JobInfo from './JobInfo'

const JobListItem = (props) => {
  const [showJobs, setShowJobs] = useState(false)
  const changeJobsStatus = () => {
    setShowJobs(!showJobs)
  }

  return (
    <div>
      <div className="m-joblistitem-header" onClick={changeJobsStatus}>
        <h1 className="m-joblistitem-avatar">
          { props.jobs.name.substr(0, 2).toUpperCase() }</h1>
        <h1 className="mx-2">
          {props.jobs.items.length} jobs for {props.jobs.name}</h1>
      </div>
      {showJobs && props.jobs.items.map((item, idx) => (
        <JobInfo jobInfo={item} key={idx}/>
      ))}
    </div>
  )
}

export default JobListItem;