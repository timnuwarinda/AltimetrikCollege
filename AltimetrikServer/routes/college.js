var express = require('express');
const axios = require('axios');



var router = express.Router();

/* GET colleges listing. */
router.get('/', function (req, res, next) {
    console.log('college api');
    var zip = req.query.zip;
    var degrees = req.query.degrees;
    var year = req.query.year;
    const page = parseInt(req.query.page) || 1; // Page number
    const page_size = parseInt(req.query.limit) || 10; // Page size



    var url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=${degrees}&fields=id,school.name,${year}.student.size&per_page=1000&zip=${zip}&distance=10mi&api_key=LWuzFaDUJIsfN883KdBMlAqv8DIDTj8TZSBBESYA`;


    axios.default.get(url)
        .then((data) => {
            var finalResp = [];
            var resp = data.data.results;
            console.log(resp);


            for (const item of resp) {
                const obj = {};
                obj['school_name'] = item['school.name'];
                obj['no_of_students'] = item[`${year}.student.size`];

                finalResp.push(obj);

            }
            finalResp.sort((a, b) => (a.no_of_students < b.no_of_students) ? 1 : (a.no_of_students === b.no_of_students) ? ((a.no_of_students > b.no_of_students) ? 1 : -1) : -1)
            const results = paginatedResults(finalResp, page, page_size);
            res.status(201).json(results);

        }).catch((error) => {
            res.status(400).json({ msg: error });
            next(error);
        });



});


//func to handle pagination
function paginatedResults(arr, page, limit) {

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < arr.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    results.results = arr.slice(startIndex, endIndex);

    return results

}
module.exports = router;
