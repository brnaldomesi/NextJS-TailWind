import { useState, useEffect } from 'react'
import Nav from 'components/common/nav'
import Footer from 'components/common/footer'
import JobList from 'components/jobs/JobList'
import JobType from 'components/jobs/JobType'
import { useSearch } from 'components/jobs/ProviderWrapper'
import SearchIcon from 'components/common/icons/SearchIcon'

export default function IndexPage() {
  const [jobs, setJobs] = useState({})
  const [filters, setFilters] = useState({})
  const { payload, setPayload } = useSearch()

  const onChangeSearch = (val) => {
    setPayload({
      filter_key: payload.filter_key,
      search_key: val,
      sort_key: payload.sort_key
    })
  }
  useEffect(() => {
    async function getJobs() {
      let response = await fetch('api/job', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let res = await response.json()
      let data = res['data']
      let type = res['type']
      setJobs({data: data, type: type})
    }
    async function getFilters() {
      const res = await fetch('api/filter')
      let data = await res.json()
      setFilters(data)
    }
    getJobs()
    getFilters()
  }, [payload])

  return (
    <div>
      <Nav/>
      <div className="m-content">
        <div className="m-container container">

          <div className="mx-2">
            <div className="m-searchbar-icon">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search for any job, title, keywords or company"
              onChange={(e) => onChangeSearch(e.target.value)}
              className="m-searchbar-input"/>
          </div>

          <div className="flex">
            <div className="m-filter-container lg:flex w-1/4">
              {
                Object.keys(filters).map( (item, idx) => (
                  <JobType name={ (item.split('_')).join(" ").toUpperCase() } data={filters} filter={item} key={idx}/>
                ))
              }
            </div>
            <div className="m-joblist-container lg:w-3/4">
              <JobList jobsData={jobs} jobfilter={filters}/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
