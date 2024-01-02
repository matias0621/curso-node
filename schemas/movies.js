const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Falta el titulo',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(["Drama", "Action", "Crime", "Adventure", "Sci-Fi", "Romance", "Animation", "Biography", "Fantasy", "Comedia"]),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object)
}

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}