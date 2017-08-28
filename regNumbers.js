module.exports = function(models) {

    var status = null;

    const index = function(req, res, next) {

        models.find({}, function(err, regNumbers) {
            if (err) {
                return next(err);
            } else {
                res.render('home', {
                    plates: regNumbers,
                    status: status
                });
            }
        });

    };
    const add = function(req, res, next) {
        const dataPlate = req.body.plate.toUpperCase();

        // go to the database and look for the typed in plate number
        // if it exist (if(regNumber)), in a way just refresh the page with the status massage of already exists
        // else create the plate number storing it to the database and refresh the page so it can be visible
        models.findOne({
            plateNumber: dataPlate
        }, function(err, regNumber) {
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

    return {
        index,
        add
    }

}
