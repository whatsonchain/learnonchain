import axios from 'axios'

const getFromApiServerAsync = async url => {
  let response
  try {
    response = await axios.get('https://api.whatsonchain.com/v1/bsv/main/' + url)
    return response.data
  } catch (error) {
    console.log('error connecting to server:', error)
  }
}

export function getBlockByHeight (height) {
  // GET https://api.whatsonchain.com/v1/bsv/<network>/block/height/<height>

  let path = 'block/height/' + height
  return getFromApiServerAsync(path)
}
