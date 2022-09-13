export class Company {
  name: string
  offerIds: string[]

  constructor({ name }: { name: string }) {
    this.name = name
  }

  addOffer(offerId: string) {
    this.offerIds.push(offerId)
    return this.offerIds
  }

  // TODO: add filters and pagination for better performance
}
