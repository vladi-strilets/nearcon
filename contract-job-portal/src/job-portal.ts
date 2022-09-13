import { assert, call, near, NearBindgen, UnorderedMap, view } from 'near-sdk-js'
import { Company } from './models/company'
import { Offer } from './models/offer'

@NearBindgen({})
class JobPortal {
  companies: UnorderedMap = new UnorderedMap('companies')
  offers: UnorderedMap = new UnorderedMap('companies')

  @call({})
  createNewCompany({ name }: { name: string }) {
    const companyId = near.predecessorAccountId()
    const company = new Company({ name })
    this.companies.set(companyId, company)
    near.log(`Company '${name}' was created`)
    return company
  }

  @call({})
  createNewOffer({ title, certificationIds }: { title: string; certificationIds: string[] }) {
    const companyId = near.predecessorAccountId()
    const company = this.getCompanyById(companyId)

    // TODO: check if certifications ids exists in our academic-verification contract

    const offerId = near.randomSeed()
    const offer = new Offer({ companyId, title, certificationIds })
    this.offers.set(offerId, offer)
    company.addOffer(offerId)

    near.log(`Offer '${title}' was added to your company '${companyId}'`)

    return company.offerIds
  }

  @call({})
  applyToOffer({ offerId }: { offerId: string }) {
    const offer = this.getOfferById(offerId)
    const candidateId = near.predecessorAccountId()

    offer.addCandidate(candidateId)
    near.log(`Candidate '${candidateId}' applied to offer '${offerId}'`)
  }

  @call({})
  selectCantidate({ offerId, candidateId }: { offerId: string; candidateId: string }) {
    const offer = this.getOfferById(offerId)

    // check if candidate applied to this offer
    assert(offer.candidates.includes(candidateId), 'Candidate did not apply to this offer')

    offer.selectCandidate(candidateId)
    near.log(`Candidate '${candidateId}' was selected for offer '${offerId}'`)
    return offer
  }

  // TODO: add pagination
  @view({})
  getAllCompanies() {
    return this.companies
  }

  // TODO: add pagination
  @view({})
  getAllOffers() {
    return this.offers
  }

  @view({})
  getCompanyById(companyId: string) {
    const company = this.companies.get(companyId) as Company
    assert(company !== null, 'Company does not exist')
    return company
  }

  @view({})
  getOfferById(offerId: string) {
    const offer = this.offers.get(offerId) as Offer
    assert(offer !== null, 'Offer does not exist')
    return offer
  }
}
