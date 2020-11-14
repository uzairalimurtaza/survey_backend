const Logger = require('../models/Logger');
const asyncHandler = require("../middleware/async");

exports.getLoggerByDate = asyncHandler(async (req, res, next) => {

    try {
        console.log(req.body)
        const date = new Date(req.body.date);
        console.log(date)
        const day = date.getDate();
        const month_ = date.getMonth();
        const year_ = date.getFullYear();

        console.log(day)
        console.log(month_)
        console.log(year_)

        if (req.params.status == 0) {
            const logger = await Logger.find();
            const loggerByDate = logger.filter((m) => m.time.getMonth() == month_ && m.time.getFullYear() == year_ && m.time.getDate() == day);
            res.status(200).json({
                logger: loggerByDate
            })
        }
        else if (req.params.status == 1) {
            const logger = await Logger.find();
            const loggerByMonth = logger.filter((m) => m.time.getMonth() == month_ && m.time.getFullYear() == year_);
            res.status(200).json({
                logger: loggerByMonth
            })
        }
    } catch (err) {
        next(err);
    }
})