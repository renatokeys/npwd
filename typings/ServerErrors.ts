// Expect this to grow as needed
export enum ServerErrors {
  // Catch all error related to database handling
  DatabaseError = 'DATABASE_ERROR',
  // Unknown catch all internal error
  InternalError = 'INTERNAL_ERROR',
  // Often used when expected data is not passed
  InvalidRequest = 'INVALID_REQUEST',
  AlreadyExists = 'ALREADY_EXISTS',
}
