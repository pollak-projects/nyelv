import swaggerJSDoc from "swagger-jsdoc";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Polyglot API",
            version: "1.0.0",
        },
    },
    apis: ["./*.js", "./controller/*.js"],
}


const swaggerSpec = swaggerJSDoc(options)


export default swaggerSpec
