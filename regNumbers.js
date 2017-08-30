module.exports = function(models) {

  var status = null;

  function index(req, res, next) {
    models.find({}, function(err, regNumbers) {
      if (err) {
        return next(err);
      } else {
        res.render('home', {
          plates: regNumbers,
          status: status,
        });
      }
    });

  };

  function add(req, res, next) {
    const dataPlate = req.body.plate.toUpperCase();
    models.findOne({
        plateNumber: dataPlate
      },
      function(err, regNumber) {

        if (err) {
          return next(err)
        } else if (regNumber) {
          status = 'Plate already exists';
          res.redirect('/');

        } else {
          models.create({
            plateNumber: dataPlate
          }, function(err, results) {
            if (err) {
              if (err.code === 11000) {
                req.flash('error', 'REGNUMBER already used!');
              } else {
                return next(err);
              }
            } else {
              req.flash('success', 'REGNUMBER added!');
            }
            status = null;
            res.redirect('/');
          });
        }

      });
  }

  function filterLoc(req, res, next) {
    models.find({}, function(errr, regNumbers) {
      if (err) {
        return (next)
      } else {
        render('/filteredLoc', {
          plates: regNumbers,
          status: status
        });
      }
    });
  };

  function doFilter(req, res, next) {
    const regLoc = req.body.loc;
    models.find({
      plateNumber: {
        $regex: regLoc
      }
    }, function(err, filterReg) {
      if (err) {
        return next(err)
      } else {
        console.log(filterReg);
        res.render('home', {plate: filterReg})
      }
    });
  }
  return {
    add,
    doFilter,
    index,
    filterLoc
  }
}
