import asyncHandler from './asyncHandler.mjs'
const searchFilter = (model, populate) => asyncHandler(async (request, response, next) => {
    let queryOptions = {}
    const {select, sort, page, limit, ...requestQuery} = request.query
    if (select) {
        queryOptions.attributes = select.split(',')
    }
    if (sort) {
        const sortFields = sort.split(',')
        queryOptions.order = sortFields.map(field => field.split(':'))
    } else {
        queryOptions.order = [['createdAt', 'ASC']]
    }
    const offset = (page - 1) * limit
    const totalCount = await model.count()
    queryOptions.limit = limit
    const results = await model.findAll({where: requestQuery, ...queryOptions})
    const pagination = {}
    if (offset + limit < totalCount) {
        pagination.next = {
            page: parseInt(page) + 1,
            limit: parseInt(limit)
        }
    }
    if (offset > 0) {
        pagination.prev = {
            page: parseInt(page) - 1,
            limit: parseInt(limit)
        }
    }
    response.filteredResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }
    next()
})
export default searchFilter