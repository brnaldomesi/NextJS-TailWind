import React, { useState } from "react"
import { useSearch } from 'components/jobs/ProviderWrapper'
import Modal from 'components/common/modal'

export const JobType =  ({ data, filter, name }) => {
  const { payload, setPayload } = useSearch()
  const [showModal, setShowModal] = useState(false)
  const numberFormat = new Intl.NumberFormat()
  const modal = (
    <Modal open={showModal} titleModal={name} textModal={data[filter]} onClose={()=>{setShowModal(false)} } />
  )
  const onChangeSearch = (type, val) => {
    setPayload({
      filter_key: {
        [type]: val,
      },
      search_key: payload.search_key,
      sort_key: payload.sort_key,
    })
  }

  return (
    <div className="w-full bg-white mb-4 py-4 px-4">
      <h1 className="my-2 font-bold">{name}</h1>
      {
        data[filter].map( (item, idx) => {
          {
            let filter_key = payload.filter_key[filter];
            if(idx < 10)
            return (
              <div
                key={item.key}
                className={`flex space-x-2 mb-2 cursor-pointer ${
                  item.key === filter_key ? 'text-blue-400' : ''
                }`}
                onClick={() => onChangeSearch(filter, item.key)}
              >
                <h2>{item['key']}</h2>
                <p className="text-gray-500">{numberFormat.format(item.doc_count)}</p>
              </div>
            )
            else if(idx === 10) return (
              <div className="flex my-2" key={idx}>
                <h1 className="text-indigo-600 cursor-pointer" onClick={()=>{ setShowModal(true)}}>Show more</h1>
                {modal}
              </div>
            )
          }
        }
        )
      }
    </div>
  )
}

export default JobType;
