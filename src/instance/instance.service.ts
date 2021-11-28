import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InstanceDescription } from 'src/instance-descriptions/instance-descriptions.model';
import { rolesEnum } from 'src/role/roles-enum';
import { Subtype } from 'src/subtype/subtype.model';
import { Type } from 'src/type/type.model';
import { User } from 'src/user/user.model';
import { createInstanceDto } from './dto/create-instance.dto';
import { JWTinfo } from './dto/infoFromJwt.dto';
import { Instance } from './instance.model';
import { InstanceSubtype } from './instanceSubtype.model';

@Injectable()
export class InstanceService {
  async createInstance(user: JWTinfo, instance: createInstanceDto) {
    const userID = user.userId;
    const possibleUsersID = [userID];

    console.log(instance);

    if (!(user.role === rolesEnum.ADMIN)) {
      const admin = (await User.findOne({
        where: {
          login: 'admin',
        },
      })) as any;
      possibleUsersID.push(admin.dataValues.id);
    }

    let [type, created] = (await Type.findOrCreate({
      where: {
        type_name: instance.type,
        userId: possibleUsersID,
      },
      defaults: {
        userId: userID,
        type_name: instance.type,
        type_color: instance.type,
      },
    })) as any[];

    const typeID = type.dataValues.id;

    if (
      await Instance.findOne({
        where: {
          name: instance.name,
          userId: userID,
        },
      })
    ) {
      throw new HttpException('Така колонка вже існує', HttpStatus.BAD_REQUEST);
    }

    let instance_table = await Instance.create({
      name: instance.name,
      fromYear: instance.fromYear,
      toYear: instance.toYear,
      img: 'no image',
      userId: userID,
      typeId: typeID,
    });

    await InstanceDescription.create({
      instanceId: instance_table.id,
      description_text: instance.description,
      link_raw: (function (links) {
        return links.join(' ');
      })(instance.links),
    });

    for (let subtypeObj of instance.subtypes) {
      const [subtype, created] = (await Subtype.findOrCreate({
        where: {
          subtype_name: subtypeObj,
          userId: possibleUsersID,
          typeId: typeID,
        },
        defaults: {
          subtype_name: subtypeObj,
          userId: userID,
          typeId: typeID,
          subtype_color: subtypeObj,
        },
      })) as any[];

      const subtypeID = subtype.dataValues.id;

      await InstanceSubtype.create({
        subtypeId: subtypeID,
        instanceId: instance_table.id,
      });
    }
    return instance_table;
  }
}

// async createInstance(req, res, next) {
//     try {

//       const userID = userInfo.id;
//       const possibleUsersID = [userID];
//       if (!userInfo.isAdmin) {
//         possibleUsersID.push(
//           (
//             await User.findOne({
//               where: {
//                 login: 'admin',
//               },
//             })
//           ).dataValues.id
//         );
//       }
//       const [type, created] = await Type.findOrCreate({
//         where: {
//           type_name: instance.type.type_name,
//           userId: possibleUsersID,
//         },
//         defaults: {
//           userId: userID,
//           type_color: instance.type.color,
//         },
//       });

//       const typeID = type.dataValues.id;

//       if (
//         await Instance.findOne({
//           where: {
//             name: instance.name,
//             userId: userID,
//           },
//         })
//       ) {
//         return next(ApiError.dbError('Такая колонка уже существует!'));
//       }

//       let instance_table = await Instance.create({
//         name: instance.name,
//         fromYear: instance.fromYear,
//         toYear: instance.toYear,
//         img: 'no image',
//         userId: userID,
//         typeId: typeID,
//       });

//       await InstanceDescription.create({
//         instanceId: instance_table.id,
//         description_text: instance.info.description,
//         link_raw: (function (links) {
//           return links.join(' ');
//         })(instance.info.links),
//       });

//       for (let subtypeObj of instance.subtypes) {
//         const [subtype, created] = await Subtype.findOrCreate({
//           where: {
//             subtype_name: subtypeObj.subtype_name,
//             userId: possibleUsersID,
//             typeId: typeID,
//           },
//           defaults: {
//             userId: userID,
//             subtype_color: subtypeObj.color,
//           },
//         });

//         const subtypeID = subtype.dataValues.id;

//         await InstanceSubtype.create({
//           subtypeId: subtypeID,
//           instanceId: instance_table.id,
//         });
//       }

//       res.json(instance_table);
//     } catch (err) {
//       console.log(err);
//       return next(ApiError.internal(err.message));
//     }
//   }
