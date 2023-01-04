import * as yup from 'yup'


export const itemSchema = yup.object().shape({
    search: yup.string().required(),
    quantity:yup.number().min(1),
    format:yup.string().required(),
    notes: yup.string().nullable().optional()
})