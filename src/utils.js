module.exports = {

  swapBytes (str) {
    const result = []
    let len = str.length - 2
    while (len >= 0) {
      result.push(str.substr(len, 2))
      len -= 2
    }
    // https://en.bitcoin.it/wiki/Block_hashing_algorithm
    return result.join('')
  }

}
