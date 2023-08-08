const cryptoModel = require('../models/cryptoModel')
const axios = require('axios')

const cryptoData = async function(req, res) {
    try {
      let options = {
        method: 'get',
        url: 'https://api.wazirx.com/api/v2/tickers'
      }
  
      let result = await axios(options);
      let savedData = result.data;
  
      const filteredData = Object.entries(savedData).filter(([symbol, pairData]) => pairData.quote_unit === 'inr');
      const top10Pairs = Object.values(filteredData).sort((a, b) => b[1].last - a[1].last).slice(0, 10);
  
      const cryptoData = top10Pairs.map(([symbol, pair]) => ({
        name: pair.name,
        last: pair.last,
        buy: pair.buy,
        sell: pair.sell,
        volume: pair.volume,
        base_unit: pair.base_unit,
      }));
  
      let finalData = await cryptoModel.create(cryptoData);
  
      // Retrieve only the specific fields from the stored data
      const responseData = finalData.map(item => ({
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit,
      }));
  
      return res.status(201).send({ status: true, data: responseData });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
  

  const getCryptoData = async function(req, res) {
    const baseUnit = req.query.base_unit; // Extract base_unit from query parameters

    if (!baseUnit) {
        return res.status(400).send({ status: false, message: 'Missing base_unit parameter' });
    }

    const findCrypto = await cryptoModel.find({ base_unit: baseUnit }).select({_id:0, name:1, last:1, buy:1, sell:1, volume:1, base_unit:1});

    if (findCrypto.length === 0) {
        return res.status(404).send({ status: false, message: 'Crypto not found' });
    }

    return res.status(200).send({ status: true, data: findCrypto });
}


module.exports = {cryptoData, getCryptoData}