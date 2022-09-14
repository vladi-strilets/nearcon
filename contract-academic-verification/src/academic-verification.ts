import { assert, call, near, NearBindgen, UnorderedMap, view } from 'near-sdk-js'
import { Certificate } from './models/certificate'
import { School } from './models/school'
import { Student } from './models/student'

// TODO: check if I have enough NEAR to pay for the gas fee
// TODO: add whitelist (provide kind of superadmin role)

@NearBindgen({})
class AcademicVerification {
  schools: UnorderedMap = new UnorderedMap('schools')
  certifications: UnorderedMap = new UnorderedMap('certifications')
  students: UnorderedMap = new UnorderedMap('students')

  @call({})
  createNewSchool({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    const school = new School({ name })
    this.schools.set(schoolId, school)
    near.log(`School '${name}' was created`)
    return school
  }

  // TODO: add CRUD for certifications

  @call({})
  createNewCertification({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    // check if school exists
    const school = this.getSchoolById({ schoolId })
    const certificationId = near.randomSeed()
    const certification = new Certificate({ schoolId, name })
    // TODO: find how to add a new certification to the school as array for better performance
    // school.addCertification(certificationId)
    // const actualizedSchool = {
    //   ...school,
    //   certificationIds: [...school.certificationIds, certificationId],
    // }
    // this.schools.set(schoolId, actualizedSchool)
    this.certifications.set(certificationId, certification)
    near.log(`Certification '${name}' was added to your school '${schoolId}'`)
    return certification
  }

  // TODO: add CRUD for certifications

  @call({})
  registerAsStudent() {
    const studentId = near.predecessorAccountId()
    const student = new Student()
    this.students.set(studentId, student)
    near.log(`Student '${studentId}' was registered`)
    return student
  }

  @call({})
  addCertificationToStudent({
    certificationId,
    studentId,
  }: {
    certificationId: string
    studentId: string
  }) {
    const schoolId = near.predecessorAccountId()

    // check is school exists
    const school = this.getSchoolById({ schoolId })

    // check if schoolId is the owner of the certificationId
    const certification = this.getCertificationById({ certificationId })
    assert(schoolId === certification.schoolId, 'School does not own this certification')

    const student = this.students.get(studentId) as Student

    // check if student exists
    assert(student !== null, 'Student does not exist')

    student.addCertification(certificationId)
    near.log(`Certification '${certificationId}' was added to student '${studentId}'`)

    return student
  }

  @view({})
  getSchoolById({ schoolId }: { schoolId: string }) {
    const school = this.schools.get(schoolId) as School
    assert(school !== null, 'School does not exist')
    return school
  }

  @view({})
  getCertificationBySchoolId({ schoolId }: { schoolId: string }) {
    const certifications = []
    for (let i = 0; i < this.certifications.length; i++) {
      const certificateId: string = this.certifications.keys.get(i) as string
      const certificate = this.certifications.get(certificateId) as Certificate
      if (certificate.schoolId === schoolId) {
        certifications.push({ ...certificate, id: certificateId })
      }
    }
    return certifications
  }

  @view({})
  getCertificationById({ certificationId }: { certificationId: string }) {
    const certification = this.certifications.get(certificationId) as Certificate
    assert(certification !== null, 'Certification does not exist')
    return certification
  }

  // TODO: add verify multiple ceritification
  @view({})
  getCertificationByIds({ certificationIds }: { certificationIds: string[] }) {
    return certificationIds.map((certificationId) => {
      const certification = this.getCertificationById({ certificationId })
      assert(certification !== null, `Certification '${certificationId}' does not exist`)
      return certification
    })
  }

  @view({})
  getStudentById({ studentId }: { studentId: string }) {
    const student = this.students.get(studentId)
    assert(student !== null, 'Student does not exist')
    return student
  }
}
