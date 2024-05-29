/*
    Untuk membuat Function
    membuat 2 parameter schema dan request
    dari schema akan dilakukan validate dan isi dari validate adalah requestynya
*/

import { ResponseError } from "../error/response-error.js";

export const validate = (schema, request) => {
  // schema adalah kumpulan aturan yang sudah di atur dengan JOI
  const result = schema.validate(request, {
    abortEarly: false,
    // reject field yang tidak diketahui
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    // value sudah di konversi
    return result.value;
  }
};
