export const STRINGS = {
   entityCreated: (field: string) => `${field} created sucessfully`,
   entityUpdated: (field: string) => `${field} updated sucessfully`,
   entityDeleted: (field: string) => `${field} deleted sucessfully`,
   alreadyExists: (field: string) => `${field} already exists`,
   notFound: (field: string) => `${field} not found`,
   notAvailable: (field: string) => `${field} not available`,
   notAuthorized: () => `User not authorized`,
   cannotUpdate: (field: string, text: string) => `${field} cannot be updated. ${text}`,
   invalidCoupon: () => `Coupon code is invalid`,
   invalidCartForCoupon: () => `Your cart contains invalid items for this coupon. Please remove them and try again`,
   noItemsInCart: () => `Your cart is empty. Please add some items and try again`
}