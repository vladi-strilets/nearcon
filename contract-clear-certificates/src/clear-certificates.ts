import { assert, call, near, NearBindgen, UnorderedMap, view } from 'near-sdk-js'
import { Certificate } from './models/certificate'
import { School } from './models/school'
import { Student } from './models/student'

// TODO: check if I have enough NEAR to pay for the gas fee
// TODO: add whitelist (provide kind of superadmin role)

@NearBindgen({})
class AcademicVerification {
  schools: UnorderedMap = new UnorderedMap('schools')
  certificates: UnorderedMap = new UnorderedMap('certificates')
  students: UnorderedMap = new UnorderedMap('students')

  @call({})
  createNewSchool({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    const school = new School({ name })
    this.schools.set(schoolId, school)
    near.log(`School '${name}' was created`)
    return school
  }

  // TODO: add CRUD for certificates

  @call({})
  createNewCertificate({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    // check if school exists
    const school = this.getSchoolById({ schoolId })
    const certificateId = near.blockTimestamp().toString()
    const certificate = new Certificate({ schoolId, name })
    // TODO: find how to add a new certificate to the school as array for better performance
    // school.addcertificate(certificateId)
    // const actualizedSchool = {
    //   ...school,
    //   certificateIds: [...school.certificateIds, certificateId],
    // }
    // this.schools.set(schoolId, actualizedSchool)
    this.certificates.set(certificateId, certificate)
    near.log(`certificate '${name}' was added to your school '${schoolId}'`)
    return certificate
  }

  // TODO: add CRUD for certificates

  @call({})
  registerAsStudent() {
    const studentId = near.predecessorAccountId()
    const student = new Student()
    this.students.set(studentId, student)
    near.log(`Student '${studentId}' was registered`)
    return student
  }

  @call({})
  addCertificateToStudent({
    certificateId,
    studentId,
  }: {
    certificateId: string
    studentId: string
  }) {
    const schoolId = near.predecessorAccountId()

    // check is school exists
    const school = this.getSchoolById({ schoolId })

    // check if schoolId is the owner of the certificateId
    const certificate = this.getCertificateById({ certificateId })
    assert(schoolId === certificate.schoolId, 'School does not own this certificate')

    const student = this.getStudentById({ studentId })

    const certificateIds = [
      ...(student.certificateIds != null ? student.certificateIds : []),
      certificateId,
    ]
    const actualizedStudent = new Student({ certificateIds })

    this.students.set(studentId, actualizedStudent)

    near.log(`certificate '${certificateId}' was added to student '${studentId}'`)

    return student
  }

  @view({})
  getSchoolById({ schoolId }: { schoolId: string }) {
    const school = this.schools.get(schoolId) as School
    assert(school !== null, 'School does not exist')
    return school
  }

  @view({})
  getCertificateBySchoolId({ schoolId }: { schoolId: string }) {
    const certificates = []
    for (let i = 0; i < this.certificates.length; i++) {
      const certificateId: string = this.certificates.keys.get(i) as string
      const certificate = this.certificates.get(certificateId) as Certificate
      if (certificate.schoolId === schoolId) {
        certificates.push({ ...certificate, id: certificateId })
      }
    }
    return certificates
  }

  @view({})
  getCertificateById({ certificateId }: { certificateId: string }) {
    const certificate = this.certificates.get(certificateId) as Certificate
    assert(certificate !== null, `certificate '${certificateId}' does not exist`)
    return certificate
  }

  // TODO: add verify multiple ceritification
  @view({})
  getCertificatesByIds({ certificateIds }: { certificateIds: string[] }) {
    return certificateIds.map((certificateId) => {
      const certificate = this.getCertificateById({ certificateId })
      return certificate
    })
  }

  @view({})
  getStudentById({ studentId }: { studentId: string }) {
    const student = this.students.get(studentId) as Student
    assert(student !== null, 'Student does not exist')
    return student
  }

  @view({})
  getAllStudents() {
    const students = []
    for (let i = 0; i < this.students.length; i++) {
      const studentId: string = this.students.keys.get(i) as string
      const student = this.students.get(studentId) as Student
      students.push({ ...student, id: studentId })
    }
    return students
  }
}
