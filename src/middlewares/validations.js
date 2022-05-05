import Joi from "joi";

export default {
  /**
   * @description validates request body before registration
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation oject
   */

  userValidation(req, res, next) {
    const userSchema = Joi.object({
      id: Joi.number().required(),
      cardId: Joi.string().alphanum().min(3).max(30).required(),

      studentId: Joi.number().required(),

      firstName: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "First name cannot contain number or special characters";
                break;
              case "any.required":
                err.message = "First name is required";
                break;
              case "string.min":
                err.message = "First name must be at least 2 characters long";
                break;
              case "string.base":
                err.message = "First name must be a string";
                break;
            }
          });
          return errors;
        }),

      lastName: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Last name cannot contain number or special characters";
                break;
              case "any.required":
                err.message = "Last name is required";
                break;
              case "string.min":
                err.message = "Last name must be at least 2 characters long";
                break;
              case "string.base":
                err.message = "Last name must be a string";
                break;
            }
          });
          return errors;
        }),
        postName : Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Last name cannot contain number or special characters";
                break;
              case "any.required":
                err.message = "Last name is required";
                break;
              case "string.min":
                err.message = "Last name must be at least 2 characters long";
                break;
              case "string.base":
                err.message = "Last name must be a string";
                break;
            }
          });
          return errors;
        }),
        gender : Joi.string().alphanum().min(3).max(30).required(),
        birthDate: Joi.date()
        // .format("DD/MM/YYYY") // set desired date format here
        .raw().required(),
        birthPlace : Joi.string().alphanum().min(3).max(30).required(),
        mother: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Last name cannot contain number or special characters";
                break;
              case "any.required":
                err.message = "Last name is required";
                break;
              case "string.min":
                err.message = "Last name must be at least 2 characters long";
                break;
              case "string.base":
                err.message = "Last name must be a string";
                break;
            }
          });
          return errors;
        }),
        father: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Last name cannot contain number or special characters";
                break;
              case "any.required":
                err.message = "Last name is required";
                break;
              case "string.min":
                err.message = "Last name must be at least 2 characters long";
                break;
              case "string.base":
                err.message = "Last name must be a string";
                break;
            }
          });
          return errors;
        }),
        faculty : Joi.string().alphanum().min(3).max(30).required(),
        option : Joi.string().alphanum().min(3).max(30).required(),
        promotion : Joi.string().alphanum().min(3).max(30).required(),
        phone_number: Joi.string().alphanum().min(3).max(30).required(),

      department: Joi.string().alphanum().min(3).max(30).required(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .error(() => ({
          message: "Please provide required email",
        })),

      password: Joi.string()
        .required()
        .regex(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Password must be at least 8 characters with at least a number, Upper and lower cases special character";
                break;
              default:
                break;
            }
          });
          return errors;
        }),

      role: Joi.string().alphanum().min(3).max(30).required(),
    });

    // const validation = schema.validate(req.body);
    // res.send(validation);

    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, ""),
      });
    }
    next();
  },

  loginValidation(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .error(() => ({
          message: "Please provide required email",
        })),

      password: Joi.string()
        .required()
        .regex(
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.regex.base":
                err.message =
                  "Password must be at least 8 characters with at least a number, Upper and lower cases special character";
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, ""),
      });
    }
    next();
  },
};
