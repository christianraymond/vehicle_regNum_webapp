module.exports = function(models){

    const plateList = [];

    const index = function(req, res, next){

        models.Registration.find({}, function(err, regNumbers){
            if (err){
                return next(err);
            }
            res.render('regNumbers/index', {regNumbers});
        });

    };

    const addingSection = function(req, res){
        res.render('regNumbers/add');
    }

    const add = function(req, res, next){
        //res.send('Add a subject');

        var dataPlate = {
            name : req.body.dataPlate
        };

        if (!dataPlate || !dataPlate.name){
            req.flash('error', 'Registration should not be blank');
            res.redirect('/regNumbers');
        }
        else{
            models.Registration.create(registrations, function(err, results){
                if (err){
                    if (err.code === 11000){
                        req.flash('error', 'REGNUMBER already exists!');
                    }
                    else{
                        return next(err);
                    }
                }
                else{
                    req.flash('success', 'REGNUMBER added!');
                }
                res.redirect('/regNumbers');
            });
        }
    }

    return {
        index,
        add,
        addingSection
    }

}
