export const getFullName = (firstName: string, lastName: string | null | undefined) => {
  return lastName ? `${firstName} ${lastName}` : firstName;
};
