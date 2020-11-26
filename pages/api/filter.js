import filters from './data/filters.json'
const getFilters = async (req, res) => {
  const { method } = req
  if (method !== 'GET') {
    return res.status(405)
              .json({ message: `${method} NOT SUPPORTED` });
  }
  try {
    return res.status(200).json(filters)
  } catch (err) {
    return res.status(err.statusCode || 500)
              .json({ err: err.message })
  }
};
export default getFilters
