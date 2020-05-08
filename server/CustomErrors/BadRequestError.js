class BadRequestError extends Error {
   constructor(message) {
      super(message);
      this.name = message;
      this.status = 450;
   }
}

module.exports = BadRequestError;