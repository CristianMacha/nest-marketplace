import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltOrRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

/**
 * 
 * @param password contrasenia
 * @param hash contrasenia encriptado
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
