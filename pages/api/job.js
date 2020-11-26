import jobs from './data/jobs.json'
const getJobs = async (req, res) => {
  const { method } = req
  if (method !== 'POST') {
    return res.status(404)
              .json({ message: `${method} NOT SUPPORTED` })
  }
  try {
    let search_key = req.body.search_key || ''
    search_key = search_key.toLowerCase();
    const filter_key = req.body.filter_key || {};
    const sort_key = req.body.sort_key || {}
    let type = 'job'
    let result = jobs
    .map((job) => {
      let items = []
      if (Object.keys(filter_key).length === 0) {
        items = job.items;
      } else {
        job.items.forEach((item) => {
          for (let key in filter_key) {
            if (!filter_key[key]) continue;
            if (item[key] === undefined) {
              console.log('caught undefined', item[key]);
            } else if (item[key].includes(filter_key[key])) {
              items.push(item);
              break;
            }
          }
        })
      }
      return { name: job.name, job_title: job.job_title, items }
    })
    .filter((job) => job.items.length != 0)

    if (search_key != '' || Object.keys(sort_key).length != 0) {
      type = 'item';
      result = result.reduce((res, job, idx) => {
        if (job) {
          job.items.forEach((item) => {
            res.push(item);
          });
        }
        return res;
      }, []);
    }

    if (search_key != '') {
      result = result.filter((item) => {
        let match = false;
        Object.keys(item).forEach((key) => {
          let str = item[key].toString();
          if (str.toLowerCase().includes(search_key)) {
            match = true;
          }
        });
        return match;
      });
    }

    if (Object.keys(sort_key).length != 0) {
      Object.keys(sort_key).forEach((key) => {
        if (key == 'Location' || key == 'Department' || key == 'Experience') {

          if (sort_key[key] == 'asc') {
            result.sort( (a, b) => {
              if(a[key] < b[key]) { return -1 }
              if(a[key] > b[key]) { return 1 }
              return 0;
            })
            result.sort((a, b) => {
              return 0.5 - Math.random();
            })
          } else if (sort_key[key] == 'desc') {
            result.sort( (a, b) => {
              if(a[key] < b[key]) { return 1 }
              if(a[key] > b[key]) { return -1 }
              return 0;
            })
          }
        } else {
          result.sort((a, b) => {
            return 0.5 - Math.random()
          });
        }
      });
    }

    return res.status(200).json({
      data: result,
      type: type
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ err: err.message })
  }
}
export default getJobs