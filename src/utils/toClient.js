export function toClient(document) {
  const value = document.toObject ? document.toObject() : { ...document }

  delete value._id
  delete value.__v
  delete value.createdAt
  delete value.updatedAt

  return value
}
