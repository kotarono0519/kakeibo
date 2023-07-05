const getData = (req, res, db) => {
    db.select('*').from('datas')
    .then(items => {
        if (items.length) {
            res.json(items);
        } else {
            res.json({
                dataExists: 'false'
            });
        }
    }) 
    .catch(err => res.status(400).json({
        dbError: 'error'
    }));
};

const postData = (req, res, db) => {
    const { year, month } = req.body;
    db('datas')
      .insert({ year, month })
      .returning('*')
      .then(item => {res.json(item)})
      .catch(err => res.status(400).json({
        dbError: 'error'
      }));
  };

  const putData = (req, res, db) => {
    const { id, data } = req.body;
    db('datas').where({ id }).update({ data })
    .returning('*')
    .then(item => {
        res.json(item);
    })
};

module.exports = {
    getData,
    postData,
    putData,
}