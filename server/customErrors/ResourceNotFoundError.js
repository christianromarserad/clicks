
class ResourceNotFoundError extends Error {
   constructor(message) {
      super(message);
      this.name = 'ResourceNotFoundError';
      this.status = 400;
   }
}

module.exports = ResourceNotFoundError;