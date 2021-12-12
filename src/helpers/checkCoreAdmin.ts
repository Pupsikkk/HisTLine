import { Role } from 'src/role/role.model';
import { rolesEnum } from 'src/role/roles-enum';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcryptjs';

export const checkCoreAdmin = async () => {
  let checkAdminRole: any = await Role.findOne({
    where: { value: rolesEnum.ADMIN },
  });
  let checkUserRole: any = await Role.findOne({
    where: { value: rolesEnum.USER },
  });

  if (!checkAdminRole)
    checkAdminRole = await Role.create({
      value: rolesEnum.ADMIN,
      description: 'coreAdmin of whole app',
    });

  if (!checkUserRole)
    checkUserRole = await Role.create({
      value: rolesEnum.USER,
      description: 'coreAdmin of whole app',
    });

  const checkAdmin = await User.findOne({
    where: { roleId: checkAdminRole.dataValues.id },
  });

  if (!checkAdmin)
    await User.create({
      login: process.env.ADMIN_LOGIN,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 5),
      roleId: checkAdminRole.dataValues.id as number,
    });

  console.log('Admin checked!');
};
