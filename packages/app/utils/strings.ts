import type { AppRouterKeys } from '@acme/api/src/root'

export const getFullName = (firstName: string, lastName: string | null | undefined) => {
  return lastName ? `${firstName} ${lastName}` : firstName
}

export const splitOutPersonName = (fullName: string) => {
  const [firstName = '', ...lastName] = fullName.split(' ')
  return {
    firstName,
    lastName: lastName.join(' ') || null,
  }
}

type singularOptions = Exclude<AppRouterKeys, 'auth'>
export const getSingularFromPlural = (word: string): singularOptions => {
  switch (word) {
    case 'people':
      return 'person'
    default:
      return word.replace(/s$/, '') as singularOptions
  }
}
