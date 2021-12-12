import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InstanceDescService } from 'src/instance-descriptions/instance-descriptions.service';
import { rolesEnum } from 'src/role/roles-enum';
import { Subtype } from 'src/subtype/subtype.model';
import { SubtypeService } from 'src/subtype/subtype.service';
import { Type } from 'src/type/type.model';
import { TypeService } from 'src/type/type.service';
import { Op } from 'sequelize';
import { UserService } from 'src/user/user.service';
import { createInstanceDto } from './dto/create-instance.dto';
import { filterDto } from './dto/filter.dto';
import { JWTinfo } from './dto/infoFromJwt.dto';
import { Instance } from './instance.model';
import { InstanceSubtype } from './instanceSubtype.model';

const defaultImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlmaOOtC7388IqzDT53w6yk54PdRDs3o85gZJ8GH6zRipRYt4nDpfsIsJ2cPaZBiEPKhY&usqp=CAU';

@Injectable()
export class InstanceService {
  constructor(
    @InjectModel(Instance) private instanceRepository: typeof Instance,
    private descService: InstanceDescService,
    private typeService: TypeService,
    private userService: UserService,
    private subtypeService: SubtypeService,
  ) {}

  async createInstance(user: JWTinfo, instance: createInstanceDto) {
    const userID = user.userId;
    const possibleUsersID = [userID];

    if (!(user.role === rolesEnum.ADMIN)) {
      const admin = (await this.userService.getUserByLogin(
        process.env.ADMIN_LOGIN,
      )) as any;
      possibleUsersID.push(admin.dataValues.id);
    }

    const typeID = (
      await this.typeService.getTypeForUsers(instance.type, possibleUsersID)
    )?.id;

    if (!typeID)
      throw new HttpException('Не валідний тип', HttpStatus.BAD_REQUEST);

    if (await this.getInstanceByNameForUser(instance.name, userID)) {
      throw new HttpException('Така колонка вже існує', HttpStatus.BAD_REQUEST);
    }

    const instance_table = await this.instanceRepository.create({
      name: instance.name,
      fromYear: instance.fromYear,
      toYear: instance.toYear,
      img: instance.img || defaultImg,
      userId: userID,
      typeId: typeID,
    });

    await this.descService.createDescription({
      instanceId: instance_table.id,
      description_text: instance.description,
      links: instance.links,
    });

    for (let subtype of instance.subtypes) {
      const subtypeID = (
        await this.subtypeService.getSubtypeForUsers(subtype, typeID, userID)
      )?.id;

      if (subtypeID)
        await InstanceSubtype.create({
          subtypeId: subtypeID,
          instanceId: instance_table.id,
        });
    }
    return instance_table;
  }

  async getFilteredInstances(user: JWTinfo, filter: filterDto) {
    const {
      fromYear: reqFromYear,
      toYear: reqToYear,
      subtypes: reqSubtypes,
    } = filter;

    const userID = user.userId;
    const possibleUsersID = [userID];

    if (!(user.role === rolesEnum.ADMIN)) {
      const admin = (await this.userService.getUserByLogin(
        process.env.ADMIN_LOGIN,
      )) as any;
      possibleUsersID.push(admin.dataValues.id);
    }
    let findedSubtypesId = (
      (await this.subtypeService.getSubtypesForUsers(
        reqSubtypes,
        possibleUsersID,
      )) as any
    ).map((obj) => obj.id);

    if (!findedSubtypesId.length)
      throw new HttpException(
        'Не знайдено колонок с такими підтипами',
        HttpStatus.BAD_REQUEST,
      );

    let findedInstanceId = (
      await InstanceSubtype.findAll({
        where: {
          subtypeId: findedSubtypesId,
        },
      })
    ).map((obj) => obj.instanceId);

    if (!findedSubtypesId.length)
      throw new HttpException(
        'Не знайдено колонок с такими підтипами',
        HttpStatus.BAD_REQUEST,
      );

    let findedInstances = await Promise.all(
      (
        await this.instanceRepository.findAll({
          where: {
            [Op.and]: [
              {
                id: findedInstanceId,
              },
              {
                [Op.or]: [
                  {
                    fromYear: {
                      [Op.between]: [reqFromYear, reqToYear],
                    },
                  },
                  {
                    toYear: {
                      [Op.between]: [reqFromYear, reqToYear],
                    },
                  },
                  {
                    [Op.and]: [
                      {
                        fromYear: {
                          [Op.lte]: reqFromYear,
                        },
                      },
                      {
                        toYear: {
                          [Op.gte]: reqToYear,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                userId: possibleUsersID,
              },
            ],
          },
        })
      ).map(async (obj) => {
        return {
          id: obj.id,
          name: obj.name,
          fromYear: obj.fromYear,
          toYear: obj.toYear,

          type: (
            await Type.findOne({
              where: {
                id: obj.typeId,
              },
            })
          ).type_name,
          img: obj.img,
          subtype: (
            await Subtype.findAll({
              attributes: ['subtype_name'],
              where: {
                id: (
                  await InstanceSubtype.findAll({
                    attributes: ['subtypeId'],
                    where: {
                      instanceId: obj.id,
                    },
                  })
                ).map((obj) => obj.subtypeId),
              },
            })
          ).map((obj) => obj.subtype_name),
          user:
            obj.userId ===
            (
              (await this.userService.getUserByLogin(
                process.env.ADMIN_LOGIN,
              )) as any
            ).dataValues.id
              ? 'coreAdmin'
              : (this.userService.getUserById(userID) as any).dataValues.login,
        };
      }),
    );

    return findedInstances;
  }

  async getInstances() {
    const adminId: number = (
      await this.userService.getUserByLogin(process.env.ADMIN_LOGIN)
    ).id;
    const allSubtypes = await this.subtypeService.getAllSubtypesForUsers([
      adminId,
    ]);
    const subtype_names = allSubtypes.map((subtype) => subtype.subtype_name);

    const instances = await this.getFilteredInstances(
      { userId: adminId, role: rolesEnum.ADMIN },
      {
        fromYear: 1770,
        toYear: 2030,
        subtypes: subtype_names,
      },
    );

    return instances;
  }

  async getInstanceByNameForUser(name: string, userId: number) {
    const findedInstance = (await this.instanceRepository.findOne({
      where: {
        name,
        userId,
      },
    })) as any;

    return findedInstance?.dataValues;
  }
}
