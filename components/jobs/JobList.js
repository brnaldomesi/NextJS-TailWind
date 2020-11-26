import { useState, useEffect } from 'react'
import { useSearch } from 'components/jobs/ProviderWrapper'
import JobListItem from './JobListItem'
import JobInfo from './JobInfo'
import ArrowDown from '../common/icons/ArrowDown'
import ArrowUp from '../common/icons/ArrowUp'

const JobList = ({ jobsData, jobfilter}) => {
  const { payload, setPayload } = useSearch()
  const [jobs, setJobs] = useState([])
  const [type, setType] = useState('')
  const getNumOfJobs = () => {
    if (jobs == undefined) return 0
    if( jobs.length <= 0) return 0
    let sum = 0
    if(type === 'job')
      sum = jobs.reduce( (total, val) => ( total + val['items'].length), 0)
    else
      sum = jobs.length
    return new Intl.NumberFormat().format(sum)
  }
  const sort_by = [
    'Location',
    'Role',
    'Department',
    'Education',
    'Experience',
  ]
  const onChangeSort = (item) => {
    let sortData = {};
    sortData[item] = payload['sort_key'][item] == undefined ?
                      'asc' :
                      payload['sort_key'][item] == 'asc' ?
                        'desc' : undefined;

    setPayload({
      filter_key: payload.filter_key,
      search_key: payload.search_key,
      sort_key: {
        ...payload.sort_key,
        ...sortData
      }
    });
  }
  useEffect(() => {
    setJobs(jobsData.data);
    setType(jobsData.type);
  }, [jobsData]);

  return (
    <div className="m-joblist-content relativew-full">
      <div className="m-joblist-sort">
        <h2>
         { getNumOfJobs() } job postings
        </h2>
        <div className="hidden lg:flex">
          <h2 className="px-2 text-gray-500">Sort by</h2>
          {
            sort_by
            .filter((item, idx) => payload['sort_key'][item] != 'removed')
            .map( (item, idx) => (
              <h2 className={`px-2 cursor-pointer items-center flex ${payload['sort_key'][item] != undefined ? 'text-blue-400' : ''}`} key={idx} onClick={()=>onChangeSort(item)}>
                {item}
                { payload['sort_key'][item] != undefined &&
                  payload['sort_key'][item] == 'asc' &&
                  <ArrowDown />
                }
                {
                  payload['sort_key'][item] != undefined &&
                  payload['sort_key'][item] == 'desc' &&
                  <ArrowUp />
                }
              </h2>
            ))
          }
        </div>
      </div>
      {
        jobs == undefined ?
          (<div></div>) :
          type === 'job' ?
            (
                jobs.map((item, idx) => (
                  <JobListItem jobs={item} key={idx}/>
                ))
              )
            : (
                <div>
                  {
                    jobs.map((item, idx) => (
                      <JobInfo jobInfo={item} key={idx}/>
                    ))
                  }
                </div>
              )
      }
    </div>
  )
}
export default JobList;