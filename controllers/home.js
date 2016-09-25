/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};


/*
* GET/mypolls
* */
exports.getMyPolls = (req, res) =>
{
  res.render('account/mypolls', {
      title: 'My Polls'
  });

};
